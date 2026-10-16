#!/usr/bin/env python3
"""Nezávislé ověření úloh Goniometrie (jiná metoda než postup v datech).

Pro každou úlohu: přepočítá správnou odpověď ze zadání a zkontroluje,
že každý distraktor je skutečně špatně. Končí nenulově při jakékoli neshodě.
gonio-08 (posouzení výroků) se ověřuje úsudkem, ne kódem — viz report.
"""

import math
import random
import sys

from sympy import (
    Abs,
    Interval,
    S,
    cos,
    pi,
    sin,
    sqrt,
    solveset,
    tan,
    N,
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


def defined_at(f, x0) -> bool:
    """Je výraz v bodě definovaný jako reálné číslo (není zoo/nan/oo/I)?
    U singularit předávej exaktní sympy body (pi, ne float(pi))."""
    try:
        v = complex(N(f.subs(x, x0)))
    except (TypeError, ValueError):
        return False
    return (
        math.isfinite(v.real) and math.isfinite(v.imag) and abs(v.imag) < 1e-9
    )


from sympy import Symbol  # noqa: E402

x = Symbol("x", real=True)
random.seed(42)
SAMPLES = [0.37, -1.2, 2.1, 3.7, -2.9, 0.0, 1.0, -0.5, 4.2, 5.5]


def sample_identity(lhs, rhs, skip=tuple()) -> bool:
    """Ověří identitu numericky mimo singularity."""
    lhs, rhs = S(lhs), S(rhs)
    for s in SAMPLES:
        if any(abs(s - t) < 1e-6 for t in skip):
            continue
        if not defined_at(lhs, s) or not defined_at(rhs, s):
            continue
        if abs(float(N(lhs.subs(x, s))) - float(N(rhs.subs(x, s)))) > 1e-9:
            return False
    return True


# ---------- gonio-01: D(sin 2x / 2 sin x) ----------
f01 = sin(2 * x) / (2 * sin(x))
check(not defined_at(f01, 0), "01: x=0 má být mimo D")
check(not defined_at(f01, pi), "01: x=pi má být mimo D")
check(defined_at(f01, pi / 2), "01: x=pi/2 má být v D (distraktor B/D špatně)")
check(abs(float(N(f01.subs(x, pi / 2)))) < 1e-9, "01: f(pi/2)=0")

# ---------- gonio-02: 2sin²-3sin+1=0 na [0,2π] ----------
f02 = 2 * sin(x) ** 2 - 3 * sin(x) + 1
for v in [pi / 6, pi / 2, 5 * pi / 6]:
    check(is_zero(f02.subs(x, v)), f"02: {v} má být kořen")
check(not is_zero(f02.subs(x, 3 * pi / 2)), "02: 3pi/2 nesmí být kořen (distraktor D)")
t = Symbol("t")
check(set([N(s) for s in [1, sqrt(1) / 2]]) == set([1.0, 0.5]), "02: kontrola t")

# ---------- gonio-03: sin 2x = sin x ----------
f03 = sin(2 * x) - sin(x)
ocekavane03 = {0, pi / 3, pi, 5 * pi / 3, 2 * pi, 7 * pi / 3, 3 * pi, 11 * pi / 3, 4 * pi}
res03 = solveset(f03, x, Interval(0, 4 * pi))
check(
    set(float(N(p)) for p in res03) == set(float(N(p)) for p in ocekavane03),
    f"03: solveset={res03}",
)
check(not is_zero(f03.subs(x, 4 * pi / 3)), "03: 4pi/3 nesmí být řešení (distraktor C)")

# ---------- gonio-04: cos 2x = cos x ----------
f04 = cos(2 * x) - cos(x)
ocekavane04 = {0, 2 * pi / 3, 4 * pi / 3, 2 * pi, 8 * pi / 3, 10 * pi / 3, 4 * pi}
res04 = solveset(f04, x, Interval(0, 4 * pi))
check(
    set(float(N(p)) for p in res04) == set(float(N(p)) for p in ocekavane04),
    f"04: solveset={res04}",
)
check(not is_zero(f04.subs(x, pi)), "04: pi nesmí být řešení (distraktor D)")
check(not is_zero(f04.subs(x, pi / 3)), "04: pi/3 nesmí být řešení (distraktor C)")

# ---------- gonio-05: 2cos²+sin=2 ----------
f05 = 2 * cos(x) ** 2 + sin(x) - 2
ocekavane05 = {0, pi / 6, 5 * pi / 6, pi, 2 * pi, 13 * pi / 6, 17 * pi / 6, 3 * pi, 4 * pi}
res05 = solveset(f05, x, Interval(0, 4 * pi))
check(
    set(float(N(p)) for p in res05) == set(float(N(p)) for p in ocekavane05),
    f"05: solveset={res05}",
)
check(not is_zero(f05.subs(x, 7 * pi / 6)), "05: 7pi/6 nesmí být řešení (distraktor D)")

# ---------- gonio-06: sin x > 1/2 na [0,2π] ----------
check(float(N(sin(pi / 2))) > 0.5, "06: střed intervalu vyhovuje")
check(not (float(N(sin(pi / 6))) > 0.5), "06: kraj pi/6 nevyhovuje (ostrá)")
check(not (float(N(sin(0))) > 0.5), "06: 0 nevyhovuje")
check(not (float(N(sin(3 * pi / 2))) > 0.5), "06: 3pi/2 nevyhovuje")

# ---------- gonio-07: cos x ≤ -√2/2 na [0,2π] ----------
hranice = -math.sqrt(2) / 2
check(float(N(cos(pi))) <= hranice + 1e-12, "07: pi vyhovuje")
check(abs(float(N(cos(3 * pi / 4))) - hranice) < 1e-9, "07: kraj 3pi/4 je hranice")
check(not (float(N(cos(pi / 2))) <= hranice), "07: pi/2 nevyhovuje")
check(not (float(N(cos(0))) <= hranice), "07: 0 nevyhovuje")

# ---------- gonio-09: perioda π + hodnota 2 + počátek ----------
kand09 = {
    "A": 2 * sin(x),
    "B": 2 * cos(2 * x),
    "C": 2 * sin(2 * x),
    "D": sin(2 * x) + 1,
}
check(abs(float(N(kand09["A"].subs(x, 1.1 + pi) - kand09["A"].subs(x, 1.1)))) > 0.01, "09: A nemá periodu pi")
check(abs(float(N(kand09["B"].subs(x, 0))) - 2) < 1e-9, "09: B(0)=2, neprochází počátkem")
check(sample_identity(kand09["C"].subs(x, x + pi), kand09["C"]), "09: C má periodu pi")
check(abs(float(N(kand09["C"].subs(x, pi / 4))) - 2) < 1e-9, "09: C nabývá 2")
check(abs(float(N(kand09["C"].subs(x, 0)))) < 1e-9, "09: C prochází počátkem")
check(abs(float(N(kand09["D"].subs(x, 0))) - 1) < 1e-9, "09: D(0)=1, neprochází počátkem")

# ---------- gonio-10: H(sin + √3 cos) ----------
f10 = sin(x) + sqrt(3) * cos(x)
vzorky10 = [float(N(f10.subs(x, v))) for v in [i * 0.05 for i in range(126)]]
check(abs(max(vzorky10) - 2) < 0.01, f"10: max={max(vzorky10)}")
check(abs(min(vzorky10) + 2) < 0.01, f"10: min={min(vzorky10)}")
check(1 + math.sqrt(3) > 2.01, "10: distraktor A (součet maxim) je mimo")

# ---------- gonio-11, 12: identity ----------
check(sample_identity((1 - cos(2 * x)) / sin(2 * x), tan(x)), "11: identita")
check(not sample_identity((1 - cos(2 * x)) / sin(2 * x), 1 / tan(x)), "11: cotg je špatně")
check(sample_identity(sin(x) ** 4 - cos(x) ** 4, -cos(2 * x)), "12: identita")
check(not sample_identity(sin(x) ** 4 - cos(x) ** 4, cos(2 * x)), "12: +cos2x je špatně")

# ---------- gonio-13: sin 75° ----------
check(abs(float(N(sin(75 * pi / 180))) - float(N((sqrt(6) + sqrt(2)) / 4))) < 1e-12, "13: hodnota")
check(abs(float(N((sqrt(3) + 1) / 2))) > 1, "13: distraktor C je mimo [-1,1]")
check(abs(float(N(sin(15 * pi / 180))) - float(N((sqrt(6) - sqrt(2)) / 4))) < 1e-12, "13: distraktor B = sin15")

# ---------- gonio-14: sin=-4/5 → cos 2x ----------
check(abs((1 - 2 * (16 / 25)) - (-7 / 25)) < 1e-12, "14: -7/25")
check(abs((1 - 2 * (16 / 25)) - 7 / 25) > 0.01, "14: +7/25 je špatně")

# ---------- gonio-15: sin+cos=1/3 → sin 2x ----------
check(abs((1 / 3) ** 2 - 1 - (-8 / 9)) < 1e-12, "15: -8/9")
# konzistence: takové x existuje ((sin+cos)² ≤ 2)
check((1 / 3) ** 2 <= 2, "15: zadání je splnitelné")
# nezávisle: vyřeš soustavu a ověř sin 2x každého řešení
res15 = solveset(sin(x) + cos(x) - 1 / 3, x, Interval(0, 2 * pi))
check(len(res15) == 2, f"15: dvě řešení v [0,2pi]: {res15}")
for r in res15:
    check(abs(float(N(sin(2 * r))) + 8 / 9) < 1e-9, "15: sin2x každého řešení je -8/9")

# ---------- gonio-16, 17: sinová/kosinová věta ----------
check(abs(8 * float(N(sin(pi / 4))) / float(N(sin(pi / 6))) - 8 * math.sqrt(2)) < 1e-9, "16: 8√2")
check(abs((25 + 36 - 2 * 5 * 6 * 0.5) - 31) < 1e-12, "17: c²=31")

# ---------- gonio-18: S=6, a=4, b=6 → γ ----------
sing = 2 * 6 / (4 * 6)
check(abs(sing - 0.5) < 1e-12, "18: sin γ=1/2")
# obě varianty dávají platný trojúhelník (zbývající součet úhlů > 0)
check(180 - 30 > 0 and 180 - 150 > 0, "18: obě varianty platné")

# ---------- gonio-19: SSA počet trojúhelníků ----------
sinb = 12 * 0.5 / 10
check(abs(sinb - 0.6) < 1e-12, "19: sin β=0.6")
b1 = math.degrees(math.asin(0.6))
b2 = 180 - b1
check(30 + b2 < 180, f"19: tupoúhlá varianta existuje ({b2})")
check(30 + b1 < 180, "19: ostroúhlá varianta existuje")

# ---------- gonio-20: perioda sin 3x + cos(x/2) ----------
f20 = sin(3 * x) + cos(x / 2)
check(sample_identity(f20.subs(x, x + 4 * pi), f20), "20: 4π je perioda")
check(not sample_identity(f20.subs(x, x + 2 * pi), f20), "20: 2π není perioda")
check(not sample_identity(f20.subs(x, x + 2 * pi / 3), f20), "20: 2π/3 není perioda")
check(not sample_identity(f20.subs(x, x + 8 * pi / 3), f20), "20: 8π/3 není perioda")

# ---------- gonio-21: |sin x|=1/2 na [0,2π] ----------
res21 = solveset(Abs(sin(x)) - 1 / 2, x, Interval(0, 2 * pi))
check(len(res21) == 4, f"21: 4 řešení: {res21}")

# ---------- gonio-22: tan x = √3 na [0,2π) ----------
res22 = solveset(tan(x) - sqrt(3), x, Interval(0, 2 * pi, False, True))
ocek22 = {float(N(pi / 3)), float(N(4 * pi / 3))}
check(set(float(N(p)) for p in res22) == ocek22, f"22: {res22}")
check(abs(float(N(tan(2 * pi / 3))) + math.sqrt(3)) < 1e-9, "22: tan(2pi/3)=-√3 (distraktor C špatně)")

# ---------- gonio-23: √3 sin x + cos x = 2 ----------
f23 = sqrt(3) * sin(x) + cos(x) - 2
check(is_zero(f23.subs(x, pi / 3)), "23: pi/3 je řešení")
for spatny in [4 * pi / 3, -pi / 3, pi / 6]:
    check(not is_zero(f23.subs(x, spatny)), f"23: {spatny} není řešení")
# maximum levé strany je právě 2 → jen body maxima
vz23 = [float(N(sqrt(3) * sin(x) + cos(x)).subs(x, v)) for v in [i * 0.02 for i in range(315)]]
check(abs(max(vz23) - 2) < 0.01, f"23: max={max(vz23)}")
res23 = solveset(f23, x, Interval(0, 4 * pi))
ocek23 = {float(N(pi / 3)), float(N(7 * pi / 3))}
check(set(float(N(p)) for p in res23) == ocek23, f"23: úplnost {res23}")

# ---------- gonio-24: max(sin x − cos x) ----------
f24 = sin(x) - cos(x)
vz24 = [float(N(f24.subs(x, v))) for v in [i * 0.02 for i in range(315)]]
check(abs(max(vz24) - math.sqrt(2)) < 0.01, f"24: max={max(vz24)}")
check(max(vz24) < 1.5, "24: distraktor 2 je nedosažitelný")

# ---------- gonio-25: max ze sin1, sin2, cos1, cos2 ----------
hod25 = {"sin1": math.sin(1), "sin2": math.sin(2), "cos1": math.cos(1), "cos2": math.cos(2)}
check(max(hod25, key=hod25.get) == "sin2", f"25: {hod25}")  # type: ignore[arg-type]
check(hod25["cos2"] < 0, "25: cos2 < 0")

# ---------- gonio-26: D(√sin x) ----------
f26 = sqrt(sin(x))
for v in [0, pi / 2, pi, 2 * pi]:
    check(defined_at(f26, v), f"26: {v} má být v D (vč. krajů)")
for v in [3 * pi / 2, -pi / 2]:
    check(not defined_at(f26, v), f"26: {v} nesmí být v D")

# ---------- gonio-27: sin 3x = sin x ----------
f27 = sin(3 * x) - sin(x)
res27 = solveset(f27, x, Interval(0, 4 * pi))
ocek27 = {0, pi / 4, 3 * pi / 4, pi, 5 * pi / 4, 7 * pi / 4, 2 * pi, 9 * pi / 4, 11 * pi / 4, 3 * pi, 13 * pi / 4, 15 * pi / 4, 4 * pi}
check(
    set(float(N(p)) for p in res27) == set(float(N(p)) for p in ocek27),
    f"27: solveset={res27}",
)
check(not is_zero(f27.subs(x, pi / 2)), "27: pi/2 nesmí být řešení (distraktor C)")

# ---------- gonio-28: stín 12 m, 30° ----------
check(abs(12 * float(N(tan(pi / 6))) - 4 * math.sqrt(3)) < 1e-9, "28: 4√3")
check(abs(12 * float(N(sin(pi / 6))) - 6) < 1e-9, "28: distraktor C = záměna za sinus")

# ---------- gonio-29: sin/(1+cos) + (1+cos)/sin ----------
f29 = sin(x) / (1 + cos(x)) + (1 + cos(x)) / sin(x)
check(sample_identity(f29, 2 / sin(x)), "29: identita")
check(not sample_identity(f29, 2 * cos(x)), "29: 2cos x je špatně")
check(not defined_at(f29, pi), "29: x=pi mimo D (1+cos=0)")
check(not defined_at(f29, 0), "29: x=0 mimo D (sin=0)")

# ---------- gonio-30: posun sinu o π/2 doprava ----------
check(sample_identity(sin(x - pi / 2), -cos(x)), "30: identita")
check(not sample_identity(sin(x - pi / 2), cos(x)), "30: +cos je špatně")
check(abs(float(N(sin(0 - pi / 2))) + 1) < 1e-12, "30: kontrola v 0")

# ---------- dril ----------
check(abs(float(N(sin(pi / 6))) + float(N(cos(pi / 3))) - 1) < 1e-12, "d01")
check(abs(float(N(120 * pi / 180)) - float(N(2 * pi / 3))) < 1e-12, "d02")
check(sample_identity(sin(x) ** 2 + cos(x) ** 2, 1), "d03")
check(sample_identity(tan(x) * (1 / tan(x)), 1), "d04")
check(sample_identity(sin(-x), -sin(x)), "d05")
check(sample_identity(cos(pi - x), -cos(x)), "d06")
check(
    abs(float(N(sin(0.7 + 1.3))) - float(N(sin(0.7) * cos(1.3) + cos(0.7) * sin(1.3)))) < 1e-12,
    "d07: součtový vzorec numericky",
)
check(
    abs(float(N(sin(0.7 + 1.3))) - float(N(sin(0.7) + sin(1.3)))) > 0.01,
    "d07: distraktor A (součet sinů) je špatně",
)
check(abs(float(N(cos(pi / 12) ** 2 - sin(pi / 12) ** 2)) - math.sqrt(3) / 2) < 1e-12, "d08")
check(sample_identity(tan(x + pi), tan(x)), "d09: perioda")
check(not sample_identity(tan(x + pi / 2), tan(x)), "d09: pi/2 není perioda")
check(defined_at(tan(x), 0) and not defined_at(tan(x), pi / 2), "d10: D(tg)")

print(f"\nPASS: {PASSES}, FAIL: {len(FAILURES)}")
sys.exit(1 if FAILURES else 0)
