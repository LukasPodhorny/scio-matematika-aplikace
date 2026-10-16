#!/usr/bin/env python3
"""Nezávislé ověření úloh Kombinatorika a statistika (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně. Parsuje i datový soubor a assertuje,
že právě jedna možnost je správná a její index souhlasí se `spravna`.
Končí nenulově při jakékoli neshodě.
"""

import re
import sys
from collections import Counter
from itertools import permutations, product
from pathlib import Path
from statistics import mean, median, pvariance

from sympy import Rational, binomial, expand, factorial
from sympy.abc import x

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


# ---------- parsování datového souboru ----------
DATA = Path(__file__).resolve().parent.parent / "app/src/content/data/kombinatorika.ts"
text = DATA.read_text(encoding="utf-8")

# Rozdělíme na bloky úloh podle id.
id_hits = [(m.group(1), m.start()) for m in re.finditer(r'id:\s*"(kombi-[^"]+)"', text)]
check(len(id_hits) == len(set(i for i, _ in id_hits)), "id jsou unikátní")
parsed: dict[str, dict] = {}
for idx, (tid, start) in enumerate(id_hits):
    end = id_hits[idx + 1][1] if idx + 1 < len(id_hits) else len(text)
    chunk = text[start:end]
    m_opt = re.search(r"moznosti:\s*\[(.*?)\]", chunk, re.DOTALL)
    m_spr = re.search(r"spravna:\s*(\d)", chunk)
    m_druh = re.search(r'druh:\s*"(scio|dril)"', chunk)
    check(m_opt is not None and m_spr is not None and m_druh is not None, f"{tid}: parsování bloku")
    if not (m_opt and m_spr and m_druh):
        continue
    opts = re.findall(r'"((?:[^"\\]|\\.)*)"', m_opt.group(1))
    check(len(opts) == 4, f"{tid}: právě 4 možnosti (mám {len(opts)})")
    check(len(set(opts)) == 4, f"{tid}: možnosti unikátní")
    spravna = int(m_spr.group(1))
    check(0 <= spravna <= 3, f"{tid}: spravna v rozsahu")
    parsed[tid] = {"opts": opts, "spravna": spravna, "druh": m_druh.group(1)}

n_scio = sum(1 for v in parsed.values() if v["druh"] == "scio")
n_dril = sum(1 for v in parsed.values() if v["druh"] == "dril")
check(n_scio == 26, f"scio má být 26, je {n_scio}")
check(n_dril == 9, f"dril má být 9, je {n_dril}")


def check_numeric(tid: str, hodnoty: list, spravne: object) -> None:
    """Právě jedna možnost se rovná přepočtené odpovědi, a to ta se spravna indexem."""
    if tid not in parsed:
        check(False, f"{tid}: chybí v datech")
        return
    shody = [i for i, h in enumerate(hodnoty) if h is not None and h == spravne]
    check(len(shody) == 1, f"{tid}: právě jedna správná možnost (shody: {shody})")
    if len(shody) == 1:
        check(shody[0] == parsed[tid]["spravna"], f"{tid}: spravna={parsed[tid]['spravna']}, přepočet ukazuje {shody[0]}")


# ---------- kombi-01: trojciferná čísla s různými ciframi ----------
check_numeric("kombi-01", [504, 648, 720, 900], 9 * 9 * 8)
# hrubou silou: trojciferná čísla s navzájem různými ciframi
brute01 = sum(1 for n in range(100, 1000) if len(set(str(n))) == 3)
check(brute01 == 648, f"01: brute-force {brute01}")

# ---------- kombi-02: anagramy STATISTIKA ----------
ct = Counter("STATISTIKA")
check(sorted(ct.values()) == [1, 2, 2, 2, 3], f"02: četnosti písmen {ct}")
odp02 = factorial(10) // (factorial(2) * factorial(3) * factorial(2) * factorial(2))
check_numeric("kombi-02", [75600, 604800, 3628800, 37800], odp02)

# ---------- kombi-03: komise s aspoň jednou ženou ----------
odp03 = binomial(9, 3) - binomial(5, 3)
check_numeric("kombi-03", [40, 74, 80, 84], odp03)
# nezávisle rozborem případů 1/2/3 ženy
pripady03 = binomial(5, 2) * binomial(4, 1) + binomial(5, 1) * binomial(4, 2) + binomial(4, 3)
check(pripady03 == odp03 == 74, f"03: rozbor případů {pripady03}")

# ---------- kombi-04: turnaj každý s každým ----------
check_numeric("kombi-04", [24, 66, 132, 144], binomial(12, 2))

# ---------- kombi-05: dvě knihy vedle sebe ----------
odp05 = 2 * factorial(4)
check_numeric("kombi-05", [24, 48, 60, 120], odp05)
# hrubou silou: permutace 5 knih, knihy 0 a 1 sousedí
brute05 = sum(1 for p in permutations(range(5)) if abs(p.index(0) - p.index(1)) == 1)
check(brute05 == odp05 == 48, f"05: brute-force {brute05}")

# ---------- kombi-06: PIN s aspoň jednou sudou cifrou ----------
odp06 = 10**4 - 5**4
check_numeric("kombi-06", [625, 2500, 5000, 9375], odp06)
# nezávisle součtem přesně-k-sudých
soucet06 = sum(binomial(4, k) * 5**k * 5 ** (4 - k) for k in range(1, 5))
check(soucet06 == odp06 == 9375, f"06: součet případů {soucet06}")

# ---------- kombi-07: 10 stejných bonbónů mezi 3 děti ----------
odp07 = binomial(12, 2)
check_numeric("kombi-07", [66, 120, 220, 59049], odp07)
# hrubou silou: nezáporná řešení a+b+c=10
brute07 = sum(1 for a in range(11) for b in range(11 - a) for c in range(11 - a - b) if a + b + c == 10)
check(brute07 == odp07 == 66, f"07: brute-force {brute07}")
check(3**10 == 59049, "07: distraktor 3^10")

# ---------- kombi-08: 6 lidí kolem kulatého stolu ----------
odp08 = factorial(5)
check_numeric("kombi-08", [24, 60, 120, 720], odp08)
# hrubou silou: permutace modulo rotace
kanon = set()
for p in permutations(range(6)):
    i = p.index(0)
    kanon.add(tuple(p[(i + j) % 6] for j in range(6)))
check(len(kanon) == odp08 == 120, f"08: brute-force {len(kanon)}")

# ---------- kombi-09: koef u x^4 v (x+2)^6 ----------
odp09 = expand((x + 2) ** 6).coeff(x, 4)
check_numeric("kombi-09", [12, 15, 60, 240], odp09)
check(expand((x + 2) ** 6).coeff(x, 2) == 240, "09: distraktor 240 = koef u x^2")

# ---------- kombi-10: absolutní člen (x+1/x)^8 ----------
# (x+1/x)^8 = (x^2+1)^8 / x^8 → absolutní člen = koef u x^8 v (x^2+1)^8
odp10 = expand((x**2 + 1) ** 8).coeff(x, 8)
check_numeric("kombi-10", [8, 56, 70, 256], odp10)

# ---------- kombi-11: součet koeficientů (3x-1)^5 ----------
odp11 = (3 * 1 - 1) ** 5
check_numeric("kombi-11", [-1, 32, 243, 1024], odp11)
from sympy import Poly  # noqa: E402

check(sum(Poly(expand((3 * x - 1) ** 5), x).all_coeffs()) == odp11 == 32, "11: součet koeficientů polynomu")

# ---------- kombi-12: koef u x^3 v (x^2+1/x)^9 ----------
# (x^2+1/x)^9 = (x^3+1)^9 / x^9 → koef u x^3 = koef u x^12 v (x^3+1)^9
odp12 = expand((x**3 + 1) ** 9).coeff(x, 12)
check_numeric("kombi-12", [9, 36, 84, 126], odp12)

# ---------- kombi-13: součet C(10,k) přes sudá k ----------
odp13 = sum(binomial(10, k) for k in range(0, 11, 2))
check_numeric("kombi-13", [256, 512, 1023, 1024], odp13)
check(odp13 == 2**9 == 512, f"13: = 2^9 ({odp13})")

# ---------- kombi-14: součet 9 dvěma kostkami ----------
priznive14 = sum(1 for a, b in product(range(1, 7), repeat=2) if a + b == 9)
odp14 = Rational(priznive14, 36)
check_numeric("kombi-14", [Rational(1, 12), Rational(1, 9), Rational(1, 6), Rational(5, 36)], odp14)

# ---------- kombi-15: 2 bílé bez vracení ----------
odp15 = Rational(binomial(5, 2), binomial(8, 2))
check_numeric("kombi-15", [Rational(25, 64), Rational(5, 16), Rational(5, 14), Rational(5, 28)], odp15)
check(odp15 == Rational(5, 8) * Rational(4, 7) == Rational(5, 14), f"15: sekvenčně {odp15}")

# ---------- kombi-16: aspoň jedna šestka ve 3 hodech ----------
odp16 = 1 - Rational(5, 6) ** 3
check_numeric("kombi-16", [Rational(1, 6), Rational(1, 2), Rational(91, 216), Rational(125, 216)], odp16)
brute16 = sum(1 for h in product(range(1, 7), repeat=3) if 6 in h)
check(Rational(brute16, 216) == odp16 == Rational(91, 216), f"16: brute-force {brute16}/216")

# ---------- kombi-17: Bayes (test na nemoc) ----------
odp17 = (Rational(99, 100) * Rational(1, 100)) / (
    Rational(99, 100) * Rational(1, 100) + Rational(5, 100) * Rational(99, 100)
)
check_numeric("kombi-17", [Rational(1, 100), Rational(1, 6), Rational(95, 100), Rational(99, 100)], odp17)
# četnostní kontrola na 10 000 lidech: 99 pravých pozitivních z 594 pozitivních
check(Rational(99, 99 + 495) == Rational(1, 6), "17: četnostní kontrola")

# ---------- kombi-18: právě 3× orel v 5 hodech ----------
odp18 = Rational(binomial(5, 3), 2**5)
check_numeric("kombi-18", [Rational(1, 8), Rational(3, 32), Rational(5, 16), Rational(1, 2)], odp18)
brute18 = sum(1 for h in product("OR", repeat=5) if h.count("O") == 3)
check(Rational(brute18, 32) == odp18 == Rational(5, 16), f"18: brute-force {brute18}/32")

# ---------- kombi-19: 3 karty stejné barvy ----------
odp19 = Rational(4 * binomial(8, 3), binomial(32, 3))
check_numeric("kombi-19", [Rational(7, 620), Rational(7, 155), Rational(1, 64), Rational(1, 16)], odp19)
# nezávisle sekvenčně: 2. a 3. karta stejné barvy jako 1.
check(Rational(7, 31) * Rational(6, 30) == odp19 == Rational(7, 155), f"19: sekvenčně {odp19}")

# ---------- kombi-20: P(aspoň jeden) pro nezávislé ----------
odp20 = 1 - (1 - Rational(3, 5)) * (1 - Rational(1, 2))
check_numeric("kombi-20", [Rational(3, 10), Rational(1, 2), Rational(4, 5), Rational(11, 10)], odp20)

# ---------- kombi-21: dopočet čísla z průměru ----------
odp21 = 11 * 8 - 10 * 7
check_numeric("kombi-21", [8, 10, 15, 18], odp21)
check(Rational(10 * 7 + odp21, 11) == 8, "21: zpětná kontrola průměru")

# ---------- kombi-22: průměr vs medián (textové možnosti) ----------
check(mean([2, 3, 5, 7, 23]) == 8, "22: průměr 8")
check(median([2, 3, 5, 7, 23]) == 5, "22: medián 5")
check(parsed.get("kombi-22", {}).get("spravna") == 2, "22: správně C (průměr > medián)")

# ---------- kombi-23: rozptyl ----------
m23 = Rational(sum([-1, 0, 1]), 3)
odp23 = sum((Rational(v) - m23) ** 2 for v in [-1, 0, 1]) / 3
check_numeric("kombi-23", [Rational(2, 3), 1, 2, None], odp23)
check(odp23 == Rational(2, 3), f"23: rozptyl {odp23}")
check(abs(pvariance([-1, 0, 1]) - float(odp23)) < 1e-12, "23: shoda se statistics.pvariance")

# ---------- kombi-24: vážený průměr směsi ----------
odp24 = Rational(3 * 120 + 2 * 180, 5)
check_numeric("kombi-24", [144, 150, 300, 360], odp24)

# ---------- kombi-25: modus a medián z četností (textové možnosti) ----------
data25 = [1] * 3 + [2] * 7 + [3] * 5 + [4] * 4 + [5] * 1
check(len(data25) == 20, "25: celkem 20 žáků")
check(Counter(data25).most_common(1)[0][0] == 2, "25: modus 2")
s25 = sorted(data25)
med25 = Rational(s25[9] + s25[10], 2)
check(med25 == Rational(5, 2), f"25: medián {med25}")
check(median(data25) == float(med25), "25: shoda se statistics.median")
check(parsed.get("kombi-25", {}).get("spravna") == 1, "25: správně B")

# ---------- kombi-26: průměrná rychlost (harmonický průměr) ----------
odp26 = 2 / (Rational(1, 60) + Rational(1, 40))
check_numeric("kombi-26", [24, 48, 50, None], odp26)
# nezávisle přes konkrétní vzdálenost 120 km: 240 km / 5 h
check(Rational(240, 2 + 3) == odp26 == 48, f"26: přes vzdálenost {odp26}")

# ---------- dril ----------
check_numeric("kombi-d01", [12, 15, 30, 36], binomial(6, 2))
check_numeric("kombi-d02", [10, 20, 25, 120], 5 * 4)
check_numeric("kombi-d03", [2, 24, 30, 720], factorial(6) // factorial(4))
check_numeric("kombi-d04", [1, 20, 190, 380], binomial(20, 19))
check_numeric("kombi-d05", [25, 31, 32, 120], 2**5)
check_numeric("kombi-d06", [Rational(1, 6), Rational(1, 3), Rational(1, 2), Rational(2, 3)], Rational(2, 6))
check_numeric("kombi-d07", [6, 7, 8, 28], mean([4, 6, 8, 10]))
sd8 = sorted([2, 8, 3, 5])
check_numeric("kombi-d08", [4, Rational(9, 2), 5, Rational(11, 2)], Rational(sd8[1] + sd8[2], 2))
check_numeric("kombi-d09", [Rational(2, 5), Rational(3, 5), Rational(5, 3), Rational(8, 5)], 1 - Rational(3, 5))

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
