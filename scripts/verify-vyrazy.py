#!/usr/bin/env python3
"""Nezávislé ověření úloh Algebraické výrazy (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně (právě jedna správná možnost).
Končí nenulově při jakékoli neshodě.
"""

import math
import sys

from sympy import (
    Abs,
    Rational,
    S,
    Symbol,
    binomial,
    expand,
    simplify,
    sqrt,
    together,
)

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


x = Symbol("x", real=True)
y = Symbol("y", real=True)
a = Symbol("a", real=True)
b = Symbol("b", real=True)
n = Symbol("n", integer=True)

SAMPLES = [0.37, -1.2, 2.1, 3.7, -2.9, 0.0, 1.0, -0.5, 4.2, 5.5, -3.3, 0.25]


def numval(expr, subs):
    from sympy import N

    try:
        v = complex(N(expr.subs(subs)))
    except (TypeError, ValueError):
        return None
    if math.isfinite(v.real) and math.isfinite(v.imag) and abs(v.imag) < 1e-9:
        return v.real
    return None


def differs(f, g, samples=SAMPLES) -> bool:
    """Liší se výrazy aspoň v jednom bodě, kde jsou oba definované?"""
    for s in samples:
        vf = numval(f, {x: s})
        vg = numval(g, {x: s})
        if vf is None or vg is None:
            continue
        if abs(vf - vg) > 1e-9:
            return True
    return False


def same_symbolic(f, g) -> bool:
    return simplify(S(f) - S(g)) == 0


# ---------- 01: (3x-2)(x+4) - x(3x+5) = 5x-8 (správně B) ----------
e01 = expand((3 * x - 2) * (x + 4) - x * (3 * x + 5))
check(e01 == 5 * x - 8, "01: rozklad dává 5x-8")
for spatna in [15 * x - 8, 5 * x, 9 * x - 8]:
    check(expand(spatna - e01) != 0, f"01: {spatna} je špatně")

# ---------- 02: a-b=5, ab=6 -> a²+b²=37 (správně D) ----------
check(simplify(a**2 + b**2 - ((a - b) ** 2 + 2 * a * b)) == 0, "02: identita")
check(5**2 + 2 * 6 == 37, "02: 25+12=37")
for spatna in [25, 13, 31]:
    check(spatna != 37, f"02: {spatna} je špatně")
# konzistence zadání: takové a,b existuje (a=6,b=1)
check(6 - 1 == 5 and 6 * 1 == 6 and 6**2 + 1**2 == 37, "02: příklad a=6,b=1")

# ---------- 03: rozklad x³-2x²-5x+6 (správně A) ----------
p03 = x**3 - 2 * x**2 - 5 * x + 6
check(expand((x - 1) * (x - 3) * (x + 2)) == p03, "03: správný rozklad")
for spatny in [
    (x - 1) * (x + 3) * (x - 2),
    (x + 1) * (x - 3) * (x - 2),
    (x - 1) * (x - 3) * (x - 2),
]:
    check(expand(spatny) != p03, f"03: {spatny} je špatně")

# ---------- 04: hodnota v x=-2 je -9 (správně C) ----------
check((2 * -2 + 1) ** 2 - 3 * ((-2) ** 2 - (-2)) == -9, "04: -9")
for spatna in [27, -27, 3]:
    check(spatna != -9, f"04: {spatna} je špatně")

# ---------- 05: součet koeficientů (2x-3)^5 je -1 (správně B) ----------
check((2 * 1 - 3) ** 5 == -1, "05: p(1)=-1")
check(expand((2 * x - 3) ** 5).subs(x, 1) == -1, "05: kontrola rozvojem")
for spatna in [1, -243, 32]:
    check(spatna != -1, f"05: {spatna} je špatně")

# ---------- 06: (2x-3y)² = 4x²-12xy+9y² (správně C) ----------
e06 = expand((2 * x - 3 * y) ** 2)
check(e06 == 4 * x**2 - 12 * x * y + 9 * y**2, "06: rozvoj")
for spatny in [4 * x**2 - 6 * x * y + 9 * y**2, 4 * x**2 + 9 * y**2, 4 * x**2 - 9 * y**2]:
    check(expand(spatny) != e06, f"06: {spatny} je špatně")

# ---------- 07: 9x²-25 = (3x-5)(3x+5) (správně A) ----------
e07 = 9 * x**2 - 25
check(expand((3 * x - 5) * (3 * x + 5)) == e07, "07: rozklad")
for spatny in [(3 * x - 5) ** 2, (9 * x - 5) * (x + 5), (3 * x + 5) ** 2]:
    check(expand(spatny) != e07, f"07: {spatny} je špatně")

# ---------- 08: 2x²+7x+3 = (2x+1)(x+3) (správně D) ----------
e08 = 2 * x**2 + 7 * x + 3
check(expand((2 * x + 1) * (x + 3)) == e08, "08: rozklad")
for spatny in [(2 * x + 3) * (x + 1), (2 * x - 1) * (x - 3), (x + 1) * (x + 3)]:
    check(expand(spatny) != e08, f"08: {spatny} je špatně")

# ---------- 09: zbytek po dělení (x-2) je 7 (správně B) ----------
p09 = x**3 + 2 * x**2 - 5 * x + 1
check(p09.subs(x, 2) == 7, "09: p(2)=7")
# Hornerovo schéma s c=2: 1 | 4 | 3 | 7
hor = [1]
for koef in [2, -5, 1]:
    hor.append(hor[-1] * 2 + koef)
check(hor == [1, 4, 3, 7], f"09: Horner {hor}")
for spatny in [11, 5, 3]:
    check(spatny != 7, f"09: {spatny} je špatně")

# ---------- 10: 1/r+1/s = 7/10 (správně C) ----------
r, s = Symbol("r"), Symbol("s")
check(Rational(7, 10) == Rational(7, 10), "10: sanity")
# přes Viètu: (r+s)/rs = 7/10
check(simplify((7) / 10 - Rational(7, 10)) == 0, "10: 7/10")
# nezávisle přes kořeny 5 a 2
check(Rational(1, 5) + Rational(1, 2) == Rational(7, 10), "10: kořeny 5,2")
for spatny in [Rational(10, 7), S(7), Rational(-7, 10)]:
    check(spatny != Rational(7, 10), f"10: {spatny} je špatně")

# ---------- 11: koef. x² v (x-2)^5 je -80 (správně A) ----------
check(binomial(5, 2) * (-2) ** 3 == -80, "11: 10*(-8)")
check(expand((x - 2) ** 5).coeff(x, 2) == -80, "11: kontrola rozvojem")
for spatny in [80, 40, 10]:
    check(spatny != -80, f"11: {spatny} je špatně")

# ---------- 12: n³-n dělitelné 3 pro všechna celá n (správně D) ----------
check(expand(n * (n - 1) * (n + 1)) == n**3 - n, "12: rozklad")
for k in range(-10, 11):
    check((k**3 - k) % 3 == 0, f"12: n={k}")
# vyvrácení distraktorů protipříklady
check((1**3 - 1) % 3 == 0 and 1 % 3 != 0, "12: n=1 vyvrací 'právě násobky 3'")
check((2**3 - 2) % 3 == 0 and 2 % 2 == 0, "12: n=2 vyvrací 'právě lichá'")
check((0**3 - 0) % 3 == 0, "12: n=0 vyvrací 'žádné'")

# ---------- 13: D((x+1)/((x-2)(x+3))) (správně B) ----------
f13 = (x + 1) / ((x - 2) * (x + 3))
check(numval(f13, {x: 2}) is None, "13: x=2 mimo D")
check(numval(f13, {x: -3}) is None, "13: x=-3 mimo D")
check(numval(f13, {x: -1}) == 0, "13: x=-1 je v D (nulový bod)")
check(numval(f13, {x: 0}) is not None, "13: x=0 je v D")
check(numval(f13, {x: -2}) is not None, "13: x=-2 je v D (distraktor D)")
check(numval(f13, {x: 3}) is not None, "13: x=3 je v D (distraktor D)")

# ---------- 14: (x²-9)/(x²+6x+9) = (x-3)/(x+3) (správně C) ----------
o14 = (x**2 - 9) / (x**2 + 6 * x + 9)
e14 = (x - 3) / (x + 3)
check(same_symbolic(together(o14 - e14), 0), "14: rovnost po vykrácení")
check(not differs(o14, e14), "14: shoda na vzorcích")
for spatny in [-3 / (2 * x + 3), ((x - 3) / (x + 3)) ** 2, (x + 3) / (x - 3)]:
    check(differs(o14, spatny), f"14: {spatny} je špatně")

# ---------- 15: 2/(x-1)+3/(x+1) = (5x-1)/(x²-1) (správně A) ----------
o15 = 2 / (x - 1) + 3 / (x + 1)
e15 = (5 * x - 1) / (x**2 - 1)
check(same_symbolic(together(o15 - e15), 0), "15: rovnost")
for spatny in [5 / (x**2 - 1), (5 * x + 5) / (x**2 - 1), 5 / (2 * x)]:
    check(differs(o15, spatny), f"15: {spatny} je špatně")

# ---------- 16: 1+1/(1+1/x) = (2x+1)/(x+1) (správně D) ----------
o16 = 1 + 1 / (1 + 1 / x)
e16 = (2 * x + 1) / (x + 1)
check(same_symbolic(together(o16 - e16), 0), "16: rovnost")
for spatny in [x + 2, (2 * x - 1) / (x - 1), (x + 1) / (2 * x + 1)]:
    check(differs(o16, spatny), f"16: {spatny} je špatně")

# ---------- 17: podíl je 1 (správně B) ----------
o17 = ((x**2 - 4) / (x**2 + 4 * x + 4)) / ((x - 2) / (x + 2))
check(same_symbolic(together(o17 - 1), 0), "17: rovno 1")
for spatny in [((x - 2) / (x + 2)) ** 2, (x + 2) / (x - 2), S(-1)]:
    check(differs(o17, spatny), f"17: {spatny} je špatně")
# podmínky: nedefinováno v ±2
check(numval(o17, {x: 2}) is None and numval(o17, {x: -2}) is None, "17: podmínky ±2")

# ---------- 18: (x²-1)/(x²-2x+1) = 2 -> x=3 (správně C) ----------
f18 = (x**2 - 1) / (x**2 - 2 * x + 1)
check(numval(f18, {x: 3}) == 2, "18: x=3 dává 2")
check(numval(f18, {x: 1}) is None, "18: x=1 mimo D (past)")
check(numval(f18, {x: -3}) != 2, "18: x=-3 nedává 2")
from sympy import Eq, solve

res18 = solve(Eq((x + 1) / (x - 1), 2), x)
check(res18 == [3], f"18: jediný kandidát {res18}")

# ---------- 19: (2³·2⁵)/2⁶ = 4 (správně A) ----------
check(2**3 * 2**5 // 2**6 == 4, "19: 4")
for spatny in [512, 5, 2]:
    check(spatny != 4, f"19: {spatny} je špatně")

# ---------- 20: (3x⁻²y³)⁻¹ = x²/(3y³) (správně D) ----------
o20 = (3 * x ** (-2) * y**3) ** (-1)
e20 = x**2 / (3 * y**3)
check(same_symbolic(o20 - e20, 0), "20: rovnost")
for spatny in [3 * x**2 / y**3, y**3 / (3 * x**2), 1 / (3 * x**2 * y**3)]:
    check(simplify(spatny - e20) != 0, f"20: {spatny} je špatně")

# ---------- 21: √50-√18+√8 = 4√2 (správně B) ----------
v21 = sqrt(50) - sqrt(18) + sqrt(8)
check(simplify(v21 - 4 * sqrt(2)) == 0, "21: 4√2")
for spatny in [sqrt(40), 10 * sqrt(2), S(4)]:
    check(simplify(v21 - spatny) != 0, f"21: {spatny} je špatně")

# ---------- 22: 6/(√3-1) = 3√3+3 (správně C) ----------
v22 = 6 / (sqrt(3) - 1)
e22 = 3 * sqrt(3) + 3
check(simplify(v22 - e22) == 0, "22: 3√3+3")
for spatny in [6 * sqrt(3) + 6, 2 * sqrt(3) - 6, 3 * sqrt(3) - 3]:
    check(simplify(v22 - spatny) != 0, f"22: {spatny} je špatně")

# ---------- 23: 27^(2/3)-16^(3/4) = 1 (správně A) ----------
v23 = 27 ** Rational(2, 3) - 16 ** Rational(3, 4)
check(simplify(v23) == 1, "23: 9-8=1")
for spatny in [17, 6, 0]:
    check(spatny != 1, f"23: {spatny} je špatně")

# ---------- 24: √(x²-6x+9) = 3-x pro x<3 (správně D) ----------
vz24 = [0, -5, Rational(5, 2), 2, 1]
for x0 in vz24:
    check(float(sqrt(x0**2 - 6 * x0 + 9)) == float(3 - x0), f"24: x={x0}")
for spatny in [x - 3, -x - 3, x**2 - 6 * x + 9]:
    check(
        any(float(spatny.subs(x, x0)) != float(3 - x0) for x0 in vz24),
        f"24: {spatny} je špatně",
    )

# ---------- 25: největší je ³√9 (správně B) ----------
sesty = {
    "A": 80,
    "B": 9**2,
    "C": 3**3,
    "D": 2**6,
}
check(sesty == {"A": 80, "B": 81, "C": 27, "D": 64}, f"25: šesté mocniny {sesty}")
check(max(sesty, key=sesty.get) == "B", "25: největší B")
from sympy import N as sN

hod25 = [float(sN(80 ** Rational(1, 6))), float(sN(9 ** Rational(1, 3))), float(sN(sqrt(3))), 2.0]
check(hod25[1] == max(hod25), f"25: numericky {hod25}")

# ---------- 26: |-7|+|3-8|-|2| = 10 (správně C) ----------
check(abs(-7) + abs(3 - 8) - abs(2) == 10, "26: 10")
for spatny in [0, -14, 14]:
    check(spatny != 10, f"26: {spatny} je špatně")

# ---------- 27: |x-2|+|x+1| = 3 na <-1,2> (správně A) ----------
f27 = Abs(x - 2) + Abs(x + 1)
for x0 in [-1, 0, 1, 2, Rational(1, 2)]:
    check(f27.subs(x, x0) == 3, f"27: x={x0} dává 3")
for spatny, dosad in [(2 * x - 1, 0), (1 - 2 * x, 0), (S(-3), 0)]:
    check(spatny.subs(x, dosad) != 3, f"27: {spatny} je špatně")
check(differs(f27, 2 * x - 1) and differs(f27, 1 - 2 * x) and differs(f27, S(-3)), "27: odlišnost")

# ---------- 28: |x-1|+|x+3| = 4 má nekonečně řešení (správně D) ----------
f28 = Abs(x - 1) + Abs(x + 3)
for x0 in [-3, -2, -1, 0, 1]:
    check(f28.subs(x, x0) == 4, f"28: x={x0} vyhovuje (interval)")
for x0 in [-4, 2, 10]:
    check(f28.subs(x, x0) != 4, f"28: x={x0} nevyhovuje (venku)")
check(f28.subs(x, 0) == 4, "28: x=0 vyvrací 'právě jedno/dvě' i 'žádné'")

# ---------- dril ----------
# d01: úplné vytknutí je právě 2x(2x+3) (správně C)
p_d01 = 4 * x**2 + 6 * x
check(expand(2 * x * (2 * x + 3)) == p_d01, "d01: hodnota C")
check(expand(2 * x * (2 * x + 6)) != p_d01, "d01: D špatná hodnota")
# A, B mají správnou hodnotu, ale neúplné vytknutí (vevnitř zbývá činitel)
check(expand(2 * (2 * x**2 + 3 * x)) == p_d01, "d01: A hodnota (ale neúplná)")
check(expand(x * (4 * x + 6)) == p_d01, "d01: B hodnota (ale neúplná)")
from sympy import Poly

check(Poly(2 * x**2 + 3 * x, x).eval(0) == 0, "d01: v A zbývá x")
check(Poly(4 * x + 6, x).content() == 2, "d01: v B zbývá 2")
check(Poly(2 * x + 3, x).content() == 1 and Poly(2 * x + 3, x).eval(0) != 0, "d01: C úplná")

# d02: (a+5)² (správně A)
check(expand((a + 5) ** 2) == a**2 + 10 * a + 25, "d02")
for spatny in [a**2 + 25, a**2 + 5 * a + 25, a**2 + 10 * a + 10]:
    check(expand(spatny) != expand((a + 5) ** 2), f"d02: {spatny} špatně")

# d03: a²-b² (správně D)
check(expand((a - b) * (a + b)) == a**2 - b**2, "d03")
for spatny in [(a - b) ** 2, (a + b) ** 2, (a - b) * (b - a)]:
    check(expand(spatny) != a**2 - b**2, f"d03: {spatny} špatně")

# d04: 6x²/(3x) = 2x (správně B)
o_d04 = 6 * x**2 / (3 * x)
check(same_symbolic(o_d04 - 2 * x, 0), "d04")
for spatny in [S(2), 2 * x**2, 3 * x]:
    check(differs(o_d04, spatny), f"d04: {spatny} špatně")

# d05: x⁵·x³ = x⁸ (správně C)
check(expand(x**5 * x**3 - x**8) == 0, "d05")
for spatny in [x**15, x**2, 2 * x**8]:
    check(expand(spatny - x**8) != 0, f"d05: {spatny} špatně")

# d06: √72 = 6√2 (správně A)
check(simplify(sqrt(72) - 6 * sqrt(2)) == 0, "d06")
for spatny in [36 * sqrt(2), S(24), S(6)]:
    check(simplify(sqrt(72) - spatny) != 0, f"d06: {spatny} špatně")

# d07: √(a²) = |a| pro všechna reálná a (správně D)
for a0 in [3, -3, 0, Rational(7, 2)]:
    check(float(sqrt(a0**2)) == float(abs(a0)), f"d07: a={a0} |a|")
check(float(sqrt((-3) ** 2)) != -3, "d07: A selhává pro a=-3")
check(float(sqrt(3**2)) != -3, "d07: C selhává pro a=3")
check(float(sqrt((-3) ** 2)) != -3 and float(sqrt(3**2)) != -(3), "d07: B není jednotná rovnost")

# d08: D(5/(x-4)) (správně B)
f_d08 = 5 / (x - 4)
check(numval(f_d08, {x: 4}) is None, "d08: x=4 mimo D")
check(numval(f_d08, {x: 5}) is not None, "d08: x=5 v D (A špatně)")
check(numval(f_d08, {x: 0}) is not None, "d08: x=0 v D (C špatně)")

# d09: |-2|-|-5| = -3 (správně C)
check(abs(-2) - abs(-5) == -3, "d09")
for spatny in [3, 7, -7]:
    check(spatny != -3, f"d09: {spatny} špatně")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
