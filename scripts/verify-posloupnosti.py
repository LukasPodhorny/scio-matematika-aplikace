#!/usr/bin/env python3
"""Nezávislé ověření úloh Posloupnosti a řady (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání, zkontroluje,
že každý distraktor je skutečně špatně, a assertuje právě jednu správnou
možnost. Navíc strukturálně ověří datový soubor (id, index správné,
4 unikátní možnosti). Končí nenulově při jakékoli neshodě.
"""

import re
import sys
from pathlib import Path

from sympy import (
    S,
    limit,
    oo,
    Rational,
    sqrt,
    solve,
    simplify,
    N,
    real_root,
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


def check_one(tid: str, opts: list, correct, marked: int) -> None:
    """Právě možnost `marked` se rovná nezávisle spočítané správné hodnotě."""
    n_ok = 0
    for i, o in enumerate(opts):
        if o == correct:
            n_ok += 1
    check(n_ok == 1, f"{tid}: právě jedna možnost odpovídá správné hodnotě")
    for i, o in enumerate(opts):
        if i == marked:
            check(o == correct, f"{tid}: možnost {i} má být správná ({o} == {correct})")
        else:
            check(o != correct, f"{tid}: možnost {i} musí být špatná ({o} != {correct})")


from sympy import Symbol  # noqa: E402

n = Symbol("n", positive=True)
k = Symbol("k", integer=True, positive=True)
x = Symbol("x")
dd = Symbol("d")
q = Symbol("q")
t = Symbol("t")

# Očekávané indexy správných možností (slouží i strukturální kontrole).
MARKED = {
    "posl-01": 2, "posl-02": 2, "posl-03": 0, "posl-04": 1, "posl-05": 3,
    "posl-06": 2, "posl-07": 0, "posl-08": 2, "posl-09": 1, "posl-10": 0,
    "posl-11": 2, "posl-12": 1, "posl-13": 0, "posl-14": 1, "posl-15": 3,
    "posl-16": 1, "posl-17": 0, "posl-18": 2, "posl-19": 3, "posl-20": 0,
    "posl-21": 3, "posl-22": 0, "posl-23": 1, "posl-24": 1, "posl-25": 3,
    "posl-26": 3, "posl-27": 2, "posl-28": 2,
    "posl-d01": 0, "posl-d02": 1, "posl-d03": 2, "posl-d04": 2, "posl-d05": 0,
    "posl-d06": 2, "posl-d07": 0, "posl-d08": 1, "posl-d09": 1, "posl-d10": 2,
}

# ---------- posl-01: a1=7, d=4, a12 ----------
check_one("posl-01", [55, 47, 51, 44], 7 + 11 * 4, MARKED["posl-01"])

# ---------- posl-02: a5=17, a11=47 → a1 ----------
d02 = Rational(47 - 17, 11 - 5)
check(d02 == 5, "02: d=5")
check_one("posl-02", [12, -7, -3, -8], 17 - 4 * d02, MARKED["posl-02"])
check(17 - 4 * 6 == -7, "02: distraktor -7 odpovídá d=6 (5 kroků)")
check(47 - 11 * 5 == -8, "02: distraktor -8 odpovídá a11-11d")

# ---------- posl-03: a1=3, d=2, s20 ----------
a20 = 3 + 19 * 2
check(a20 == 41, "03: a20=41")
check_one("posl-03", [440, 880, 820, 460], Rational(20, 2) * (3 + a20), MARKED["posl-03"])
check(Rational(20, 2) * (3 + 43) == 460, "03: distraktor 460 odpovídá a20=43")

# ---------- posl-04: mezi 4 a 40 vložit 5 čísel, třetí vložené ----------
d04 = Rational(40 - 4, 6)
check(d04 == 6, "04: d=6")
vlozene = [4 + d04 * i for i in range(1, 6)]
check(vlozene == [10, 16, 22, 28, 34], f"04: {vlozene}")
check_one("posl-04", [16, 22, 28, Rational(256, 10)], vlozene[2], MARKED["posl-04"])
check(4 + 3 * Rational(36, 5) == Rational(256, 10), "04: distraktor 25,6 odpovídá d=36/5")

# ---------- posl-05: a1=2, d=5, s_n=354 ----------
m = Symbol("m")  # bez předpokladů: rovnice má dva kořeny
koreny05 = solve(5 * m**2 - m - 708, m)
check(set(koreny05) == {12, Rational(-59, 5)}, f"05: kořeny {koreny05}")
check([r for r in koreny05 if r > 0] == [12], "05: kladný je jen n=12")
check_one("posl-05", [11, 13, 24, 12], 12, MARKED["posl-05"])
for v in [11, 13, 24, 12]:
    check((v * (5 * v - 1) / 2 == 354) == (v == 12), f"05: dosazení n={v}")

# ---------- posl-06: AP trojice, součet 18, součin 120, největší ----------
prostredni06 = Rational(18, 3)
check(prostredni06 == 6, "06: prostřední=6")
d06 = solve(6 * (36 - dd**2) - 120, dd)
check(set(d06) == {-4, 4}, f"06: d={d06}")
trojice06 = [2, 6, 10]
check(sum(trojice06) == 18 and trojice06[0] * trojice06[1] * trojice06[2] == 120, "06: trojice")
check_one("posl-06", [6, 12, 10, 8], max(trojice06), MARKED["posl-06"])
# žádná jiná trojice se součtem 18 a součinem 120 neexistuje
for m in [6, 12, 8]:
    d_kand = abs(m - 6)
    check(6 * (36 - d_kand**2) != 120, f"06: max={m} nedává součin 120")

# ---------- posl-07: která je aritmetická ----------
def je_ap(f):
    return simplify(f.subs(n, n + 1) - f) == simplify(f.subs(n, 2) - f.subs(n, 1)) and len(
        simplify(f.subs(n, n + 1) - f).free_symbols
    ) == 0

ap07 = [je_ap(5 - 2 * n), je_ap(n**2 - 1), je_ap(2**n), je_ap(3 / n)]
check(ap07 == [True, False, False, False], f"07: {ap07}")
check_one("posl-07", ap07, True, MARKED["posl-07"])

# ---------- posl-08: a1=3, q=2, a7 ----------
check_one("posl-08", [384, 96, 192, 42], 3 * 2**6, MARKED["posl-08"])

# ---------- posl-09: a3=12, a6=96 → q ----------
q09 = real_root(Rational(96, 12), 3)
check(q09 == 2, "09: q=2")
check_one("posl-09", [8, 2, 2 * sqrt(2), -2], q09, MARKED["posl-09"])
check((-2) ** 3 == -8, "09: (-2)^3=-8, takže -2 špatně")

# ---------- posl-10: a1=2, q=3, s6 ----------
check_one("posl-10", [728, 1456, 364, 242], 2 * (3**6 - 1) / 2, MARKED["posl-10"])
check(2 * (3**5 - 1) / 2 == 242, "10: distraktor 242 = s5")

# ---------- posl-11: zdvojení, po 8 h 12800 ----------
p0 = Rational(12800, 2**8)
check(p0 == 50, "11: p0=50")
check(p0 * 2**8 == 12800, "11: zkouška vpřed")
check_one("posl-11", [100, 1600, 50, 25], p0, MARKED["posl-11"])
check(Rational(12800, 2**7) == 100 and Rational(12800, 2**9) == 25, "11: distraktory 100/25")

# ---------- posl-12: GP trojice, krajní součet 20, prostřední 6 ----------
koreny12 = solve(t**2 - 20 * t + 36, t)
check(set(koreny12) == {2, 18}, f"12: {koreny12}")
check_one("posl-12", [20, 18, 6, 10], max(koreny12), MARKED["posl-12"])
check(0 * 20 != 36, "12: max=20 by dalo součin 0")
check(10 * 10 != 36, "12: max=10 by dal součin 100")

# ---------- posl-13: mezi 5 a 135 vložit 2, součet vložených ----------
q13 = real_root(Rational(135, 5), 3)
check(q13 == 3, "13: q=3")
check_one("posl-13", [60, 140, 45, 150], 5 * q13 + 5 * q13**2, MARKED["posl-13"])

# ---------- posl-14: a1=4, q=3, s_n=484 ----------
res14 = solve(4 * (3**n - 1) / 2 - 484, n)
check(res14 == [5] or set(res14) == {5}, f"14: {res14}")
check_one("posl-14", [6, 5, 3, 4], 5, MARKED["posl-14"])
for v in [6, 5, 3, 4]:
    check((4 * (3**v - 1) / 2 == 484) == (v == 5), f"14: dosazení n={v}")

# ---------- posl-15: x, x+3, x+15 → q ----------
x15 = solve((x + 3) ** 2 - x * (x + 15), x)
check(x15 == [1], f"15: x={x15}")
check_one("posl-15", [3, 16, Rational(1, 4), 4], (1 + 3) / 1, MARKED["posl-15"])

# ---------- posl-16: limita (3n²+2n-1)/(5n²-n+4) ----------
lim16 = limit((3 * n**2 + 2 * n - 1) / (5 * n**2 - n + 4), n, oo)
check(lim16 == Rational(3, 5), f"16: {lim16}")
check_one(
    "posl-16", [Rational(-1, 4), Rational(3, 5), -2, oo], lim16, MARKED["posl-16"]
)
check(abs(float(((3 * n**2 + 2 * n - 1) / (5 * n**2 - n + 4)).subs(n, 10**6)) - 0.6) < 1e-5, "16: numericky")

# ---------- posl-17: limita √(n²+3n)-n ----------
lim17 = limit(sqrt(n**2 + 3 * n) - n, n, oo)
check(lim17 == Rational(3, 2), f"17: {lim17}")
check_one("posl-17", [Rational(3, 2), 0, 3, oo], lim17, MARKED["posl-17"])
check(abs(float((sqrt(n**2 + 3 * n) - n).subs(n, 10**6)) - 1.5) < 1e-4, "17: numericky")

# ---------- posl-18: limita (2·3ⁿ-5)/(3ⁿ+2ⁿ) ----------
lim18 = limit((2 * 3**n - 5) / (3**n + 2**n), n, oo)
check(lim18 == 2, f"18: {lim18}")
check_one("posl-18", [1, oo, 2, 3], lim18, MARKED["posl-18"])

# ---------- posl-19: limita (1+…+n)/n² ----------
soucet19 = n * (n + 1) / 2
check(soucet19.subs(n, 10) == 55, "19: součet 1..10=55")
lim19 = limit(soucet19 / n**2, n, oo)
check(lim19 == Rational(1, 2), f"19: {lim19}")
check_one("posl-19", [1, 0, oo, Rational(1, 2)], lim19, MARKED["posl-19"])

# ---------- posl-20: která diverguje k +∞ ----------
lim20a = limit((n**2 + 1) / (2 * n + 3), n, oo)
lim20b = limit(3 * n / (n**2 + 1), n, oo)
lim20d = limit((n + 2) / (3 * n - 1), n, oo)
check(lim20a == oo and lim20b == 0 and lim20d == Rational(1, 3), "20: limity A/B/D")
f20c = (-1) ** n * n
check(f20c.subs(n, 100) == 100 and f20c.subs(n, 101) == -101, "20: C střídá znaménka")
div20 = [lim20a == oo, lim20b == oo, False, lim20d == oo]
check(div20 == [True, False, False, False], f"20: {div20}")
check_one("posl-20", div20, True, MARKED["posl-20"])

# ---------- posl-21: která je klesající ----------
def klesa(f):
    d1 = simplify(f.subs(n, 1 + 1) - f.subs(n, 1))
    d2 = simplify(f.subs(n, 2 + 1) - f.subs(n, 2))
    d3 = simplify(f.subs(n, 50 + 1) - f.subs(n, 50))
    return bool(d1 < 0 and d2 < 0 and d3 < 0) and len(
        simplify(f.subs(n, n + 1) - f).free_symbols - {n}
    ) == 0 and all(
        float(simplify(f.subs(n, n + 1) - f).subs(n, v)) < 0 for v in [1, 2, 3, 50, 1000]
    )

kl21 = [klesa(2 * n + 1), klesa((-1) ** n), klesa(n**2), klesa(5 - n)]
check(kl21 == [False, False, False, True], f"21: {kl21}")
check_one("posl-21", kl21, True, MARKED["posl-21"])

# ---------- posl-22: řada a1=12, q=1/3 ----------
check(abs(float(Rational(1, 3))) < 1, "22: |q|<1")
check_one("posl-22", [18, 36, 9, 8], 12 / (1 - Rational(1, 3)), MARKED["posl-22"])
check(12 / (1 + Rational(1, 3)) == 9, "22: distraktor 9 = a1/(1+q)")
check(12 / Rational(1, 3) == 36, "22: distraktor 36 = a1/q")

# ---------- posl-23: 0,2727… jako zlomek ----------
x23 = Rational(27, 99)
check(x23 == Rational(3, 11), "23: 27/99=3/11")
import math as _math

check(_math.gcd(3, 11) == 1, "23: základní tvar")
check(abs(float(x23) - 0.272727) < 1e-5, "23: desetinný rozvoj")
check_one(
    "posl-23",
    [Rational(27, 100), Rational(3, 11), Rational(1, 3), Rational(27, 90)],
    x23,
    MARKED["posl-23"],
)

# ---------- posl-24: míč z 8 m, odrazy do poloviny ----------
draha24 = 8 + 2 * (4 / (1 - Rational(1, 2)))
check(draha24 == 24, f"24: {draha24}")
check_one("posl-24", [16, 24, 32, 12], draha24, MARKED["posl-24"])
check(8 / (1 - Rational(1, 2)) == 16, "24: distraktor 16 = řada bez zdvojení")
check(2 * 16 == 32, "24: distraktor 32 = zdvojeno vše")

# ---------- posl-25: řada a1=9, s=12 → q ----------
q25 = solve(9 / (1 - q) - 12, q)
check(q25 == [Rational(1, 4)], f"25: {q25}")
check(abs(float(q25[0])) < 1, "25: |q|<1")
check_one(
    "posl-25",
    [Rational(3, 4), Rational(4, 3), Rational(1, 3), Rational(1, 4)],
    q25[0],
    MARKED["posl-25"],
)

# ---------- posl-26: a2=6, a5=3/4 → součet řady ----------
q26 = real_root(Rational(3, 4) / 6, 3)
check(q26 == Rational(1, 2), f"26: q={q26}")
a1_26 = 6 / q26
check(a1_26 == 12, "26: a1=12")
check_one("posl-26", [12, 18, 8, 24], a1_26 / (1 - q26), MARKED["posl-26"])
check(12 / (1 + Rational(1, 2)) == 8, "26: distraktor 8 = a1/(1+q)")

# ---------- posl-27: 8000 Kč, 5 % p.a. složeně, 2 roky ----------
castka27 = 8000 * Rational(105, 100) ** 2
check(castka27 == 8820, f"27: {castka27}")
check_one("posl-27", [8800, 8400, 8820, 9261], castka27, MARKED["posl-27"])
check(8000 + 2 * 400 == 8800, "27: distraktor 8800 = jednoduše")
check(8000 * Rational(105, 100) ** 3 == 9261, "27: distraktor 9261 = 3 roky")

# ---------- posl-28: 3× 2000 Kč koncem roku, 10 % p.a. ----------
castka28 = 2000 * (Rational(121, 100) + Rational(11, 10) + 1)
check(castka28 == 6620, f"28: {castka28}")
check(2000 * (Rational(11, 10) ** 3 - 1) / Rational(1, 10) == 6620, "28: vzorec GP")
check_one("posl-28", [6000, 6600, 6620, 7260], castka28, MARKED["posl-28"])
check(2000 * Rational(12, 10) + 2000 * Rational(11, 10) + 2000 == 6600, "28: distraktor 6600 = jednoduše")
check(6000 * Rational(121, 100) == 7260, "28: distraktor 7260 = vše hned")

# ---------- dril ----------
check_one("posl-d01", [32, 35, 30, 29], 5 + 9 * 3, MARKED["posl-d01"])
check_one("posl-d02", [36, 108, 48, 324], 4 * 3**3, MARKED["posl-d02"])
check_one("posl-d03", [50, 100, 55, 110], Rational(10, 2) * 11, MARKED["posl-d03"])
check_one("posl-d04", [32, 16, 31, 15], (2**5 - 1) / 1, MARKED["posl-d04"])
check_one("posl-d05", [3, 4, 12, Rational(24, 10)], Rational(19 - 7, 4), MARKED["posl-d05"])
q_d06 = real_root(Rational(80, 10), 3)
check(q_d06 == 2, "d06: q=2")
check_one("posl-d06", [8, -2, 2, 2 * sqrt(2)], q_d06, MARKED["posl-d06"])
lim_d07 = limit((6 * n + 1) / (2 * n - 3), n, oo)
check_one("posl-d07", [3, Rational(-1, 3), 6, 2], lim_d07, MARKED["posl-d07"])
check_one("posl-d08", [8, 24, 6, 18], 12 / (1 - Rational(1, 2)), MARKED["posl-d08"])
check_one(
    "posl-d09",
    [Rational(2, 5), Rational(4, 9), Rational(9, 4), Rational(2, 45)],
    Rational(4, 9),
    MARKED["posl-d09"],
)
check(abs(float(Rational(4, 9)) - 0.4444) < 1e-3, "d09: rozvoj")
check_one("posl-d10", [2600, 2006, 2060, 2003], 2000 + 2000 * 3 / 100, MARKED["posl-d10"])

# ---------- struktura datového souboru ----------
DATA = Path(__file__).resolve().parent.parent / "app" / "src" / "content" / "data" / "posloupnosti.ts"
text = DATA.read_text(encoding="utf-8")
ids = re.findall(r'id:\s*"([^"]+)"', text)
spravne = [int(m) for m in re.findall(r"spravna:\s*(\d)", text)]
check(len(ids) == len(MARKED) == 38, f"struktura: {len(ids)} úloh")
check(set(ids) == set(MARKED), "struktura: množina id")
check(len(ids) == len(set(ids)), "struktura: id unikátní")
check(len(spravne) == len(ids), "struktura: každá úloha má právě jeden index správné")
for i, sid in zip(spravne, ids):
    check(MARKED.get(sid) == i, f"struktura: {sid} spravna={i}")
# 4 unikátní možnosti u každé úlohy
bloky = re.findall(r"moznosti:\s*\[(.*?)\],\s*\n\s*spravna", text, re.S)
check(len(bloky) == len(ids), f"struktura: {len(bloky)} bloků možností")
for sid, b in zip(ids, bloky):
    opts = re.findall(r'"((?:[^"\\]|\\.)*)"', b)
    check(len(opts) == 4 and len(set(opts)) == 4, f"struktura: {sid} má 4 unikátní možnosti")
check(text.count("verified: true") == len(ids), "struktura: všechny verified")
check(text.count('verifiedBy: "code"') == len(ids), "struktura: všechny code")
check(text.count('zdroj: "handwritten"') == len(ids), "struktura: všechny handwritten")
check(len(re.findall(r"obtiznost:\s*([1-5])", text)) == len(ids), "struktura: obtížnosti 1–5")
check(len(re.findall(r'druh:\s*"scio"', text)) == 28, "struktura: 28 scio")
check(len(re.findall(r'druh:\s*"dril"', text)) == 10, "struktura: 10 dril")
check(len(re.findall(r'tema:\s*"posloupnosti"', text)) == len(ids), "struktura: všechna tema")
check(len(re.findall(r"okruh:\s*\"posloupnosti\"", text)) == len(ids), "struktura: všechny okruh")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
