#!/usr/bin/env python3
"""Nezávislé ověření úloh Funkce (jiná metoda než postup v datech).

Definiční obory a obory hodnot ověřuje sondami: v sadě strategických bodů
spočítá definovanost / nabytí hodnoty a porovná s každou možností.
Ostatní úlohy přepočítává ze zadání a kontroluje právě jednu správnou možnost.
Křížově kontroluje i mapování id -> spravna přímo v datovém souboru.
Končí nenulově při jakékoli neshodě.
"""

import re
import sys
from pathlib import Path

from sympy import N, Rational, S, Symbol, diff, log, solve, sqrt

FAILURES: list[str] = []
PASSES = 0
x = Symbol("x", real=True)


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


def eqv(a, b) -> bool:
    """Rovnost čísel / boolů / řetězců / n-tic (s tolerancí u čísel)."""
    if isinstance(a, bool) or isinstance(b, bool):
        return bool(a) is bool(b)
    if isinstance(a, str) or isinstance(b, str):
        return a == b
    if isinstance(a, (tuple, list)) and isinstance(b, (tuple, list)):
        return len(a) == len(b) and all(eqv(p, q) for p, q in zip(a, b))
    d = complex(N(S(a) - S(b)))
    return abs(d) < 1e-9


def check_unique(tid: str, spravna: int, opt_vals: list, expected) -> None:
    """Právě možnost `spravna` se shoduje s nezávisle spočteným výsledkem."""
    for i, v in enumerate(opt_vals):
        same = eqv(v, expected)
        check(
            (i == spravna) == same,
            f"{tid}: možnost {i} (={v}) {'má' if i == spravna else 'nesmí'} souhlasit",
        )


def check_mnozina(tid: str, spravna: int, predikat: list, sondy: dict) -> None:
    """Každá možnost je predikát množiny; shoda se sondami jen u správné."""
    for i, p in enumerate(predikat):
        shoda = all(bool(p(xv)) == exp for xv, exp in sondy.items())
        check((i == spravna) == shoda, f"{tid}: možnost {i} shoda={shoda}")


# ---------- křížová kontrola datového souboru ----------
DATA = Path(__file__).resolve().parent.parent / "app/src/content/data/funkce.ts"
text = DATA.read_text(encoding="utf-8")
ids = re.findall(r'id: "(funk-[a-z0-9-]+)"', text)
spravne = [int(v) for v in re.findall(r"spravna: (\d)", text)]
druhy = re.findall(r'druh: "(scio|dril)"', text)
check(len(ids) == len(spravne) == len(druhy), "datový soubor: počty id/spravna/druh")
check(len(set(ids)) == len(ids), "datový soubor: id jsou unikátní")

EXPECTED_SPRAVNA = {
    "funk-01": 1, "funk-02": 2, "funk-03": 3, "funk-04": 2, "funk-05": 3,
    "funk-06": 1, "funk-07": 1, "funk-08": 0, "funk-09": 1, "funk-10": 3,
    "funk-11": 2, "funk-12": 0, "funk-13": 1, "funk-14": 2, "funk-15": 1,
    "funk-16": 0, "funk-17": 3, "funk-18": 2, "funk-19": 2, "funk-20": 0,
    "funk-21": 3, "funk-22": 0, "funk-23": 0, "funk-24": 3, "funk-25": 1,
    "funk-26": 2, "funk-27": 1, "funk-28": 2,
    "funk-d01": 0, "funk-d02": 0, "funk-d03": 0, "funk-d04": 1,
    "funk-d05": 2, "funk-d06": 0, "funk-d07": 1, "funk-d08": 1,
    "funk-d09": 3,
}
for i, tid in enumerate(ids):
    check(
        tid in EXPECTED_SPRAVNA and spravne[i] == EXPECTED_SPRAVNA[tid],
        f"datový soubor: {tid} má spravna={spravne[i]}",
    )
check(set(ids) == set(EXPECTED_SPRAVNA), "datový soubor: množina id")
check(druhy.count("scio") == 28, f"datový soubor: scio={druhy.count('scio')}")
check(druhy.count("dril") == 9, f"datový soubor: dril={druhy.count('dril')}")

# ---------- funk-01: D(√(x-2)/(x²-9)) ----------
def def01(xv):
    xv = S(xv)
    return bool(xv - 2 >= 0 and xv**2 - 9 != 0)


sondy01 = {0: False, 2: True, Rational(5, 2): True, 3: False, 5: True, -3: False}
for xv, exp in sondy01.items():
    check(def01(xv) == exp, f"01: D({xv})={def01(xv)}")
check_mnozina("01", 1, [
    lambda v: v >= 2,
    lambda v: v >= 2 and v != 3,
    lambda v: v > 2 and v != 3,
    lambda v: v != 3 and v != -3,
], sondy01)

# ---------- funk-02: D(√(4-x²)+1/√(x-1)) ----------
def def02(xv):
    xv = S(xv)
    return bool(4 - xv**2 >= 0 and xv - 1 > 0)


sondy02 = {-2: False, 0: False, 1: False, Rational(3, 2): True, 2: True, 3: False}
for xv, exp in sondy02.items():
    check(def02(xv) == exp, f"02: D({xv})={def02(xv)}")
check_mnozina("02", 2, [
    lambda v: 1 <= v <= 2,
    lambda v: -2 <= v <= 2,
    lambda v: 1 < v <= 2,
    lambda v: 1 < v < 2,
], sondy02)

# ---------- funk-03: D(ln(x²-5x+6)) ----------
def def03(xv):
    xv = S(xv)
    return bool(xv**2 - 5 * xv + 6 > 0)


sondy03 = {0: True, 2: False, Rational(5, 2): False, 3: False, 5: True}
for xv, exp in sondy03.items():
    check(def03(xv) == exp, f"03: D({xv})={def03(xv)}")
check_mnozina("03", 3, [
    lambda v: 2 <= v <= 3,
    lambda v: v <= 2 or v >= 3,
    lambda v: 2 < v < 3,
    lambda v: v < 2 or v > 3,
], sondy03)

# ---------- funk-04: D(1/√(9-x²)+√(x+1)) ----------
def def04(xv):
    xv = S(xv)
    return bool(9 - xv**2 > 0 and xv + 1 >= 0)


sondy04 = {-2: False, -1: True, 0: True, Rational(29, 10): True, 3: False, 5: False}
for xv, exp in sondy04.items():
    check(def04(xv) == exp, f"04: D({xv})={def04(xv)}")
check_mnozina("04", 2, [
    lambda v: -1 <= v <= 3,
    lambda v: -1 < v < 3,
    lambda v: -1 <= v < 3,
    lambda v: -3 < v < 3,
], sondy04)

# ---------- funk-05: H(-2x²+8x-5), řešitelnost přes diskriminant ----------
def val05(yv):
    return bool(S(24) - 8 * S(yv) >= 0)  # D = 64-8(5+y) >= 0


sondy05 = {3: True, 4: False, 0: True, 2: True}
for yv, exp in sondy05.items():
    check(val05(yv) == exp, f"05: H({yv})={val05(yv)}")
check_mnozina("05", 3, [
    lambda v: v >= 3,
    lambda v: v <= 2,
    lambda v: v <= -5,
    lambda v: v <= 3,
], sondy05)

# ---------- funk-06: H(3/(x²+1)) ----------
def val06(yv):
    yv = S(yv)
    return bool(yv > 0 and S(3) / yv - 1 >= 0)  # x² = 3/y-1 >= 0


sondy06 = {3: True, 0: False, Rational(3, 2): True, 4: False, -1: False}
for yv, exp in sondy06.items():
    check(val06(yv) == exp, f"06: H({yv})={val06(yv)}")
check_mnozina("06", 1, [
    lambda v: 0 <= v <= 3,
    lambda v: 0 < v <= 3,
    lambda v: 0 < v < 3,
    lambda v: -3 <= v <= 3,
], sondy06)


def parita(f, bod=1):
    """(sudá, lichá, ani, obojí) vyhodnoceno v bodě; bod nesmí být nulový."""
    a, b = S(f(bod)), S(f(-bod))
    check(a != 0, "parita: sonda je nenulová")
    suda = bool(a == b)
    licha = bool(b == -a)
    return [suda, licha, not suda and not licha, suda and licha]


# ---------- funk-07: x³-4x ----------
check_unique("07", 1, parita(lambda v: v**3 - 4 * v), True)

# ---------- funk-08: x²+|x| ----------
check_unique("08", 0, parita(lambda v: v**2 + abs(v)), True)

# ---------- funk-09: x³/(x²-4), nejdřív symetrie D(f) ----------
def def09(xv):
    return bool(S(xv) ** 2 - 4 != 0)


check(def09(3) and def09(-3) and not def09(2) and not def09(-2), "09: D symetrický")
check_unique("09", 1, parita(lambda v: v**3 / (v**2 - 4)), True)

# ---------- funk-10: největší interval klesání x²-6x+5 ----------
xv10 = solve(diff(x**2 - 6 * x + 5, x), x)
check(xv10 == [3], f"10: vrchol={xv10}")


def kles10(xv):
    return bool(2 * S(xv) - 6 < 0)


check(kles10(2) and not kles10(4), "10: klesá vlevo, roste vpravo")
# A: klesá na celém A, ale není největší (svědek 2 mimo A, klesá i tam)
a10 = all(kles10(v) for v in [-100, 0, 1]) and not kles10(2)
# B: vpravo roste; C: není monotonní (svědci 2 a 4); D: klesá všude v D, za 3 už ne
ver10 = [
    a10,
    kles10(4),
    kles10(2) and kles10(4),
    all(kles10(v) for v in [-100, 0, 2, Rational(299, 100)]) and not kles10(4),
]
check_unique("10", 3, ver10, True)

# ---------- funk-11: prostá na R ----------
check_unique("11", 2, [
    S(-1) ** 2 != S(1) ** 2,  # x²: protipříklad ±1
    abs(S(0) - 1) != abs(S(2) - 1),  # |x-1|: protipříklad 0,2
    True,  # (x-1)³+2: viz derivace níže
    S(4) - (-1) ** 2 != S(4) - 1**2,  # 4-x²: protipříklad ±1
], True)
d11 = diff((x - 1) ** 3 + 2, x)
check(d11.expand() == 3 * x**2 - 6 * x + 3, f"11: f'={d11}")
check(S(36) - 4 * 3 * 3 == 0 and d11.subs(x, 0) > 0, "11: f' >= 0, nulová jen v x=1")

# ---------- funk-12: součet kořenů x²-5x+6 ----------
kor12 = solve(x**2 - 5 * x + 6, x)
check(set(kor12) == {2, 3}, f"12: kořeny={kor12}")
check_unique("12", 0, [S(5), S(6), S(11), S(-5)], sum(kor12))

# ---------- funk-13: průsečík 2x-1=-x+5 ----------
res13 = solve(2 * x - 1 + x - 5, x)
check(res13 == [2], f"13: x={res13}")
check_unique("13", 1, [S(2), S(3), S(5), S(-1)], 2 * res13[0] - 1)

# ---------- funk-14: počet řešení |x²-4|=3 ----------
sol14 = solve(abs(x**2 - 4) - 3, x)
check(set(sol14) == {-sqrt(7), -1, 1, sqrt(7)}, f"14: {sol14}")
check_unique("14", 2, [S(2), S(3), S(4), S(0)], len(sol14))

# ---------- funk-15: počet řešení 2^x=4-x ----------
h15 = lambda v: S(2) ** v - (4 - v)  # noqa: E731
exist15 = bool(h15(1) < 0 < h15(2))
rost15 = bool((S(2) ** x * log(2) + 1).subs(x, 0) > 0 and log(2) > 0)
check(exist15, "15: znaménko se mění → kořen existuje")
check(rost15, "15: derivace 2^x·ln2+1 > 0 → ostře rostoucí → nejvýš 1 kořen")
inf15 = bool(h15(0) == 0)  # nekonečně řešení by vyžadovalo h15 ≡ 0
check_unique("15", 1, [not exist15, exist15 and rost15, exist15 and not rost15, inf15], True)

# ---------- funk-16: vrchol -x²+4x-1 ----------
xv16 = -S(4) / (2 * S(-1))
yv16 = -(xv16**2) + 4 * xv16 - 1
check((xv16, yv16) == (2, 3), f"16: [{xv16}, {yv16}]")
check_unique("16", 0, [(2, 3), (-2, -13), (2, -3), (1, 2)], (xv16, yv16))

# ---------- funk-17: minimum x²+4x+7 ----------
xv17 = solve(diff(x**2 + 4 * x + 7, x), x)[0]
min17 = xv17**2 + 4 * xv17 + 7
check((xv17, min17) == (-2, 3), f"17: x={xv17}, min={min17}")
check_unique("17", 3, [S(-2), S(7), S(-3), S(3)], min17)

# ---------- funk-18: posun (x-3)²+1 vůči x² ----------
vx18 = solve(diff((x - 3) ** 2 + 1, x), x)[0]
vy18 = (vx18 - 3) ** 2 + 1
check((vx18, vy18) == (3, 1), f"18: vrchol=[{vx18}, {vy18}]")
check_unique("18", 2, [(-3, 1), (3, -1), (3, 1), (-3, -1)], (vx18 - 0, vy18 - 0))

# ---------- funk-19: maximum -|x+2|+1 ----------
check(-abs(S(-2) + 2) + 1 == 1, "19: hodnota 1 se nabývá v x=-2")
check(bool((-abs(x + 2)).is_nonpositive), "19: -|x+2| <= 0 → f <= 1 všude")
check_unique("19", 2, [S(2), S(-2), S(1), S(-1)], S(1))

# ---------- funk-20: největší interval klesání |x-3| ----------
f20 = lambda v: abs(S(v) - 3)  # noqa: E731
klesa_vlevo = bool(f20(0) > f20(1) > f20(2))
roste_vpravo = bool(f20(3) < f20(4))
check(klesa_vlevo and roste_vpravo, "20: klesá vlevo od 3, roste vpravo")
c20 = bool(f20(-1) > f20(0)) and not bool(f20(1) > f20(2))  # C není největší
ver20 = [
    klesa_vlevo and roste_vpravo,  # A: největší klesající
    not roste_vpravo,  # B: vpravo roste, ne klesá
    c20,  # C: klesá tam, ale není největší
    not roste_vpravo,  # D: na R není monotonní
]
check(f20(1) > f20(2), "20: bod 1 (mimo C) klesá → C není největší")
check_unique("20", 0, ver20, True)

# ---------- funk-21: inverze k 3x-6, zkouška oběma směry ----------
f21 = lambda v: 3 * S(v) - 6  # noqa: E731


def inv21(g):
    return bool(f21(g(0)) == 0 and g(f21(0)) == 0)


check_unique("21", 3, [
    inv21(lambda v: (S(v) - 6) / 3),
    inv21(lambda v: S(v) / 3 - 6),
    inv21(lambda v: 3 * S(v) + 6),
    inv21(lambda v: (S(v) + 6) / 3),
], True)

# ---------- funk-22: D(f⁻¹) pro √(x-1) = H(f), nabytí sond ----------
def nabyta22(yv):
    return solve(sqrt(x - 1) - S(yv), x)


check(nabyta22(0) == [1], "22: 0 se nabývá v x=1")
check(nabyta22(-1) == [], "22: -1 se nenabývá")
check(nabyta22(5) == [26], "22: 5 se nabývá v x=26")
ver22 = [
    len(nabyta22(0)) > 0 and len(nabyta22(-1)) == 0 and len(nabyta22(5)) > 0,
    len(nabyta22(0)) == 0,  # B tvrdí 0 ∉ H
    len(nabyta22(-1)) > 0,  # C tvrdí -1 ∈ H
    len(nabyta22(0)) == 0,  # D tvrdí 0 ∉ H
]
check_unique("22", 0, ver22, True)

# ---------- funk-23: f(g(2)), f=x²+1, g=2x-3 ----------
g23 = 2 * S(2) - 3
check(g23 == 1, f"23: g(2)={g23}")
check_unique("23", 0, [S(2), S(7), S(5), S(1)], g23**2 + 1)

# ---------- funk-24: D(f∘g), f=1/x, g=x-4 ----------
def def24(xv):
    return bool(S(xv) - 4 != 0)


sondy24 = {4: False, 0: True, 5: True}
for xv, exp in sondy24.items():
    check(def24(xv) == exp, f"24: D({xv})={def24(xv)}")
check_mnozina("24", 3, [
    lambda v: v != 0,
    lambda v: v != 0 and v != 4,
    lambda v: True,
    lambda v: v != 4,
], sondy24)

# ---------- funk-25: průsečík 2^x a 2^-x ----------
h25 = lambda v: S(2) ** v - S(2) ** (-v)  # noqa: E731
check(h25(0) == 0, "25: x=0 je řešením")
rost25 = bool((S(2) ** x * log(2) + S(2) ** (-x) * log(2)).subs(x, 0) > 0)
check(rost25 and log(2) > 0, "25: rozdíl je ostře rostoucí → právě 1 řešení")
check_unique("25", 1, [S(0), S(1), S(2)], S(2) ** 0)

# ---------- funk-26: klesající na R ⟺ f(0) > f(1) ----------
def kles26(g):
    return bool(g(0) > g(1))


ver26 = [
    kles26(lambda v: S(2) ** v),
    kles26(lambda v: (S(1) / 3) ** (-v)),
    kles26(lambda v: (S(1) / 2) ** v),
    kles26(lambda v: S(10) ** v),
]
check((S(1) / 3) ** (-1) == 3, "26: (1/3)^-x = 3^x → rostoucí")
check_unique("26", 2, ver26, True)

# ---------- funk-27: porovnání logaritmů ----------
a27 = float(N(log(7) / log(S(1) / 2)))
b27 = float(N(log(5) / log(S(1) / 2)))
c27 = float(N(log(7) / log(2)))
d27 = float(N(log(5) / log(2)))
check(a27 < b27, f"27: log1/2(7)={a27} < log1/2(5)={b27}")
check_unique("27", 1, [a27 > b27, a27 < b27, c27 < d27, a27 == b27], True)

# ---------- funk-28: omezená na R ----------
check(bool((x**2).is_nonnegative), "28: x² >= 0 → 0 < 1/(1+x²) ≤ 1")
check(S(1) / (1 + S(0) ** 2) == 1, "28: hodnota 1 se nabývá")
ver28 = [
    abs(S(100) ** 3) <= 1000,  # x³ neomezená
    S(2) ** 100 <= 1000,  # 2^x neomezená shora
    True,  # 1/(1+x²) sevřená mezi 0 a 1
    S(100) ** 2 - 4 * S(100) <= 1000,  # parabola neomezená shora
]
check_unique("28", 2, ver28, True)

# ---------- funk-d01: f(2), f=2x²-3x+1 ----------
check_unique("d01", 0, [S(3), S(7), S(1), S(11)], 2 * S(4) - 3 * S(2) + 1)

# ---------- funk-d02: D(1/(x-5)) ----------
def defd02(xv):
    return bool(S(xv) - 5 != 0)


sondyd02 = {5: False, 0: True, 6: True}
for xv, exp in sondyd02.items():
    check(defd02(xv) == exp, f"d02: D({xv})={defd02(xv)}")
check_mnozina("d02", 0, [
    lambda v: v != 5,
    lambda v: v != 0,
    lambda v: True,
    lambda v: v >= 5,
], sondyd02)

# ---------- funk-d03: x²-9 ----------
check_unique("d03", 0, parita(lambda v: v**2 - 9), True)

# ---------- funk-d04: průsečík x²+2x-8 s osou y ----------
check_unique("d04", 1, [(0, 8), (0, -8), (-8, 0), (2, -8)], (S(0), S(0) + 0 - 8))

# ---------- funk-d05: vrchol x²-6x+5 ----------
xv5 = -S(-6) / 2
yv5 = xv5**2 - 6 * xv5 + 5
check((xv5, yv5) == (3, -4), f"d05: [{xv5}, {yv5}]")
check_unique("d05", 2, [(-3, 32), (3, 4), (3, -4), (5, 0)], (xv5, yv5))

# ---------- funk-d06: inverze k x+7 ----------
f6 = lambda v: S(v) + 7  # noqa: E731


def inv6(g):
    return bool(f6(g(0)) == 0 and g(f6(0)) == 0)


check_unique("d06", 0, [
    inv6(lambda v: S(v) - 7),
    inv6(lambda v: S(v) + 7),
    inv6(lambda v: 7 - S(v)),
    inv6(lambda v: -S(v) - 7),
], True)

# ---------- funk-d07: g(f(1)), f=3x, g=x+2 ----------
check_unique("d07", 1, [S(9), S(5), S(3), S(6)], 3 * S(1) + 2)

# ---------- funk-d08: log₂8+log₃(1/9) ----------
v8 = log(8, 2) + log(Rational(1, 9), 3)
check(v8 == 1, f"d08: {v8}")
check_unique("d08", 1, [S(5), S(1), S(-1), S(6)], v8)

# ---------- funk-d09: posun x² o 2 doleva, vrcholy kandidátů ----------
# kandidáti rozepsaní na tvar ax²+bx+c: A: x²-4x+4, B: x²+2, C: x²-2, D: x²+4x+4
def vrchol9b(a, b, c):
    a, b, c = S(a), S(b), S(c)
    xv = -b / (2 * a)
    return (xv, a * xv**2 + b * xv + c)


ver9 = [
    vrchol9b(1, -4, 4) == (-2, 0),
    vrchol9b(1, 0, 2) == (-2, 0),
    vrchol9b(1, 0, -2) == (-2, 0),
    vrchol9b(1, 4, 4) == (-2, 0),
]
check(vrchol9b(1, 4, 4) == (-2, 0), "d09: (x+2)² má vrchol [-2, 0]")
check_unique("d09", 3, ver9, True)

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
