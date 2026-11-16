#!/usr/bin/env python3
"""Přepočítá všech 50 náročnějších úloh proti skutečným datům aplikace.

Spuštění z kořene: python3 scripts/verify-narocne.py
Vyžaduje Node s podporou TypeScriptu a Python se SymPy, stejně jako ostatní
ověřovací skripty. Kontroluje i různost hodnot možností a uložené indexy.
Výčty, souřadnicové modely a symbolické výpočty doplňují ruční řešení.
"""
import itertools as it
import json
import re
import subprocess
from collections import Counter
from pathlib import Path

from sympy import (
    Line, Matrix, Plane, Point, Point3D, Polygon, Rational as R, Segment,
    Symbol, cos, diff, expand, integrate, oo, pi, simplify, sin, solve, sqrt,
    summation, symbols,
)
from sympy.parsing.sympy_parser import (
    implicit_multiplication_application, parse_expr, standard_transformations,
)

ROOT = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output([
    'node', '--experimental-strip-types', '--input-type=module', '-e',
    'import {NAROCNE} from "./app/src/content/data/narocne.ts";'
    'console.log(JSON.stringify(NAROCNE));',
], cwd=ROOT, text=True))
tasks = {t['id']: t for t in data}
assert len(tasks) == len(data) == 50, 'Počet úloh nebo duplicitní ID'
CATEGORIES = ['posloupnosti', 'planimetrie', 'stereometrie', 'analyticka', 'kombinatorika']
assert Counter(t['okruh'] for t in data) == Counter({c: 10 for c in CATEGORIES})
assert set(tasks) == {f'{c}-narocne-{n:02}' for c in CATEGORIES for n in range(1, 11)}
for task in data:
    assert task['tema'] == task['okruh']
    assert task['obtiznost'] in (4, 5) and task['druh'] == 'scio'
    assert task['verified'] is True and task['verifiedBy'] == 'code'
    assert len(task['moznosti']) == 4 and 0 <= task['spravna'] <= 3
    assert len(task['postup']) >= 3 and task['typickaChyba']


def number(tex):
    """Uzavřená podmnožina TeXu: čísla, zlomky, odmocniny, pí a součiny."""
    text = tex.replace('{,}', '.').replace(r'\pi', '(pi)')
    # Argumentem TeXového příkazu může být skupina nebo jediná číslice.
    arg = r'(?:\{([^{}]*)\}|([0-9]))'
    fraction = re.compile(r'\\frac' + arg + arg)
    radical = re.compile(r'\\sqrt' + arg)
    while '\\' in text:
        previous = text
        text = fraction.sub(lambda m: '((' + (m[1] or m[2]) + ')/(' + (m[3] or m[4]) + '))', text)
        text = radical.sub(lambda m: 'sqrt(' + (m[1] or m[2]) + ')', text)
        assert text != previous, f'Nepodporovaný TeX: {tex}'
    assert re.fullmatch(r'[0-9+*/().\-\s]+', text.replace('sqrt', '').replace('pi', '')), tex
    value = parse_expr(text, local_dict={'pi': pi, 'sqrt': sqrt}, transformations=(
        *standard_transformations, implicit_multiplication_application,
    ))
    assert not value.free_symbols, tex
    return value


checked = set()
for task in data:
    values = [number(o) for o in task['moznosti']]
    assert all(simplify(a - b) != 0 for a, b in it.combinations(values, 2)), task['id']


def select(category, n, predicate):
    ident = f'{category}-narocne-{n:02}'
    task = tasks[ident]
    flags = [bool(predicate(number(o))) for o in task['moznosti']]
    assert sum(flags) == 1 and flags[task['spravna']], (ident, flags, task['spravna'])
    assert ident not in checked
    checked.add(ident)


def equals(category, n, expected):
    select(category, n, lambda value: simplify(value - expected) == 0)


# Posloupnosti: přímé součty, simulace cyklů, symbolické nekonečné řady.
a, d, q, x = symbols('a d q x', real=True)
k = Symbol('k', integer=True, nonnegative=True)
ap = solve([sum(a + i*d for i in range(5)) - 40,
            sum(a + i*d for i in range(5, 10)) - 90], (a, d))
runs = [sum((a + i*d).subs(ap) for i in range(n)) for n in range(1, 30)]
equals('posloupnosti', 1, next(n for n, total in enumerate(runs, 1) if total >= 300))
qv = next(v for v in solve(q**3 * 21 - 168, q) if v.is_real and v > 0)
av = 21 / (1 + qv + qv**2)
equals('posloupnosti', 2, next(n for n in range(1, 20) if sum(av*qv**i for i in range(n)) > 1000))
ink, cycles = R(30), 0
while ink >= 7:
    ink = ink / 2 + 3
    cycles += 1
equals('posloupnosti', 3, cycles)
equals('posloupnosti', 4, summation(64 * (R(1, 2)**(2*k) - R(1, 2)**(2*k+1)), (k, 0, oo)))
n = Symbol('n', positive=True, integer=True)
partial = lambda count: count * (2*a + (count-1)*d) / 2
av = solve(partial(2*n) - 5*partial(n), a)[0]
equals('posloupnosti', 5, simplify((partial(2*n)/partial(3*n)).subs(a, av)))
# Kontrola kandidátních splátek skutečným splátkovým kalendářem.
def debt_after(payment):
    debt = R(21000)
    for _ in range(2):
        debt = debt * R(11, 10) - payment
    return debt
select('posloupnosti', 6, lambda payment: debt_after(payment) == 0)
triples = [(10-v, 10, 10+v) for v in solve((10-d)*(10+d)-8**2, d) if 0 < v < 10]
assert len(triples) == 1
equals('posloupnosti', 7, max(triples[0]))
solution = solve([a/(1-q*q)-12, a*q/(1-q*q)+6], (a, q), dict=True)
assert len(solution) == 1
av, qv = solution[0][a], solution[0][q]
assert abs(qv) < 1
equals('posloupnosti', 8, summation((av*qv**k)**2, (k, 0, oo)))
partial_sum = R(0)
for n_value in range(1, 200):
    partial_sum += R(1, (n_value+1)*(n_value+2))
    if partial_sum > R(49, 100):
        break
else:
    raise AssertionError('Součet nedosáhl cíle')
equals('posloupnosti', 9, n_value)
equals('posloupnosti', 10, sum(1+3*i for i in range(60) if (i+1) % 3 != 0))

# Planimetrie: průsečíky, plochy a optimalizace v souřadnicích.
A, B, C = Point(0, 0), Point(12, 0), Point(0, R(55, 3))
D, E = A + (B-A)/3, A + (C-A)/4
P = Line(C, D).intersection(Line(B, E))[0]
assert abs(Polygon(A, B, C).area) == 110
equals('planimetrie', 1, abs(Polygon(B, P, C).area))
crease = Segment(Point(0, 0), Point(8, 6)).perpendicular_bisector()
ends = [crease.intersection(Line(Point(0, y), Point(8, y)))[0] for y in (0, 6)]
assert all(0 <= p.x <= 8 for p in ends)
equals('planimetrie', 2, ends[0].distance(ends[1]))
r = Symbol('r', positive=True)
outer = sqrt(r*r + R(12, 2)**2)
equals('planimetrie', 3, simplify(pi*(outer**2 - r**2)))
a, b, c = symbols('a b c', positive=True)
triangles = solve([a+b+c-30, a*b/2-2*(a+b+c)/2, a*a+b*b-c*c], (a, b, c))
assert triangles and all(t[2] == triangles[0][2] for t in triangles)
equals('planimetrie', 4, triangles[0][2])
y = Symbol('y', real=True)
cut = next(v for v in solve(integrate(6+8*y, (y, 0, x))-5, x) if 0 < v < 1)
equals('planimetrie', 5, 6+8*cut)
height = sqrt(10**2-6**2)
area = y * 12*(height-y)/height
optimum = solve(diff(area, y), y)[0]
assert 0 < optimum < height and diff(area, y, 2) < 0
equals('planimetrie', 6, area.subs(y, optimum))
# Středy původních kruhů (0,1), (4,4); střed nového (u,r).
u = Symbol('u', real=True)
solutions = solve([u*u+(r-1)**2-(r+1)**2,
                   (u-4)**2+(r-4)**2-(r+4)**2], (u, r))
gap = [rv for uv, rv in solutions if 0 < uv < 4 and rv > 0]
assert len(gap) == 1
equals('planimetrie', 7, gap[0])
vertices = [Point(4*cos(i*pi/3), 4*sin(i*pi/3)) for i in range(6)]
midpoints = [(vertices[i]+vertices[i+1])/2 for i in (0, 2, 4)]
equals('planimetrie', 8, abs(Polygon(*midpoints).area))
h, near = symbols('h near', positive=True)
tower = solve([h-near*sqrt(3), h-(near+20)/sqrt(3)], (h, near))
equals('planimetrie', 9, tower[h])
legs = solve([a/b-R(2, 3), a*a+b*b-13**2], (a, b))
assert len(legs) == 1
equals('planimetrie', 10, legs[0][0]*legs[0][1]/2)

# Stereometrie: výčty krychliček, řezy a objemy odvozené z geometrie.
matching = []
for side in range(3, 15):
    painted = Counter(sum(v in (0, side-1) for v in cube)
                      for cube in it.product(range(side), repeat=3))
    if painted[1] == 2*painted[2]:
        matching.append(side**3)
assert len(matching) == 1
equals('stereometrie', 1, matching[0])
remaining = sum(sum(v in (2, 3) for v in voxel) < 2 for voxel in it.product(range(6), repeat=3))
equals('stereometrie', 2, remaining)
small_h = next(v for v in solve((pi*6**2*12/3)/(pi*(h/2)**2*h/3)-27, h) if v > 0)
small_r = small_h/2
slant = sqrt((12-small_h)**2+(6-small_r)**2)
equals('stereometrie', 3, pi*(6**2+small_r**2) + pi*(6+small_r)*slant)
equals('stereometrie', 4, min(sqrt((a+b)**2+c*c) for a, b, c in it.permutations([2, 3, 6])))
water = solve(100*h - 4*5*h - 600, h)[0]
assert 0 < water < 12
equals('stereometrie', 5, water)
cone_side = Line(Point(6, 0), Point(0, 8))
ball_r = next(v for v in solve(simplify(cone_side.distance(Point(0, r))**2-r**2), r) if 0 < v < 8)
assert cone_side.distance(Point(0, ball_r)) == ball_r
equals('stereometrie', 6, (R(4, 3)*pi*ball_r**3)/(pi*6**2*8/3))
corner_volume = abs(Matrix([[3, 0, 0], [0, 3, 0], [0, 0, 3]]).det())/6
equals('stereometrie', 7, 6**3 - 8*corner_volume)
section = [Matrix(p) for p in [(0, 3, 6), (3, 0, 6), (6, 0, 3), (6, 3, 0), (3, 6, 0), (0, 6, 3)]]
center = Matrix([3, 3, 3])
section_area = sum((section[i]-center).cross(section[(i+1)%6]-center).norm()/2 for i in range(6))
equals('stereometrie', 8, section_area)
assert expand((a+b+c)**2 - 2*(a*b+a*c+b*c) - (a*a+b*b+c*c)) == 0
equals('stereometrie', 9, sqrt(R(48, 4)**2 - 88))
rho, theta = symbols('rho theta', real=True)
volume = integrate((8 + R(4, 3)*rho*cos(theta))*rho, (rho, 0, 3), (theta, 0, 2*pi))
equals('stereometrie', 10, volume)

# Analytická geometrie: podmínky zadání přímo na bodech nebo vektorech.
t = Symbol('t', real=True)
route = sqrt((t-1)**2+9)+sqrt((t-7)**2+25)
# Oba sčítance mají kladnou druhou derivaci, stacionární bod je jediné minimum.
select('analyticka', 1, lambda value: simplify(diff(route, t).subs(t, value)) == 0)
center_x = solve((x*x+x*x)-((x-6)**2+x*x), x)[0]
equals('analyticka', 2, sqrt(2*center_x**2))
squared_distance = (t-4)**2+(2*t+1)**2
equals('analyticka', 3, solve(diff(squared_distance, t), t)[0])

def correct_chord(value):
    points = solve([(x-2)**2+(y+1)**2-25, 3*x+4*y-value], (x, y))
    return value > 0 and len(points) == 2 and simplify(Point(*points[0]).distance(Point(*points[1]))-8) == 0
select('analyticka', 4, correct_chord)
P = Line(Point(0, 4), Point(-4, 0)).intersection(Line(Point(0, 3), Point(1, 3)))[0]
m = Symbol('m', real=True)
assert expand((m-1)*P.x+(m+1)*P.y-2*m-4) == 0
equals('analyticka', 5, P.distance(Point(0, 0)))
plane = Plane(Point3D(1, 0, 0), Point3D(0, 2, 0), Point3D(2, 1, 1))
equals('analyticka', 6, plane.distance(Point3D(0, 0, 0)))
A, C = Point(-3, 4), Point(3, 8)
bx = solve((x-A.x)**2+A.y**2-((x-C.x)**2+C.y**2), x)[0]
B = Point(bx, 0)
D = A+C-B
assert A.distance(B) == B.distance(C) == C.distance(D) == D.distance(A)
equals('analyticka', 7, abs(Polygon(A, B, C, D).area))
focus_x = sqrt(25-9)
ys = solve(focus_x**2/25+y*y/9-1, y)
equals('analyticka', 8, max(ys)-min(ys))

def perpendicular_rays(value):
    roots = solve(x*x-2*x-value, x)
    if len(roots) != 2 or any(v == 0 or not v.is_real for v in roots):
        return False
    first, second = [Matrix([v, v*v]) for v in roots]
    return simplify(first.dot(second)) == 0
select('analyticka', 9, perpendicular_rays)
squared_norm, dot_product = symbols('squared_norm dot_product', real=True)
vector_values = solve([2*squared_norm+2*dot_product-36, 2*squared_norm-2*dot_product-4], (squared_norm, dot_product))
equals('analyticka', 10, vector_values[dot_product]/vector_values[squared_norm])

# Kombinatorika: úplné výčty místo kombinačních vzorců v řešeních.
valid_numbers = [digits for digits in it.permutations(range(7), 5)
                 if digits[0] != 0 and 0 in digits and sum(v*10**(4-i) for i, v in enumerate(digits)) % 5 == 0]
equals('kombinatorika', 1, len(valid_numbers))
teams = [(team, leader) for team in it.combinations(range(7), 4) for leader in team
         if len(set(team) & {0, 1}) == 1 and leader not in (0, 1)]
equals('kombinatorika', 2, len(teams))
books = [order for order in it.permutations(range(7))
         if order[0] == 0 and all(not (a >= 4 and b >= 4) for a, b in zip(order, order[1:]))]
equals('kombinatorika', 3, len(books))
colors = 'RRRRBBBGG'
conditioned = [tuple(colors[i] for i in chosen) for chosen in it.combinations(range(9), 3)
               if len({colors[i] for i in chosen}) == 2]
equals('kombinatorika', 4, R(sum(draw.count('R') == 2 for draw in conditioned), len(conditioned)))
# Každá z 3 * 4 větví přesunu a tahu má stejnou pravděpodobnost.
branches = [(transferred, drawn) for transferred in 'RRB' for drawn in 'RBB'+transferred]
red_draws = [transferred for transferred, drawn in branches if drawn == 'R']
equals('kombinatorika', 5, R(red_draws.count('R'), len(red_draws)))
coins = [row for row in it.product([0, 1], repeat=6) if sum(row) == 3]
equals('kombinatorika', 6, R(sum(all(a+b < 2 for a, b in zip(row, row[1:])) for row in coins), len(coins)))
samples = [row for row in it.combinations_with_replacement(range(1, 11), 5)
           if row[0] == 1 and row[2] == 7 and row[-1] == 10 and sum(row) == 30]
assert len(samples) == 4
equals('kombinatorika', 7, max(R(sum((v-6)**2 for v in row), 5) for row in samples))
select('kombinatorika', 8, lambda score: (500+score)/11-50 == (1125-score)/14-75 and (500+score)/11 > 50)
equals('kombinatorika', 9, expand((1+x)**5*(1-x)**4).coeff(x, 5))
valid_paths = 0
for up_positions in it.combinations(range(7), 3):
    px, py = 0, 0
    for step in range(7):
        px += step not in up_positions
        py += step in up_positions
        if (px, py) in {(2, 1), (2, 2)}:
            break
    else:
        assert (px, py) == (4, 3)
        valid_paths += 1
equals('kombinatorika', 10, valid_paths)

assert checked == set(tasks), ('Chybí matematické ověření', set(tasks)-checked)
print(f'PASS: {len(checked)} úloh; 10 v každém z pěti okruhů, různé možnosti a právě jedna správná odpověď.')
