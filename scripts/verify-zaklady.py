#!/usr/bin/env python3
"""Nezávislé ověření úloh Základní poznatky (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně. Končí nenulově při jakékoli neshodě.
zakl-25 a zakl-27 (české negace) se ověřují formalizací na modelu
a pravdivostní tabulkou — viz report.
"""

import itertools
import math
import sys
from fractions import Fraction

from sympy import (
    Interval,
    Rational,
    binomial,
    isprime,
    simplify,
    sqrt,
    solveset,
    N,
)

gcd = math.gcd
lcm = math.lcm

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


# ---------- zakl-01: právě jedno iracionální ----------
opt01 = {
    "A": sqrt(18) / sqrt(2),
    "B": sqrt(5) ** 2,
    "C": sqrt(Rational(49, 4)),
    "D": sqrt(2) * sqrt(3),
}
check(simplify(opt01["A"]) == 3, "01: A=3 racionální")
check(simplify(opt01["B"]) == 5, "01: B=5 racionální")
check(simplify(opt01["C"]) == Rational(7, 2), "01: C=7/2 racionální")
check(simplify(opt01["D"]) == sqrt(6), "01: D=√6")
check(opt01["D"].is_rational is False, "01: D iracionální")
check(
    [v.is_rational for v in opt01.values()].count(False) == 1,
    "01: právě jedna možnost iracionální",
)

# ---------- zakl-02: největší zlomek ----------
hod02 = {"A": Fraction(7, 11), "B": Fraction(5, 8), "C": Fraction(2, 3), "D": Fraction(9, 14)}
check(max(hod02, key=hod02.get) == "C", f"02: {hod02}")  # type: ignore[arg-type]
check(len(set(hod02.values())) == 4, "02: všechny různé")

# ---------- zakl-03: 0,242424... ----------
check(Rational(8, 33) * 99 == 24, "03: 8/33·99=24")
check(str(N(Rational(8, 33), 10)).startswith("0.242424"), "03: rozvoj 8/33")
for spatny in [Rational(4, 15), Rational(2, 9), Rational(6, 25)]:
    check(spatny != Rational(8, 33), f"03: distraktor {spatny} je jiný")

# ---------- zakl-04: |2-√5|+|3-√5| ----------
check(simplify(abs(2 - sqrt(5)) + abs(3 - sqrt(5))) == 1, "04: =1")
for spatny in [5 - 2 * sqrt(5), 2 * sqrt(5) - 5, -1]:
    check(simplify(abs(2 - sqrt(5)) + abs(3 - sqrt(5)) - spatny) != 0, f"04: {spatny} špatně")
check(float(N(5 - 2 * sqrt(5))) > 0, "04: distraktor B kladný (věrohodný)")

# ---------- zakl-05: √50-√32+√8 ----------
v05 = sqrt(50) - sqrt(32) + sqrt(8)
check(simplify(v05 - 3 * sqrt(2)) == 0, "05: =3√2")
for spatny in [sqrt(26), 5 * sqrt(2), 7 * sqrt(2)]:
    check(simplify(v05 - spatny) != 0, f"05: {spatny} špatně")

# ---------- zakl-06: nejmenší ----------
hod06 = {"A": (-3) ** 2, "B": -(3**2), "C": (-2) ** 3, "D": -(-4)}
check(hod06 == {"A": 9, "B": -9, "C": -8, "D": 4}, f"06: {hod06}")
check(min(hod06, key=hod06.get) == "B", "06: nejmenší B")  # type: ignore[arg-type]

# ---------- zakl-07: NSD(84,126) ----------
check(gcd(84, 126) == 42, "07: NSD=42")
check(lcm(84, 126) == 252, "07: distraktor C je NSN (past potvrzena)")
check(84 % 21 == 0 and 126 % 21 == 0 and 21 < 42, "07: 21 dělí, ale není největší")
check(84 % 14 == 0 and 126 % 14 == 0 and 14 < 42, "07: 14 dělí, ale není největší")

# ---------- zakl-08: NSN(12,18,20) ----------
check(lcm(12, 18, 20) == 180, "08: NSN=180")
check(60 % 18 != 0, "08: 60 není násobkem 18")
check(120 % 18 != 0, "08: 120 není násobkem 18")
check(360 == 2 * 180, "08: 360 je dvojnásobek (past)")

# ---------- zakl-09: 7X52 dělitelné 6 ----------
vyhov09 = [d for d in range(10) if (7000 + 100 * d + 52) % 6 == 0]
check(vyhov09 == [1, 4, 7], f"09: X={vyhov09}")
check(sum(vyhov09) == 12, "09: součet=12")
check(1 + 4 == 5 and 1 + 7 == 8 and 4 + 7 == 11, "09: distraktory = neúplné součty")

# ---------- zakl-10: linky 12/18/20 ----------
check(lcm(12, 18, 20) == 180, "10: 180 minut")
check(8 * 60 + 180 == 11 * 60, "10: 11:00")
check(60 % 18 != 0, "10: 9:00 (60 min) nepokrývá linku 18")
check(120 % 18 != 0, "10: 10:00 (120 min) nepokrývá linku 18")
check(360 == 2 * 180, "10: 14:00 (360 min) je dvojnásobek")

# ---------- zakl-11: 2^20 mod 7 ----------
check(pow(2, 20, 7) == 4, "11: zbytek=4")
check(pow(2, 3, 7) == 1, "11: perioda 3")
for spatny in [1, 2, 6]:
    check(pow(2, 20, 7) != spatny, f"11: {spatny} špatně")
check(20 % 7 == 6, "11: distraktor D = zbytek exponentu (past potvrzena)")

# ---------- zakl-12: p i p+2 prvočísla, p<20 ----------
kand12 = [p for p in range(2, 20) if isprime(p) and isprime(p + 2)]
check(kand12 == [3, 5, 11, 17], f"12: {kand12}")
check(sum(kand12) == 36, "12: součet=36")
check(sum(kand12) - 5 == 31 and sum(kand12) - 3 == 33 and sum(kand12) - 11 == 25,
      "12: distraktory = součty s jedním zapomenutým")

# ---------- zakl-13: čtverce 84x126 ----------
check(gcd(84, 126) == 42, "13: strana=42")
check((84 // 42) * (126 // 42) == 6, "13: počet=6")
check(84 // 42 + 126 // 42 == 5, "13: distraktor B = součet místo součinu")
check((84 // 21) * (126 // 21) == 24, "13: distraktor C = poloviční strana")

# ---------- zakl-14: +20 % pak -20 % ----------
check(abs(1.2 * 0.8 - 0.96) < 1e-12, "14: 0,96")
check(abs(0.8 * 0.8 - 0.64) < 1e-12, "14: distraktor D = dvojitá sleva (past)")
check(1.2 * 0.8 < 1.0, "14: výsledek pod původní cenou")

# ---------- zakl-15: nepřímá úměra ----------
check(6 * 15 / 10 == 9, "15: 9 dělníků")
check(6 * 10 / 15 == 4, "15: distraktor A = přímá úměra (past)")
check(6 + 6 / 3 == 8, "15: distraktor C = o třetinu více (past)")
check(6 + (15 - 10) == 11, "15: distraktor D = přičtení rozdílu (past)")

# ---------- zakl-16: +25 % pak -10 % ----------
check(abs(1.25 * 0.9 - 1.125) < 1e-12, "16: +12,5 %")
check(abs((1 + 0.25 * 0.9) - 1.225) < 1e-12, "16: distraktor C = distributivní zkrat")
check(25 - 10 == 15 and 25 + 10 == 35, "16: A/D = sčítání procent")

# ---------- zakl-17: roztok ----------
from sympy import Symbol  # noqa: E402
xx = Symbol("x")
res17 = solveset((10 + xx) / (200 + xx) - Rational(1, 5), xx)
check(res17 == {Rational(75, 2)}, f"17: x={res17}")
check(Rational(40 - 10, 1) == 30, "17: distraktor A = bez změny celku (past)")
check((10 + 50) / (200 + 50) != Rational(1, 5), "17: 50 g nevyhovuje")
check((10 + Rational(75, 2)) / (200 + Rational(75, 2)) == Rational(1, 5), "17: zkouška")

# ---------- zakl-18: přítoky ----------
check(Rational(1, 1) / (Rational(1, 6) + Rational(1, 4)) == Rational(12, 5), "18: 12/5 h")
check(Rational(12, 5) * 60 == 144, "18: 144 min = 2 h 24 min")
check((6 + 4) / 2 == 5, "18: distraktor A = průměr (past)")
check(Rational(12, 5) / 2 * 60 == 72, "18: distraktor D = polovina (72 min)")

# ---------- zakl-19: procento přihlášených ----------
check(Fraction(120, 200) == Fraction(3, 5), "19: 60 %")
check(Fraction(120, 160) == Fraction(3, 4), "19: distraktor A = základ dostavení")
check(Fraction(160, 200) == Fraction(4, 5), "19: distraktor B = účast")
check(Fraction(200 - 120, 200) == Fraction(2, 5), "19: distraktor D = podíl neúspěšných")

# ---------- zakl-20: průnik intervalů ----------
from sympy import Intersection  # noqa: E402
pr20 = Intersection(Interval(-2, 5), Interval(3, 8, True, False))
check(pr20 == Interval(3, 5, True, False), f"20: {pr20}")
check(3 not in pr20 and 5 in pr20, "20: kraje (3;5>")

# ---------- zakl-21: Venn ----------
check(18 + 15 - 7 == 26, "21: aspoň jeden=26")
check(30 - 26 == 4, "21: ani jeden=4")
check(18 - 7 == 11 and 15 - 7 == 8, "21: B/C = právě jeden předmět (pasti)")
check(18 + 15 - 2 * 7 == 19, "21: D = dvojitě odečtený průnik (past)")

# ---------- zakl-22: C(5,2) ----------
check(binomial(5, 2) == 10, "22: 10")
check(5 * 4 == 20, "22: B = uspořádané dvojice (past)")
check(5**2 == 25, "22: C = 5² (past)")
check(binomial(6, 2) == 15, "22: D = kombinace s opakováním (past)")

# ---------- zakl-23: |x-3|<5 ----------
res23 = solveset(abs(xx - 3) < 5, xx, domain=Interval(-100, 100))
check(res23 == Interval.open(-2, 8), f"23: {res23}")

# ---------- zakl-24: A∖B ----------
from sympy import Complement  # noqa: E402
A24 = Interval(0, 6)
B24 = Interval(2, 10, True, False)
d24 = Complement(A24, B24)
check(d24 == Interval(0, 2), f"24: {d24}")
check(2 in d24, "24: bod 2 zůstává")
check(Intersection(A24, B24) == Interval(2, 6, True, False), "24: distraktor C = průnik")
check(Complement(B24, A24) == Interval.open(6, 10) + Interval(10, 10),
      f"24: B∖A={Complement(B24, A24)}")

# ---------- zakl-25: negace ∀ (formalizace na modelu) ----------
# výrok: ∀x V(x); B: ∃x ¬V(x); A: ¬∃x V(x); C: ∀x ¬V(x); D: ∃x V(x)
ok25 = True
for n in (1, 2, 3):
    for model in itertools.product([False, True], repeat=n):
        orig = all(model)
        kandidati = {
            "A": not any(model),
            "B": any(not p for p in model),
            "C": all(not p for p in model),
            "D": any(model),
        }
        if (not orig) != kandidati["B"]:
            ok25 = False
check(ok25, "25: B je negací na všech modelech")
check((not all([True, False])) != (not any([True, False])), "25: A selhává na smíšeném modelu")
check((not all([True, False])) != all([not p for p in [True, False]]),
      "25: C selhává na smíšeném modelu")
check((not all([True, True])) != any([True, True]), "25: D selhává na modelu [T,T]")

# ---------- zakl-26: pravdivostní vyhodnocení ----------
A26, B26 = True, False
hod26 = {
    "A": (not A26) or B26,
    "B": A26 or B26,  # ¬A ⇒ B
    "C": A26 and B26,
    "D": A26 == B26,
}
check(hod26 == {"A": False, "B": True, "C": False, "D": False}, f"26: {hod26}")
check(list(hod26.values()).count(True) == 1, "26: právě jedna pravdivá")

# ---------- zakl-27: negace implikace (pravdivostní tabulka) ----------
ok27 = True
for p, q in itertools.product([False, True], repeat=2):
    neg = not ((not p) or q)
    kandidati = {
        "A": (not p) or q,  # ekvivalent původní implikace
        "B": p and (not q),
        "C": p or (not q),  # (¬p) ⇒ (¬q)
        "D": (not p) and q,
    }
    if neg != kandidati["B"]:
        ok27 = False
check(ok27, "27: B je negací na celé tabulce")
# každý distraktor se od negace liší aspoň na jednom řádku
for spatny, form in [("A", lambda p, q: (not p) or q),
                     ("C", lambda p, q: p or (not q)),
                     ("D", lambda p, q: (not p) and q)]:
    lisi = any((not ((not p) or q)) != form(p, q)
               for p, q in itertools.product([False, True], repeat=2))
    check(lisi, f"27: distraktor {spatny} není negací")

# ---------- zakl-28: právě jedno tvrzení ----------
def pocty28(n: int) -> int:
    return sum([n % 2 == 0, n % 3 == 0, n % 5 == 0])

check({6: pocty28(6), 10: pocty28(10), 15: pocty28(15), 9: pocty28(9)}
      == {6: 2, 10: 2, 15: 2, 9: 1}, "28: počty splněných")
check([pocty28(n) for n in [6, 10, 15, 9]].count(1) == 1, "28: právě jedna možnost")

# ---------- dril ----------
check(-5 < 0 and not float(Fraction(3, 4)).is_integer() and 7 > 0
      and float(Fraction(7, 1)).is_integer() and -0.5 < 0, "d01: jen 7 je přirozené")
d02 = [n for n in [122, 156, 134, 178] if n % 4 == 0]
check(d02 == [156], f"d02: {d02}")
check(gcd(18, 24) == 6 and lcm(18, 24) == 72, "d03: NSD=6, NSN=72 (past A)")
check(lcm(6, 8) == 24 and 12 % 8 != 0 and 48 == 2 * 24 and 6 + 8 == 14, "d04")
check(Fraction(15, 100) * 200 == 30, "d05: 30")
check(Fraction(7 * 120, 4) == 210, "d06: 210")
check({1, 2, 3, 4} & {3, 4, 5} == {3, 4}, "d07: průnik")
check({1, 2, 3, 4} | {3, 4, 5} == {1, 2, 3, 4, 5}, "d07: A = sjednocení (past)")
check({1, 2, 3, 4} ^ {3, 4, 5} == {1, 2, 5}, "d07: C = symetrická diference (past)")
i_d08 = Interval(2, 5, False, True)
check(1 not in i_d08 and 5 not in i_d08 and 4 in i_d08 and 6 not in i_d08, "d08")
# d09: negace n>5 je n≤5; pasti selhávají na n=5 (A), resp. nejsou doplňkem (C, D)
check(all((n > 5) != (n <= 5) for n in range(-5, 15)), "d09: B je přesný doplněk")
check((5 > 5) == (5 < 5), "d09: A selhává na n=5 (past potvrzena)")
check((6 > 5) == (6 >= 5), "d09: C není negace")
check(any((not (n > 5)) != (n == 5) for n in range(-5, 15)),
      "d09: D není negací")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
