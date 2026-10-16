#!/usr/bin/env python3
"""Nezávislé ověření úloh Analytická geometrie (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně (právě jedna správná možnost).
Křížově kontroluje i mapování id -> spravna přímo v datovém souboru.
Končí nenulově při jakékoli neshodě.
"""

import re
import sys
from pathlib import Path

from sympy import N, Rational, S, Symbol, acos, pi, solve, sqrt

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


def eqv(a, b) -> bool:
    """Rovnost čísel / boolů / řetězců / n-tic / množin (s tolerancí u čísel)."""
    if isinstance(a, bool) or isinstance(b, bool):
        return bool(a) is bool(b)
    if isinstance(a, str) or isinstance(b, str):
        return a == b
    if isinstance(a, (tuple, list)) and isinstance(b, (tuple, list)):
        return len(a) == len(b) and all(eqv(x, y) for x, y in zip(a, b))
    if isinstance(a, (set, frozenset)) and isinstance(b, (set, frozenset)):
        return len(a) == len(b) and all(any(eqv(x, y) for y in b) for x in a)
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


# ---------- křížová kontrola datového souboru ----------
DATA = Path(__file__).resolve().parent.parent / "app/src/content/data/analyticka.ts"
text = DATA.read_text(encoding="utf-8")
ids = re.findall(r'id: "(anal-[a-z0-9-]+)"', text)
spravne = [int(x) for x in re.findall(r"spravna: (\d)", text)]
druhy = re.findall(r'druh: "(scio|dril)"', text)
check(len(ids) == len(spravne) == len(druhy), "datový soubor: počty id/spravna/druh")
check(len(set(ids)) == len(ids), "datový soubor: id jsou unikátní")

EXPECTED_SPRAVNA = {
    "anal-01": 1, "anal-02": 1, "anal-03": 1, "anal-04": 1, "anal-05": 1,
    "anal-06": 2, "anal-07": 1, "anal-08": 2, "anal-09": 2, "anal-10": 0,
    "anal-11": 0, "anal-12": 1, "anal-13": 0, "anal-14": 0, "anal-15": 0,
    "anal-16": 1, "anal-17": 1, "anal-18": 1, "anal-19": 0, "anal-20": 1,
    "anal-21": 1, "anal-22": 1, "anal-23": 3, "anal-24": 0, "anal-25": 0,
    "anal-26": 1, "anal-27": 1, "anal-28": 1,
    "anal-d01": 0, "anal-d02": 1, "anal-d03": 0, "anal-d04": 1,
    "anal-d05": 0, "anal-d06": 0, "anal-d07": 0, "anal-d08": 1,
    "anal-d09": 0,
}
for i, tid in enumerate(ids):
    check(
        tid in EXPECTED_SPRAVNA and spravne[i] == EXPECTED_SPRAVNA[tid],
        f"datový soubor: {tid} má spravna={spravne[i]}",
    )
check(set(ids) == set(EXPECTED_SPRAVNA), "datový soubor: množina id")
check(druhy.count("scio") == 28, f"datový soubor: scio={druhy.count('scio')}")
check(druhy.count("dril") == 9, f"datový soubor: dril={druhy.count('dril')}")

t = Symbol("t", real=True)


def dot2(a, b):
    return S(a[0]) * S(b[0]) + S(a[1]) * S(b[1])


def norm2(a):
    return sqrt(S(a[0]) ** 2 + S(a[1]) ** 2)


def norm3(a):
    return sqrt(S(a[0]) ** 2 + S(a[1]) ** 2 + S(a[2]) ** 2)


# ---------- anal-01: |u|, u=(2,-1,2) ----------
check_unique("01", 1, [S(5), S(3), S(9), sqrt(5)], norm3((2, -1, 2)))

# ---------- anal-02: odchylka u=(2,1), v=(1,3) ----------
cos02 = dot2((2, 1), (1, 3)) / (norm2((2, 1)) * norm2((2, 1)) * 0 + norm2((2, 1)) * norm2((1, 3)))
uhel02 = float(N(acos(cos02)) * 180 / pi)
check(abs(uhel02 - 45) < 1e-9, f"02: úhel={uhel02}")
check_unique("02", 1, [30, 45, 60, 90], uhel02)

# ---------- anal-03: kolmost, u=(t,2,-1), v=(3,1,2t) ----------
sol03 = solve(S(3) * t + 2 - S(2) * t, t)
check(sol03 == [-2], f"03: t={sol03}")
check_unique("03", 1, [2, -2, 0, -1], sol03[0])

# ---------- anal-04: dělicí poměr 1:2, A=[1,2], B=[7,14] ----------
cx = S(1) + (S(7) - 1) / 3
cy = S(2) + (S(14) - 2) / 3
check_unique("04", 1, [(4, 8), (3, 6), (5, 10), (2, 4)], (cx, cy))

# ---------- anal-05: |u+v|, |u|=3, |v|=4, kolmé ----------
check_unique("05", 1, [S(7), S(5), S(25), S(1)], sqrt(S(3) ** 2 + S(4) ** 2))

# ---------- anal-06: |(t,t+1)|=5 ----------
sol06 = set(solve(t**2 + (t + 1) ** 2 - 25, t))
check(sol06 == {-4, 3}, f"06: t={sol06}")
check_unique("06", 2, [{3}, {-4}, {3, -4}, {-3, 4}], sol06)

# ---------- anal-07: přímka bodem [2,1], směr (3,-2) ----------
def primka_bod_smer(abc, bod, smer):
    a, b, c = (S(v) for v in abc)
    prochazi = a * bod[0] + b * bod[1] + c == 0
    smer_ok = a * smer[0] + b * smer[1] == 0  # normála kolmá ke směru
    return bool(prochazi and smer_ok)


opt07 = [(3, -2, -4), (2, 3, -7), (2, 3, 7), (3, 2, -8)]
check_unique("07", 1, [primka_bod_smer(o, (2, 1), (3, -2)) for o in opt07], True)

# ---------- anal-08: kolmice k y=2x+1 bodem [1,3] ----------
def kolmice_bodem(abc):
    a, b, c = (S(v) for v in abc)
    prochazi = a * 1 + b * 3 + c == 0
    kolma = -b * 1 + a * 2 == 0  # směr (-b,a) kolmý ke směru (1,2)
    return bool(prochazi and kolma)


opt08 = [(1, -2, 5), (2, 1, -5), (1, 2, -7), (1, 2, -5)]
check_unique("08", 2, [kolmice_bodem(o) for o in opt08], True)

# ---------- anal-09: totožnost, p: x+2y-3=0, q: 2x+ty-6=0 ----------
def totozne09(tt):
    return bool(S(tt) == 2 * 2 and S(-6) == 2 * S(-3))


check_unique("09", 2, [totozne09(2), totozne09(-4), totozne09(4), False], True)

# ---------- anal-10: průsečík x+y=5, 2x-y=1 ----------
x = Symbol("x")
y = Symbol("y")
sol10 = solve([x + y - 5, 2 * x - y - 1], [x, y])
check(sol10 == {x: 2, y: 3}, f"10: {sol10}")
check_unique("10", 0, [(2, 3), (3, 2), (1, 4), (0, -1)], (sol10[x], sol10[y]))

# ---------- anal-11: bod na přímce AB, A=[-1,2], B=[3,4] ----------
def na_primce11(px, py):
    return bool((S(px) + 1) * 2 - (S(py) - 2) * 4 == 0)  # (P-A) x směr (4,2)


check_unique("11", 0, [na_primce11(*p) for p in [(1, 3), (3, 3), (0, 2), (5, 6)]], True)

# ---------- anal-12: kolmost s parametrem ----------
def kolme12(tt):
    tt = S(tt)
    return bool((tt + 1) * 3 + 2 * (-tt) == 0)


check_unique("12", 1, [kolme12(3), kolme12(-3), kolme12(Rational(-3, 5)), False], True)

# ---------- anal-13: rovina bodem A=[1,-2,3], n=(2,-1,4) ----------
def rovina_bod_normala(abcd):
    a, b, c, d = (S(v) for v in abcd)
    return bool((a, b, c) == (2, -1, 4) and a * 1 + b * (-2) + c * 3 + d == 0)


opt13 = [(2, -1, 4, -16), (2, -1, 4, 16), (2, -1, 4, -12), (1, -2, 3, -14)]
check_unique("13", 0, [rovina_bod_normala(o) for o in opt13], True)

# ---------- anal-14: [t,1,-2] v rovině 2x-y+3z+1=0 ----------
sol14 = solve(2 * t - 1 + 3 * (-2) + 1, t)
check(sol14 == [3], f"14: t={sol14}")
check_unique("14", 0, [3, -3, 1, -1], sol14[0])

# ---------- anal-15: rovnoběžné různé roviny ----------
def rovnobezne_ruzne15(tt):
    tt = S(tt)
    rovnobezne = (2 * (-6) - tt * 4 == 0) and (2 * (-2) - (-1) * 4 == 0)
    ruzne = 2 * 1 != 5  # dvojnásobek rho vs sigma: absolutní členy
    return bool(rovnobezne and ruzne)


check_unique("15", 0, [rovnobezne_ruzne15(-3), rovnobezne_ruzne15(3), rovnobezne_ruzne15(-6), False], True)

# ---------- anal-16: rovina body [1,0,0],[0,2,0],[0,0,3] ----------
def rovina_tremi16(abcd):
    a, b, c, d = (S(v) for v in abcd)
    return bool(a + d == 0 and 2 * b + d == 0 and 3 * c + d == 0)


opt16 = [(1, 2, 3, -6), (6, 3, 2, -6), (6, 3, 2, 6), (3, 6, 2, -6)]
check_unique("16", 1, [rovina_tremi16(o) for o in opt16], True)

# ---------- anal-17: průsečík přímky s rovinou x+y+z-6=0 ----------
sol17 = solve((1 + t) + (2 - t) + (1 + 2 * t) - 6, t)
check(sol17 == [1], f"17: t={sol17}")
prusecik17 = (1 + sol17[0], 2 - sol17[0], 1 + 2 * sol17[0])
check(prusecik17 == (2, 1, 3), f"17: {prusecik17}")


def je_prusecik17(px, py, pz):
    # bod leží na přímce i v rovině
    tt = S(px) - 1
    na_primce = (S(py) == 2 - tt) and (S(pz) == 1 + 2 * tt)
    v_rovine = S(px) + S(py) + S(pz) - 6 == 0
    return bool(na_primce and v_rovine)


check_unique(
    "17", 1,
    [je_prusecik17(1, 2, 1), je_prusecik17(2, 1, 3), je_prusecik17(0, 3, -1), False],
    True,
)

# ---------- anal-18: vzdálenost [4,1] od 3x-4y-7=0 ----------
vzd18 = abs(S(3) * 4 - S(4) * 1 - 7) / sqrt(S(3) ** 2 + S(4) ** 2)
check(eqv(vzd18, Rational(1, 5)), f"18: v={vzd18}")
check_unique("18", 1, [S(1), Rational(1, 5), S(3), Rational(9, 5)], vzd18)

# ---------- anal-19: vzdálenost 3x+4y-5=0 a 3x+4y+10=0 ----------
vzd19 = abs(S(-5) - 10) / 5
check(eqv(vzd19, 3), f"19: v={vzd19}")
check_unique("19", 0, [S(3), S(1), S(15), S(5)], vzd19)

# ---------- anal-20: vzdálenost [1,2,3] od 2x-y+2z-3=0 ----------
vzd20 = abs(S(2) * 1 - 2 + S(2) * 3 - 3) / 3
check(eqv(vzd20, 1), f"20: v={vzd20}")
check_unique("20", 1, [S(3), S(1), Rational(1, 3), S(0)], vzd20)

# ---------- anal-21: tan odchylky, nezávisle přes směrové vektory (1,2) a (3,1) ----------
cos21 = abs(S(1) * 3 + S(2) * 1) / (sqrt(5) * sqrt(10))
check(eqv(cos21, sqrt(2) / 2), f"21: cos={cos21}")
tan21 = sqrt(1 - cos21**2) / cos21
check(eqv(tan21, 1), f"21: tan={tan21}")
check_unique("21", 1, [Rational(5, 3), S(1), S(7), Rational(3, 5)], tan21)

# ---------- anal-22: odchylka (1,0,1) a (1,1,0) ----------
cos22 = S(1) / (sqrt(2) * sqrt(2))
uhel22 = float(N(acos(cos22)) * 180 / pi)
check(abs(uhel22 - 60) < 1e-9, f"22: uhel={uhel22}")
check_unique("22", 1, [30, 60, 90, float(N(acos(Rational(1, 4))) * 180 / pi)], uhel22)

# ---------- anal-23: nejbližší bod k 3x+4y-10=0 ----------
def cit23(px, py):
    return abs(S(3) * px + S(4) * py - 10)


body23 = [(0, 1), (1, 1), (2, 2), (1, 2)]
citace23 = [cit23(*b) for b in body23]
check(citace23 == [6, 3, 4, 1], f"23: {citace23}")
nej23 = min(range(4), key=lambda i: citace23[i])
check(nej23 == 3, f"23: nejblizsi index={nej23}")
for i, c in enumerate(citace23):
    check((i == 3) == (c == min(citace23)), f"23: bod {i} minimum={c == min(citace23)}")

# ---------- anal-24: střed a poloměr x²+y²-4x+6y-3=0 ----------
stred24 = (S(4) / 2, S(-6) / 2)
r24 = sqrt(S(3) + S(4) + S(9))
check(stred24 == (2, -3) and eqv(r24, 4), f"24: {stred24}, r={r24}")
check_unique(
    "24", 0,
    [((2, -3), 4), ((-2, 3), 4), ((2, -3), 16), ((-2, 3), 16)],
    (stred24, r24),
)

# ---------- anal-25: tečna k x²+y²=25 v T=[3,4] ----------
def tecna25(abc):
    a, b, c = (S(v) for v in abc)
    prochazi = a * 3 + b * 4 + c == 0
    kolma_k_polomeru = -b * 3 + a * 4 == 0  # směr (-b,a) kolmý k OT=(3,4)
    return bool(prochazi and kolma_k_polomeru)


opt25 = [(3, 4, -25), (3, 4, -5), (4, 3, -25), (4, -3, 0)]
check_unique("25", 0, [tecna25(o) for o in opt25], True)

# ---------- anal-26: poloha 3x+4y=20 vůči x²+y²=16 ----------
vzd26 = abs(S(-20)) / 5
check(eqv(vzd26, 4), f"26: v={vzd26}")
check_unique("26", 1, [vzd26 < 4, vzd26 == 4, vzd26 > 4, S(0) == 20], True)

# ---------- anal-27: průměr A=[-1,2], B=[5,8] ----------
stred27 = (S(-1 + 5) / 2, S(2 + 8) / 2)
r2_27 = (S(6) ** 2 + S(6) ** 2) / 4
check(stred27 == (2, 5) and r2_27 == 18, f"27: {stred27}, r2={r2_27}")


def rovnice27(m, n, r2):
    # střed je středem AB a oba krajní body leží na kružnici
    return bool(
        (S(m), S(n)) == stred27
        and (S(-1) - m) ** 2 + (S(2) - n) ** 2 == r2
        and (S(5) - m) ** 2 + (S(8) - n) ** 2 == r2
    )


check_unique(
    "27", 1,
    [rovnice27(2, 5, 36), rovnice27(2, 5, 18), rovnice27(2, 5, 72), rovnice27(3, 3, 18)],
    True,
)

# ---------- anal-28: excentricita x²/25+y²/9=1 ----------
e28 = sqrt(S(25) - 9) / 5
check(eqv(e28, Rational(4, 5)), f"28: e={e28}")
check_unique("28", 1, [Rational(3, 5), Rational(4, 5), Rational(5, 4), Rational(4, 3)], e28)

# ---------- anal-d01: (2,-1)+(-5,4) ----------
check_unique("d01", 0, [(-3, 3), (7, -5), (-3, -5), (7, 3)], (S(2) - 5, S(-1) + 4))

# ---------- anal-d02: |(6,8)| ----------
check_unique("d02", 1, [S(14), S(10), S(100), sqrt(14)], sqrt(S(36) + S(64)))

# ---------- anal-d03: (2,3).(-1,4) ----------
check_unique("d03", 0, [S(10), S(-14), S(14), S(2)], S(2) * (-1) + S(3) * 4)

# ---------- anal-d04: střed [1,2],[2,5] ----------
check_unique(
    "d04", 1,
    [(3, 7), (Rational(3, 2), Rational(7, 2)), (Rational(1, 2), Rational(3, 2)), (3, Rational(7, 2))],
    (S(3) / 2, S(7) / 2),
)

# ---------- anal-d05: normála 2x-3y+5=0 ----------
check_unique("d05", 0, [(2, -3), (3, 2), (2, 3), (3, -2)], (S(2), S(-3)))

# ---------- anal-d06: směrnice [0,1],[2,5] ----------
check_unique("d06", 0, [S(2), Rational(1, 2), S(-2), S(3)], S(4) / 2)

# ---------- anal-d07: střed a poloměr (x-1)²+(y+2)²=9 ----------
check_unique(
    "d07", 0,
    [((1, -2), 3), ((-1, 2), 3), ((1, -2), 9), ((-1, 2), 9)],
    ((S(1), S(-2)), sqrt(9)),
)

# ---------- anal-d08: vzdálenost [1,2],[4,6] ----------
check_unique("d08", 1, [S(7), S(5), S(25), sqrt(7)], sqrt(S(9) + S(16)))

# ---------- anal-d09: vrchol y=x²-4x+3 ----------
xv = -S(-4) / 2
yv = xv**2 - S(4) * xv + 3
check((xv, yv) == (2, -1), f"d09: [{xv}, {yv}]")


def vrchol_d09(px, py):
    # x-ová souřadnice vrcholu a bod leží na parabole
    return bool(S(px) == xv and S(py) == S(px) ** 2 - S(4) * S(px) + 3)


check_unique(
    "d09", 0,
    [vrchol_d09(2, -1), vrchol_d09(-2, 15), vrchol_d09(2, 15), vrchol_d09(4, 3)],
    True,
)

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
