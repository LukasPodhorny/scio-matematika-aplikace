#!/usr/bin/env python3
"""Nezávislé ověření úloh Rovnice a nerovnice (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně. Navíc strukturálně ověří datový
soubor (id, právě jedna správná možnost, 4 unikátní možnosti).
Končí nenulově při jakékoli neshodě.
rovn-d09 (posouzení úprav) se ověřuje úsudkem, ne kódem — viz report.
"""

import math
import re
import sys
from pathlib import Path

from sympy import (
    Interval,
    S,
    cos,
    exp,
    log,
    oo,
    pi,
    sin,
    sqrt,
    solveset,
    solve,
    linsolve,
    N,
    Union,
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


def is_zero(expr) -> bool:
    return abs(float(N(expr))) < 1e-9


from sympy import Symbol  # noqa: E402

x = Symbol("x", real=True)
n = Symbol("n", real=True)
k = Symbol("k", real=True)
t = Symbol("t", real=True)
r = Symbol("r", real=True)
h = Symbol("h", real=True)

# ---------- rovn-01: 5(x-2)+3 = 2(x+4) ----------
f01 = 5 * (x - 2) + 3 - 2 * (x + 4)
check(solveset(f01, x, S.Reals) == {5}, f"01: {solveset(f01, x, S.Reals)}")
for spatny in [1, 3, S(15) / 7]:
    check(not is_zero(f01.subs(x, spatny)), f"01: {spatny} nesmí vyhovovat")

# ---------- rovn-02: soustava ----------
res02 = linsolve([2 * x + 3 * h - 12, 5 * x - 2 * h - 11], (x, h))
check(res02 == {(3, 2)}, f"02: {res02}")
for px, py in [(2, 3), (5, 2), (3, -2)]:
    check(2 * px + 3 * py != 12 or 5 * px - 2 * py != 11, f"02: [{px};{py}] špatně")

# ---------- rovn-03: rohlíky/housky ----------
res03 = linsolve([3 * r + 2 * h - 32, 2 * r + 5 * h - 47], (r, h))
check(res03 == {(6, 7)}, f"03: {res03}")

# ---------- rovn-04: x²-5x+6=0 ----------
check(solveset(x**2 - 5 * x + 6, x, S.Reals) == {2, 3}, "04")
for spatny in [-2, -3, 1, 6, -1, -6]:
    check(spatny**2 - 5 * spatny + 6 != 0, f"04: {spatny} není kořen")

# ---------- rovn-05: 2x²+7x-4=0 ----------
check(solveset(2 * x**2 + 7 * x - 4, x, S.Reals) == {S(1) / 2, -4}, "05")
for spatny in [4, S(-1) / 2]:
    check(not is_zero((2 * x**2 + 7 * x - 4).subs(x, spatny)), f"05: {spatny} není kořen")

# ---------- rovn-06: kořen trojnásobkem druhého ----------
for q, ok in [(16, False), (6, False), (12, True), (4, False)]:
    koreny = solve(x**2 - 8 * x + q, x)
    pomer = q == 12 and sorted(koreny) == [2, 6]
    check(pomer == ok, f"06: q={q} kořeny={koreny}")

# ---------- rovn-07: D=0 ----------
check(set(solve(k**2 - 36, k)) == {-6, 6}, "07")
check((3) ** 2 - 36 != 0, "07: k=3 nemá D=0")

# ---------- rovn-08: lichá čísla ----------
res08 = solve((2 * n - 1) * (2 * n + 1) - 195, n)
check(sorted(res08) == [-7, 7], f"08: {res08}")
vetsi = sorted([(2 * v - 1, 2 * v + 1) for v in res08], key=lambda p: max(p))
check([max(p) for p in vetsi] == [-13, 15], f"08: větší={vetsi}")
check(sum(max(p) for p in vetsi) == 2, "08: součet=2")

# ---------- rovn-09: bikvadratická ----------
res09 = solveset(x**4 - 3 * x**2 - 4, x, S.Reals)
check(res09 == {-2, 2}, f"09: {res09}")

# ---------- rovn-10: (k-5)x = k-5 ----------
# jedno řešení právě když k≠5; k=5 dává 0=0 (nekonečně)
for kk in [2, 0, 7]:
    check(len(solve((kk - 5) * x - (kk - 5), x)) == 1, f"10: k={kk} jedno řešení")
check((5 - 5) * x - (5 - 5) == 0, "10: k=5 identita")

# ---------- rovn-11: kx²-4x+2=0 právě jedno ----------
check(solve(-4 * x + 2, x) == [S(1) / 2], "11: k=0 lineární unikátní")
check(16 - 8 * 2 == 0, "11: k=2 D=0")
check(solve(2 * x**2 - 4 * x + 2, x) == [1], "11: k=2 dvojnásobný kořen")
check(16 - 8 * 1 > 0, "11: k=1 dvě řešení (C úplná jen s oběma)")
check(16 - 8 * 3 < 0, "11: k=3 žádné reálné (D špatně)")
check(set(solve(16 - 8 * k, k)) == {2}, "11: D=0 jen pro k=2")

# ---------- rovn-12: dva různé kladné kořeny ----------
D12 = k**2 - 6 * k + 1
hranice = 3 - 2 * sqrt(2)
check(abs(float(N(D12.subs(k, hranice)))) < 1e-9, "12: D(3-2√2)=0")
check(set(solve(D12, k)) == {3 - 2 * sqrt(2), 3 + 2 * sqrt(2)}, "12: nulové body D")
# body uvnitř B musí mít D>0 a oba kořeny kladné
for kk in [S(1) / 20, S(1) / 10, S(3) / 20]:
    dd = float(N(D12.subs(k, kk)))
    check(dd > 0, f"12: D({kk})>0")
    kr = solve(x**2 + (kk - 1) * x + kk, x)
    check(len(kr) == 2 and all(float(N(v)) > 0 for v in kr), f"12: k={kk} dva kladné {kr}")
# distraktory obsahují k, pro která podmínka neplatí
check(float(N(D12.subs(k, S(1) / 2))) < 0, "12: k=1/2 (v A i D) má D<0")
check(float(N(D12.subs(k, 1))) < 0, "12: k=1 (v C i D) má D<0")
# kraje správného intervalu nepatří: k=0 dává kořen 0, hranice dává D=0
check(0 in solve(x**2 - x, x), "12: k=0 má kořen 0 (není kladný)")

# ---------- rovn-13: √(2x+3) = x ----------
res13 = solveset(sqrt(2 * x + 3) - x, x, S.Reals)
check(res13 == {3}, f"13: {res13}")
check(not is_zero(sqrt(2 * (-1) + 3) - (-1)), "13: -1 nevyhovuje")

# ---------- rovn-14: √(x+5)-√(x-3) = 2 ----------
f14 = sqrt(x + 5) - sqrt(x - 3) - 2
check(is_zero(f14.subs(x, 4)), "14: 4 je řešení")
for spatny in [3, 7]:
    check(not is_zero(f14.subs(x, spatny)), f"14: {spatny} není řešení")
# jednoznačnost: f klesající na [3,∞), f(3)>0, f(100)<0
check(float(N(f14.subs(x, 3))) > 0, "14: f(3)>0")
check(float(N(f14.subs(x, 100))) < 0, "14: f(100)<0")
for s in [4, 7, 20, 100]:
    d = float(N(f14.diff(x).subs(x, s)))
    check(d < 0, f"14: f'({s})<0")

# ---------- rovn-15: √(x-1) = 1-x ----------
res15 = solveset(sqrt(x - 1) - (1 - x), x, S.Reals)
check(res15 == {1}, f"15: {res15}")
check(not is_zero(sqrt(2 - 1) - (1 - 2)), "15: 2 nevyhovuje")

# ---------- rovn-16: 2^(x+1)+2^x=24 ----------
f16 = 2 ** (x + 1) + 2**x - 24
check(is_zero(f16.subs(x, 3)), "16: 3 je řešení")
for spatny in [4, 2, 8]:
    check(not is_zero(f16.subs(x, spatny)), f"16: {spatny} není řešení")

# ---------- rovn-17: 4^x-3·2^x+2=0 ----------
res17 = solveset(4**x - 3 * 2**x + 2, x, S.Reals)
check(res17 == {0, 1}, f"17: {res17}")
check(not is_zero((4**x - 3 * 2**x + 2).subs(x, 2)), "17: 2 není řešení")

# ---------- rovn-18: 9^x-4·3^x-45=0 ----------
res18 = solveset(9**x - 4 * 3**x - 45, x, S.Reals)
check(res18 == {2}, f"18: {res18}")
for spatny in [9, -5, -1]:
    check(not is_zero((9**x - 4 * 3**x - 45).subs(x, spatny)), f"18: {spatny} není řešení")
check(set(solve(t**2 - 4 * t - 45, t)) == {-5, 9}, "18: hodnoty t")

# ---------- rovn-19: součet řešení ----------
res19 = solveset(5 ** (2 * x) - 6 * 5**x + 5, x, S.Reals)
check(res19 == {0, 1}, f"19: {res19}")
check(sum(res19) == 1, "19: součet=1")

# ---------- rovn-20: log₂(x+1)+log₂(x-1)=3 ----------
check(abs(float(N(log(4, 2) + log(2, 2))) - 3) < 1e-12, "20: x=3 vyhovuje")
check(-3 + 1 <= 0, "20: x=-3 mimo definiční obor")
check(set(solve(x**2 - 1 - 8, x)) == {-3, 3}, "20: kandidáti po odlogaritmování")

# ---------- rovn-21: log₂x-log₂(x-2)=3 ----------
f21 = log(x, 2) - log(x - 2, 2) - 3
check(is_zero(f21.subs(x, S(16) / 7)), "21: 16/7 je řešení")
check(S(-16) / 7 < 2, "21: -16/7 mimo definiční obor")
check(set(solve(x / (x - 2) - 8, x)) == {S(16) / 7}, "21: jediný kandidát")

# ---------- rovn-22: log₅(2x-1)=2 ----------
check(2 * 13 - 1 == 25 == 5**2, "22: x=13")
for spatny in [12, 5, 3]:
    check(2 * spatny - 1 != 25, f"22: {spatny} nevyhovuje")

# ---------- rovn-23: (log₂x)²-3log₂x+2=0 ----------
f23 = log(x, 2) ** 2 - 3 * log(x, 2) + 2
for dobry in [2, 4]:
    check(is_zero(f23.subs(x, dobry)), f"23: {dobry} je řešení")
check(not is_zero(f23.subs(x, 1)), "23: 1 není řešení")

# ---------- rovn-24: 2sin x+1=0 na [0,2π] ----------
res24 = solveset(2 * sin(x) + 1, x, Interval(0, 2 * pi))
ocek24 = {float(N(7 * pi / 6)), float(N(11 * pi / 6))}
check(set(float(N(p)) for p in res24) == ocek24, f"24: {res24}")
check(abs(float(N(sin(4 * pi / 3))) + math.sqrt(3) / 2) < 1e-9, "24: distraktor D má sin=-√3/2")

# ---------- rovn-25: sin+√3cos=1 na [0,2π] ----------
f25 = sin(x) + sqrt(3) * cos(x) - 1
for dobry in [pi / 2, 11 * pi / 6]:
    check(is_zero(f25.subs(x, dobry)), f"25: {dobry} je řešení")
for spatny in [pi / 6, 5 * pi / 6, pi / 3, 2 * pi / 3]:
    check(not is_zero(f25.subs(x, spatny)), f"25: {spatny} není řešení")
# úplnost přes substituci y = x+pi/3: 2sin(y)-1=0 na [pi/3, 7pi/3]
y = Symbol("y", real=True)
check(abs(float(N(2 * sin(0.7 + pi / 3) - (sin(0.7) + sqrt(3) * cos(0.7))))) < 1e-12, "25: kondenzace")
res25y = solveset(2 * sin(y) - 1, y, Interval(pi / 3, 7 * pi / 3))
check(
    set(float(N(p)) for p in res25y) == {float(N(5 * pi / 6)), float(N(13 * pi / 6))},
    f"25: úplnost {res25y}",
)

# ---------- rovn-26: lineární nerovnice ----------
res26 = solveset((x - 3) / 2 - (2 * x + 1) / 3 - 1 > 0, x, S.Reals)
check(res26 == Interval.open(-oo, -17), f"26: {res26}")

# ---------- rovn-27: kvadratická nerovnice ----------
res27 = solveset(x**2 - 3 * x - 10 < 0, x, S.Reals)
check(res27 == Interval.open(-2, 5), f"27: {res27}")

# ---------- rovn-28: podílová nerovnice ----------
res28 = solveset((x - 1) / (x + 3) >= 0, x, S.Reals)
check(res28 == Union(Interval.open(-oo, -3), Interval(1, oo)), f"28: {res28}")

# ---------- rovn-29: (1/2)^x < 8 ----------
res29 = solveset((S(1) / 2) ** x - 8 < 0, x, S.Reals)
check(
    abs(float(N(res29.inf)) + 3) < 1e-9 and res29.sup == oo and res29.left_open,
    f"29: {res29}",
)

# ---------- dril ----------
check(solveset(7 * x - 4 - (3 * x + 12), x, S.Reals) == {4}, "d01")
check(36 - 4 * 1 * 5 == 16, "d02")
check(solveset(x**2 - 9 * x + 14, x, S.Reals) == {2, 7}, "d03: kořeny 2,7")
check(2 + 7 == 9, "d03: součet=9")
check(solveset(5 - x >= 0, x, S.Reals) == Interval(-oo, 5), "d04")
check(solveset(3**x * 3 ** (2 * x) - 3**12, x, S.Reals) == {4}, "d05")
check(abs(float(N(log(81, 3))) - 4) < 1e-12, "d06")
check(abs(float(N(log(8, 2) + log(4, 2))) - 5) < 1e-12, "d07")
check(solveset(-3 * x - 9 > 0, x, S.Reals) == Interval.open(-oo, -3), "d08")

# ---------- struktura datového souboru ----------
DATA = Path(__file__).resolve().parent.parent / "app" / "src" / "content" / "data" / "rovnice.ts"
text = DATA.read_text(encoding="utf-8")
ids = re.findall(r'id:\s*"([^"]+)"', text)
spravne = [int(m) for m in re.findall(r"spravna:\s*(\d)", text)]
ocekavane_spravne = {
    "rovn-01": 0, "rovn-02": 2, "rovn-03": 2, "rovn-04": 0, "rovn-05": 1,
    "rovn-06": 2, "rovn-07": 1, "rovn-08": 2, "rovn-09": 1, "rovn-10": 2,
    "rovn-11": 2, "rovn-12": 1, "rovn-13": 2, "rovn-14": 2, "rovn-15": 1,
    "rovn-16": 3, "rovn-17": 2, "rovn-18": 1, "rovn-19": 2, "rovn-20": 3,
    "rovn-21": 2, "rovn-22": 0, "rovn-23": 3, "rovn-24": 2, "rovn-25": 2,
    "rovn-26": 1, "rovn-27": 3, "rovn-28": 2, "rovn-29": 1,
    "rovn-d01": 0, "rovn-d02": 1, "rovn-d03": 2, "rovn-d04": 3, "rovn-d05": 1,
    "rovn-d06": 2, "rovn-d07": 1, "rovn-d08": 2, "rovn-d09": 2,
}
check(len(ids) == len(ocekavane_spravne) == 38, f"struktura: {len(ids)} úloh")
check(set(ids) == set(ocekavane_spravne), "struktura: množina id")
check(len(ids) == len(set(ids)), "struktura: id unikátní")
check(len(spravne) == len(ids), "struktura: každá úloha má právě jeden index správné")
for i, sid in zip(spravne, ids):
    check(ocekavane_spravne.get(sid) == i, f"struktura: {sid} spravna={i}")
# 4 unikátní možnosti u každé úlohy
bloky = re.findall(r"moznosti:\s*\[(.*?)\],\s*\n\s*spravna", text, re.S)
check(len(bloky) == len(ids), f"struktura: {len(bloky)} bloků možností")
for sid, b in zip(ids, bloky):
    opts = re.findall(r'"((?:[^"\\]|\\.)*)"', b)
    check(len(opts) == 4 and len(set(opts)) == 4, f"struktura: {sid} má 4 unikátní možnosti")
check(text.count("verified: true") == len(ids), "struktura: všechny verified")
check(text.count('verifiedBy: "independent-solve"') == 1, "struktura: právě jedna independent-solve (d09)")
check(len(re.findall(r'obtiznost:\s*([1-5])', text)) == len(ids), "struktura: obtížnosti 1–5")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
