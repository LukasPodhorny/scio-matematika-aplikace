#!/usr/bin/env python3
"""Ověření nových úloh proti skutečným možnostem v TS: python3 scripts/verify-rovnice-doplnky.py."""
import json
import re
import subprocess
from pathlib import Path
import sympy as s

ROOT = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output([
    'node', '--experimental-strip-types', '--input-type=module', '-e',
    'import {ROVNICE} from "./app/src/content/data/rovnice.ts"; console.log(JSON.stringify(ROVNICE));'
], cwd=ROOT, text=True))
tasks = {t['id']: t for t in data}
assert len(tasks) == len(data)
x, y, p = s.symbols('x y p', real=True)
checked = set()


def number(tex):
    tex = re.sub(r'\\frac(\d)(\d)', r'((\1)/(\2))', tex)
    tex = re.sub(r'\\frac\{([^{}]+)\}\{([^{}]+)\}', r'((\1)/(\2))', tex)
    if tex == r'\text{nekonečně mnoho}':
        return s.oo
    return s.sympify(tex)


def solution_set(tex):
    tex = tex.replace(r'x\in', '').strip()
    if r'\cup' in tex:
        return s.Union(*(solution_set(t) for t in tex.split(r'\cup')))
    if tex == r'\varnothing':
        return s.EmptySet
    if tex == r'\mathbb R':
        return s.S.Reals
    if tex.startswith(r'\{'):
        return s.FiniteSet(*(number(n) for n in tex[2:-2].split(';')))
    tex = tex.replace(r'\langle','[').replace(r'\rangle',']').replace(r'\infty','oo')
    left,right=tex[1:-1].split(';')
    return s.Interval(number(left),number(right),left_open=tex[0]=='(',right_open=tex[-1]==')')


def check(ident, expected, sets=False):
    task=tasks['rovn-'+ident]
    options=[(solution_set if sets else number)(o) for o in task['moznosti']]
    assert len(set(options)) == 4, (ident, 'equivalent options', options)
    matches=[i for i,o in enumerate(options) if o == expected]
    assert matches == [task['spravna']], (ident, expected, options, task['spravna'])
    checked.add(ident)


check('59', len(s.solveset((x+4)/(x-3)-7/(x-3),x,s.S.Reals)))
check('60', s.solve(180*x+240-(120*x+660),x)[0])
check('61', s.solve(48/s.Rational(12)*60+10*x-(48/s.Rational(24)*60+25*x),x)[0])
check('62', sum(s.solveset(x-2*s.sqrt(x)-8,x,s.S.Reals)))
check('63', len(s.solveset(x**5-7*x**3,x,s.S.Reals)))
roots=s.solveset(x+1/x-5,x,s.S.Reals)
values={s.simplify(r**2+r**-2) for r in roots}
assert len(values)==1
check('64', values.pop())
check('65', sum(s.solveset(2*x**2-3*x-2,x,s.S.Reals)))
check('66', s.solve(36-4*s.log(p,2),p)[0])
valid=s.solveset(x**2-3*x-10<=0,x,s.S.Reals)
check('67', len(valid.intersect(s.S.Naturals)))
check('68', s.solveset(3*x-2>4,x,s.S.Reals).intersect(s.solveset(2*x+1<=11,x,s.S.Reals)), True)
check('69', s.solveset(x**2*(x+2)<=0,x,s.S.Reals), True)
check('70', sum(s.solveset(s.Abs(3*x+2)-10,x,s.S.Reals)))
check('71', s.solveset(s.Abs(2*x-1)<=5,x,s.S.Reals), True)
check('72', s.solveset(s.Abs(x+2)+s.Abs(x-4)<=10,x,s.S.Reals), True)
valid=s.solveset(s.Abs(18/x)>3,x,s.S.Reals)
check('73',len(list(valid.intersect(s.S.Integers))))
# Soustavu vyřešíme ve všech čtyřech větvích znamének a ověříme původní rovnice.
pairs=set()
for sx in (-1,1):
    for sy in (-1,1):
        for a,b in s.linsolve([sx*(x+2)+sy*(y-3)-4,sx*(x+2)-y+3],(x,y)):
            if a.is_real and b.is_real and abs(a+2)+abs(b-3)==4 and abs(a+2)-b==-3:
                pairs.add((a,b))
check('74',len(pairs))
valid=s.solveset(s.Abs(x)<=4,x,s.S.Reals).intersect(s.solveset(s.Abs(x-1)>=3,x,s.S.Reals))
check('75',len(list(valid.intersect(s.S.Integers))))
# Návrat ze všech reálných hodnot logaritmu, včetně záporné.
log_roots=s.solveset(y**2+y-2,y,s.S.Reals)
check('76',s.prod(2**r for r in log_roots))
check('d19',s.solveset((x+3)**2<=0,x,s.S.Reals),True)
check('d20',s.solveset(-2*x**2-3>0,x,s.S.Reals),True)
check('d21',len(s.solveset(s.Abs(x-6)+2,x,s.S.Reals)))
# Nové příklady teorie: doména, odmocnina, absolutní hodnoty a soustava.
assert s.solveset((x+1)/(x-2)-3/(x-2),x,s.S.Reals)==s.EmptySet
assert s.solveset(x+s.sqrt(x)-6,x,s.S.Reals)==s.FiniteSet(4)
assert s.solveset(s.Abs(x-1)+s.Abs(x-5)<=8,x,s.S.Reals)==s.Interval(-1,7)
assert s.solveset(6/x>2,x,s.S.Reals)==s.Interval.open(0,3)
assert len(checked)==21
print('PASS: 21 nových úloh, jednoznačnost všech možností a doplněné příklady teorie.')
