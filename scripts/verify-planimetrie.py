#!/usr/bin/env python3
"""Nezávislé ověření úloh Planimetrie (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že právě jedna ze 4 možností je správně (a je na indexu spravna).
Končí nenulově při jakékoli neshodě.
plani-10 (věty o určenosti) se ověřuje úsudkem + numerickou kontrolou
nejednoznačnosti ssu — viz report.
"""

import math
import sys

from sympy import N, Rational, cos, pi, sin, sqrt, simplify

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


def eq(a, b) -> bool:
    d = simplify(a - b)
    if d == 0:
        return True
    try:
        return abs(float(N(d))) < 1e-9
    except (TypeError, ValueError):
        return False


def check_one(opts, expected, idx: int, label: str) -> None:
    """Právě jedna možnost se rovná očekávané hodnotě, a je na indexu idx."""
    check(len(opts) == 4, f"{label}: 4 možnosti")
    for i in range(4):
        for j in range(i + 1, 4):
            check(not eq(opts[i], opts[j]), f"{label}: možnosti {i},{j} se liší")
    hits = [i for i, o in enumerate(opts) if eq(o, expected)]
    check(hits == [idx], f"{label}: správně právě [{idx}], vyšlo {hits}")


# ---------- plani-01: odvěsny 9, 12 → přepona ----------
check_one([sqrt(63), 21, 15, Rational(21, 2)], sqrt(81 + 144), 2, "01")

# ---------- plani-02: trojúhelníková nerovnost ----------
def je_trojuhelnik(a, b, c) -> bool:
    return a + b > c and a + c > b and b + c > a


triples = [(2, 3, 6), (4, 5, 9), (5, 6, 10), (3, 4, 8)]
check([je_trojuhelnik(*t) for t in triples] == [False, False, True, False], "02: právě třetí")
check(4 + 5 == 9, "02: rovnost u 4,5,9 (degenerovaný případ)")

# ---------- plani-03: těžiště, těžnice 12 ----------
check_one([4, 8, 6, 9], Rational(2, 3) * 12, 1, "03")

# ---------- plani-04: úhly 2:3:4 ----------
check_one([60, 80, 90, 120], Rational(4, 9) * 180, 1, "04")

# ---------- plani-05: výška rovnostranného, a=8 ----------
check_one([4, 8, 2 * sqrt(3), 4 * sqrt(3)], sqrt(64 - 16), 3, "05")

# ---------- plani-06: stín 2/3, strom stín 18 ----------
check_one([27, 9, 12, 6], Rational(18 * 2, 3), 2, "06")
check(abs(Rational(18 * 3, 2) - 27) == 0, "06: převrácený poměr = 27")

# ---------- plani-07: strany 2:3 → obsahy ----------
o07 = [Rational(2, 3), Rational(8, 27), Rational(4, 9), Rational(16, 81)]
check_one(o07, Rational(2, 3) ** 2, 2, "07")

# ---------- plani-08: rovnoběžka, CD:DA=1:2 → obsahy 1:8 ----------
k = Rational(1, 3)
maly = k**2
licho = 1 - maly
check_one(
    [Rational(1, 2), Rational(1, 3), Rational(1, 9), Rational(1, 8)],
    maly / licho,
    3,
    "08",
)

# ---------- plani-09: Euklid, úseky 4, 9 ----------
check_one([Rational(13, 2), 6, 13, sqrt(13)], sqrt(4 * 9), 1, "09")

# ---------- plani-10: ssu nejednoznačnost (numerická podpora úsudku) ----------
sinb = 6 * math.sin(math.radians(50)) / 5
check(0 < sinb < 1, f"10: sin beta={sinb} v (0,1)")
b1 = math.degrees(math.asin(sinb))
b2 = 180 - b1
check(50 + b1 < 180 and 50 + b2 < 180, f"10: obě varianty ssu existují ({b1:.1f}, {b2:.1f})")

# ---------- plani-11: čtverec v trojúhelníku 5-12 ----------
from sympy import Symbol, solve  # noqa: E402

x = Symbol("x", positive=True)
res11 = solve((12 - x) / x - Rational(12, 5), x)
check(len(res11) == 1, f"11: jedno řešení {res11}")
check_one(
    [Rational(30, 17), Rational(60, 13), Rational(60, 17), 5],
    res11[0],
    2,
    "11",
)
check(float(N(res11[0])) < 5, "11: čtverec se vejde")

# ---------- plani-12: součet úhlů pětiúhelníku ----------
check_one([360, 720, 900, 540], (5 - 2) * 180, 3, "12")

# ---------- plani-13: úhlopříčky osmiúhelníku ----------
check_one([40, 16, 8, 20], Rational(8 * 5, 2), 3, "13")

# ---------- plani-14: šestiúhelník a=4 ----------
check_one([24, 24 * sqrt(3), 96 * sqrt(3), 12 * sqrt(3)], 6 * sqrt(3) / 4 * 16, 1, "14")

# ---------- plani-15: lichoběžník 14/6, rameno 5 ----------
previs = Rational(14 - 6, 2)
check_one([4, 3, 5, sqrt(41)], sqrt(25 - previs**2), 1, "15")

# ---------- plani-16: kosočtverec u=6,8 → strana ----------
check_one([7, 10, 5, 14], sqrt(9 + 16), 2, "16")

# ---------- plani-17: obvod 12π → obsah ----------
r17 = 12 * pi / (2 * pi)
check_one([12 * pi, 144 * pi, 6 * pi, 36 * pi], pi * r17**2, 3, "17")

# ---------- plani-18: výseč r=6, 120° ----------
check_one([4 * pi, 12 * pi, 24 * pi, 36 * pi], Rational(120, 360) * pi * 36, 1, "18")
check(eq(Rational(120, 360) * 2 * pi * 6, 4 * pi), "18: oblouk = 4π (distraktor)")

# ---------- plani-19: středový 110° → obvodový ----------
check_one([55, 110, 220, 70], Rational(110, 2), 0, "19")

# ---------- plani-20: tětiva 8, r=5 → vzdálenost ----------
check_one([4, 6, 3, sqrt(89)], sqrt(25 - 16), 2, "20")

# ---------- plani-21: sinová věta a=6, 45°, 60° ----------
b21 = 6 * sin(pi / 3) / sin(pi / 4)
check(eq(b21, 3 * sqrt(6)), "21: b=3√6")
check_one([2 * sqrt(6), 3 * sqrt(6), 3 * sqrt(2), 6], b21, 1, "21")
check(eq(6 * sin(pi / 4) / sin(pi / 3), 2 * sqrt(6)), "21: převrácený poměr = 2√6")

# ---------- plani-22: kosinová a=7,b=8,γ=60° ----------
c22 = sqrt(49 + 64 - 2 * 7 * 8 * cos(pi / 3))
check(eq(c22, sqrt(57)), "22: c=√57")
check_one([13, sqrt(113), 15, sqrt(57)], c22, 3, "22")
check(49 + 64 + 56 == 169, "22: plus místo minus = 169 (distraktor 13)")

# ---------- plani-23: S=½·5·8·sin30° ----------
check_one([20, 10 * sqrt(3), 40, 10], Rational(1, 2) * 5 * 8 * sin(pi / 6), 3, "23")

# ---------- plani-24: žebřík 10 m, 60° ----------
check_one([5, 10, 5 * sqrt(3), 5 * sqrt(2)], 10 * sin(pi / 3), 2, "24")
check(eq(10 * cos(pi / 3), 5), "24: vodorovná vzdálenost = 5 (distraktor)")

# ---------- plani-25: Heron 13,14,15 ----------
s25 = Rational(13 + 14 + 15, 2)
h25 = sqrt(s25 * (s25 - 13) * (s25 - 14) * (s25 - 15))
check(eq(h25, 84), "25: S=84")
check_one([42, 84, 91, 168], h25, 1, "25")
check(13**2 + 14**2 != 15**2, "25: není pravoúhlý (distraktor 91)")

# ---------- plani-26: čtverec 4 + půlkruh ----------
check_one(
    [16 + 2 * pi, 12 + 2 * pi, 12 + 4 * pi, 16],
    3 * 4 + pi * 2,
    1,
    "26",
)

# ---------- plani-27: kruh ve čtverci 4 ----------
check_one([pi / 2, pi, 4 / pi, pi / 4], pi * 4 / 16, 3, "27")

# ---------- plani-28: vepsaná r, trojúhelník 3-4-5 ----------
check_one([Rational(5, 2), 6, 1, Rational(1, 2)], Rational(2 * 6, 12), 2, "28")
check(eq(Rational(5, 2), 5 / 2), "28: opsaná R=2,5 (distraktor)")

# ---------- dril ----------
check_one([7, 5, sqrt(7), 12], sqrt(9 + 16), 1, "d01")
check_one([110, 130, 70, 60], 180 - 50 - 60, 2, "d02")
check_one([35, 12, 17, 24], 2 * (5 + 7), 3, "d03")
check_one([60, 30, 16, 32], Rational(1, 2) * 10 * 6, 1, "d04")
check_one([9 * pi, 6 * pi, 3 * pi, 18 * pi], pi * 9, 0, "d05")
check_one([20 * pi, 25 * pi, 10 * pi, 5 * pi], pi * 10, 2, "d06")
check_one([3, 9, 27, 6], 3**2, 1, "d07")
check_one([180, 540, 720, 360], (4 - 2) * 180, 3, "d08")
check_one([80, 40, 160, 100], Rational(80, 2), 1, "d09")
check_one([36, 18, 81, 45], 81, 2, "d10")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
