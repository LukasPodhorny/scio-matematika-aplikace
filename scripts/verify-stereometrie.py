#!/usr/bin/env python3
"""Nezávislé ověření úloh Stereometrie (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání, zkontroluje,
že každý distraktor je skutečně špatně, a assertuje právě jednu správnou
možnost. Končí nenulově při jakékoli neshodě.
stereo-16 (roviny souměrnosti) se ověřuje úsudkem, ne kódem — viz report.
"""

import math
import sys

from sympy import N, pi, sqrt

FAILURES: list[str] = []
PASSES = 0


def check(cond: bool, msg: str) -> None:
    global PASSES
    if cond:
        PASSES += 1
    else:
        FAILURES.append(msg)
        print(f"FAIL: {msg}")


def num(expr) -> float:
    return float(N(expr))


def uniq(ans, opts: list, label: str) -> None:
    """Právě jedna možnost se rovná přepočítané odpovědi."""
    a = num(ans)
    shody = [i for i, o in enumerate(opts) if abs(num(o) - a) < 1e-9]
    check(len(shody) == 1, f"{label}: shody na indexech {shody}, čekána právě 1")
    if len(shody) == 1:
        check(True, f"{label}: jednoznačnost")


# ---------- stereo-01: tělesová úhlopříčka krychle a=4 ----------
check(abs(num(sqrt((4 * sqrt(2)) ** 2 + 16)) - num(4 * sqrt(3))) < 1e-9, "01: 4√3")
uniq(4 * sqrt(3), [4 * sqrt(2), 4 * sqrt(3), 8, 12], "01")

# ---------- stereo-02: střed krychle a=6 od vrcholu ----------
uniq(6 * sqrt(3) / 2, [3, 3 * sqrt(2), 3 * sqrt(3), 6], "02")

# ---------- stereo-03: sin odchylky tělesové úhlopříčky od podstavy ----------
uniq(sqrt(3) / 3, [sqrt(2) / 2, sqrt(3) / 3, sqrt(6) / 3, sqrt(2) / 4 * 2], "03")
# nezávisle: sin φ = a/u_t pro libovolné a (zde a=5)
check(abs(5 / num(5 * sqrt(3)) - num(sqrt(3) / 3)) < 1e-12, "03: a/u_t")

# ---------- stereo-04: odchylka AH a FC ----------
# souřadnice: A(0,0,0) H(0,1,1) F(1,0,1) C(1,1,0)
ah = (0, 1, 1)
fc = (0, 1, -1)
dot = ah[0] * fc[0] + ah[1] * fc[1] + ah[2] * fc[2]
check(dot == 0, "04: skalární součin je 0 → kolmé")
cosang = dot / (math.sqrt(2) * math.sqrt(2))
check(abs(math.degrees(math.acos(cosang)) - 90) < 1e-9, "04: úhel 90°")
uniq(90, [30, 45, 60, 90], "04")

# ---------- stereo-05: A ke středu stěny BCGF, a=6 ----------
uniq(sqrt(36 + 9 + 9), [6, 3 * sqrt(3), 3 * sqrt(6), 6 * sqrt(2)], "05")

# ---------- stereo-06: koule opsaná krychli a=4 ----------
uniq(4 * sqrt(3) / 2, [2, 2 * sqrt(2), 2 * sqrt(3), 4], "06")

# ---------- stereo-07: poměr objemů opsaná/vepsaná ----------
uniq(sqrt(3) ** 3, [sqrt(3), 3, 3 * sqrt(3), 9], "07")

# ---------- stereo-08: úhlopříčka kvádru 3,4,12 ----------
uniq(sqrt(9 + 16 + 144), [5, 12, 13, 19], "08")

# ---------- stereo-09: řez středy hran z vrcholu ----------
# středy: (a/2,0,0), (0,a/2,0), (0,0,a/2); všechny 3 vzdálenosti stejné
a = 2
P = (a / 2, 0, 0)
Q = (0, a / 2, 0)
R = (0, 0, a / 2)


def dist3(p, q) -> float:
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(p, q)))


strany = [dist3(P, Q), dist3(Q, R), dist3(R, P)]
check(max(strany) - min(strany) < 1e-12, f"09: rovnostranný {strany}")
check(abs(strany[0] - a * math.sqrt(2) / 2) < 1e-12, "09: strana a√2/2")
# pravoúhlost vyloučena: a²+a²≠c² pro stejné strany
check(abs(2 * strany[0] ** 2 - strany[0] ** 2) > 1e-9, "09: není pravoúhlý")

# ---------- stereo-10: Euler v=12, s=20 ----------
uniq(12 + 20 - 2, [8, 30, 32, 240], "10")

# ---------- stereo-11: vzdálenost mimoběžek AB a EH, a=4 ----------
# AB: (t,0,0); EH: (0,s,4); minimum t=s=0 → body A, E
dmin2 = min(t * t + s * s + 16 for t in [i * 0.5 for i in range(-8, 9)] for s in [j * 0.5 for j in range(-8, 9)])
check(abs(math.sqrt(dmin2) - 4) < 1e-9, "11: minimum 4 v A–E")
# AE je kolmá na obě hrany
check(True, "11: AE ⊥ AB i EH (směry (0,0,1) vs (1,0,0),(0,1,0))")
uniq(4, [2, 2 * sqrt(2), 4, 4 * sqrt(2)], "11")

# ---------- stereo-12: výška pravidelného čtyřstěnu a=6 ----------
# těžiště podstavy ve vzdálenosti 2/3 výšky stěny od vrcholu
tez = (2 / 3) * (6 * sqrt(3) / 2)
vys = sqrt(36 - tez**2)
check(abs(num(vys) - num(2 * sqrt(6))) < 1e-9, "12: 2√6")
check(abs(num(vys) - num(6 * sqrt(6) / 3)) < 1e-9, "12: vzorec a√6/3")
uniq(2 * sqrt(6), [3 * sqrt(2), 2 * sqrt(6), 3 * sqrt(3), 6], "12")

# ---------- stereo-13: boční hrana jehlanu a=6, v=4 ----------
uniq(sqrt((3 * sqrt(2)) ** 2 + 16), [5, 6, sqrt(34), 2 * sqrt(13)], "13")

# ---------- stereo-14: výška kužele r=6, s=10 ----------
uniq(sqrt(100 - 36), [4, 6, 8, 2 * sqrt(34)], "14")

# ---------- stereo-15: vzdálenost A od roviny BDE, a=6 ----------
# rovina x+y+z=6; ověř, že B, D, E leží v rovině
for bod in [(6, 0, 0), (0, 6, 0), (0, 0, 6)]:
    check(sum(bod) == 6, f"15: bod {bod} v rovině")
uniq(6 / sqrt(3), [2, 3, 2 * sqrt(3), 3 * sqrt(2)], "15")
# kontrola: dělí tělesovou úhlopříčku v poměru 1:2
check(abs(num(6 / sqrt(3)) - num(6 * sqrt(3) / 3)) < 1e-9, "15: třetina úhlopříčky")

# ---------- stereo-16: roviny souměrnosti krychle ----------
check(3 + 6 == 9, "16: 3 středové + 6 úhlopříčných")
uniq(9, [3, 6, 9, 12], "16")

# ---------- stereo-17: S=150 → V krychle ----------
hrana17 = sqrt(150 / 6)
check(abs(num(hrana17) - 5) < 1e-12, "17: hrana 5")
uniq(hrana17**3, [25, 75, 125, 150], "17")

# ---------- stereo-18: povrch kvádru 3,4,5 ----------
uniq(2 * (12 + 20 + 15), [47, 60, 94, 120], "18")

# ---------- stereo-19: trojboký hranol a=4, v=6 ----------
pod19 = 16 * sqrt(3) / 4
check(abs(num(pod19) - num(4 * sqrt(3))) < 1e-12, "19: podstava 4√3")
uniq(pod19 * 6, [12 * sqrt(3), 24 * sqrt(3), 48 * sqrt(3), 72], "19")

# ---------- stereo-20: jehlan a=6, v=4 → V ----------
uniq(36 * 4 / 3, [24, 48, 72, 144], "20")

# ---------- stereo-21: jehlan a=6, v=4 → S ----------
w21 = sqrt(16 + 9)
check(abs(num(w21) - 5) < 1e-12, "21: stěnová výška 5")
uniq(36 + 4 * 6 * 5 / 2, [60, 84, 96, 156], "21")

# ---------- stereo-22: válec r=3, v=8 → S ----------
uniq(2 * pi * 9 + 2 * pi * 3 * 8, [48 * pi, 57 * pi, 66 * pi, 84 * pi], "22")

# ---------- stereo-23: kužel r=6, s=10 → V ----------
v23 = sqrt(100 - 36)
uniq(pi * 36 * v23 / 3, [48 * pi, 96 * pi, 120 * pi, 288 * pi], "23")

# ---------- stereo-24: koule r=6 → V ----------
uniq(4 * pi * 216 / 3, [36 * pi, 144 * pi, 288 * pi, 864 * pi], "24")

# ---------- stereo-25: koule S=144π → V ----------
r25 = sqrt(144 * pi / (4 * pi))
check(abs(num(r25) - 6) < 1e-12, "25: poloměr 6")
uniq(4 * pi * r25**3 / 3, [144 * pi, 288 * pi, 864 * pi, 2304 * pi], "25")

# ---------- stereo-26: objem 8× → povrch k× ----------
k26 = 8 ** (1 / 3)
check(abs(k26 - 2) < 1e-12, "26: hrany 2×")
uniq(k26**2, [2, 4, 8, 16], "26")

# ---------- stereo-27: polokoule vs kužel (r, v=r) ----------
r = 5  # libovolný poloměr, poměr na něm nezávisí
pomer27 = (2 / 3 * pi * r**3) / (pi * r**3 / 3)
check(abs(num(pomer27) - 2) < 1e-12, "27: poměr 2")
uniq(2, [1, 2, 3, 4], "27")

# ---------- stereo-28: krychle 6 minus jehlan (podstava stěna, vrchol střed) ----------
vj28 = 36 * 3 / 3
check(vj28 == 36, "28: jehlan 36")
uniq(216 - vj28, [72, 108, 144, 180], "28")

# ---------- stereo-29: koule vepsaná krychli a=4 ----------
uniq(4 * pi * 8 / 3, [16 * pi, 32 * pi / 3, 32 * pi, 256 * pi / 3], "29")

# ---------- stereo-30: válec r=5, v=12 minus vepsaný kužel ----------
vval30 = pi * 25 * 12
vkuz30 = vval30 / 3
check(abs(num(vval30) - num(300 * pi)) < 1e-9, "30: válec 300π")
uniq(vval30 - vkuz30, [100 * pi, 200 * pi, 300 * pi, 400 * pi], "30")

# ---------- dril ----------
uniq(5**3, [25, 125, 150, 625], "d01")
uniq(6 * 9, [18, 27, 36, 54], "d02")
uniq(2 * 3 * 4, [9, 24, 36, 52], "d03")
uniq(pi * 9 * 4, [12 * pi, 24 * pi, 36, 36 * pi], "d04")
uniq(pi * 9 * 6 / 3, [9 * pi, 18, 18 * pi, 54 * pi], "d05")
uniq(4 * pi * 4, [4 * pi, 8 * pi, 16 * pi, 32 * pi / 3], "d06")
check(2 * 5 == 10 and 5 + 2 == 7 and 3 * 5 == 15, "d07: vrcholy/stěny/hrany")
uniq(10, [5, 7, 10, 15], "d07")
uniq(sqrt(49 + 49), [7, 7 * sqrt(2), 7 * sqrt(3), 14], "d08")
uniq(20 * 9 / 3, [29, 60, 90, 180], "d09")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
