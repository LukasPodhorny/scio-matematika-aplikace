#!/usr/bin/env python3
"""Ověření doplněných úloh proti skutečným datům aplikace.

Načítá TypeScript přes Node, číselné možnosti vyčísluje přes SymPy,
slovní možnosti převádí na explicitní modely. Kontroluje jedinou správnou
možnost i uložený index. Spouštění: python3 scripts/verify-zaklady-doplnky.py
"""
import itertools
import json
import math
from pathlib import Path
import re
import subprocess
from decimal import Decimal, ROUND_HALF_UP

from sympy import Rational, simplify, sqrt, sympify

root = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output([
    "node", "--experimental-strip-types", "--input-type=module", "-e",
    'import {ZAKLADY} from "./app/src/content/data/zaklady.ts"; console.log(JSON.stringify(ZAKLADY));',
], cwd=root, text=True))
tasks = {t["id"]: t for t in data}
assert len(tasks) == len(data), "Duplicitní ID"
checked = set()


def number(tex):
    """Malá uzavřená podmnožina TeXu pro číselné možnosti těchto úloh."""
    text = tex.replace(r"\left", "").replace(r"\right", "").replace("{,}", ".")
    text = text.replace(r"\%", "").replace(r"\cdot", "*")
    text = re.sub(r"\^\{([^{}]*)\}", r"^(\1)", text)
    text = re.sub(r"\\frac(\d)(\d)", r"((\1)/(\2))", text)
    text = re.sub(r"\\frac(\d)\{([^{}]*)\}", r"((\1)/(\2))", text)
    # Nejprve vnitřní složené závorky, takže fungují i vnořené zlomky.
    while re.search(r"\\(?:frac|sqrt)", text):
        old = text
        text = re.sub(r"\\frac\{([^{}]*)\}\{([^{}]*)\}", r"((\1)/(\2))", text)
        text = re.sub(r"\\sqrt\{([^{}]*)\}", r"sqrt(\1)", text)
        if text == old:
            raise ValueError(tex)
    text = text.replace("{", "(").replace("}", ")").replace("^", "**").replace(":", "/")
    text = re.sub(r"(\d|\))(?=sqrt)", r"\1*", text)
    return sympify(text, rational=True)


def select(ident, valid):
    t = tasks[ident]
    flags = [bool(valid(option)) for option in t["moznosti"]]
    assert sum(flags) == 1, (ident, flags, t["moznosti"])
    assert flags[t["spravna"]], (ident, flags, t["spravna"])
    checked.add(ident)


def equals(ident, result):
    select(ident, lambda option: simplify(number(option) - result) == 0)


def models(ident, interpretations, predicate):
    assert set(tasks[ident]["moznosti"]) == set(interpretations), ident
    select(ident, lambda option: predicate(interpretations[option]))


def rounded(value, place):
    return Decimal(str(value)).quantize(Decimal(place), rounding=ROUND_HALF_UP)


# Nové úlohy 57–76. Kontrola používá přímé vyčíslení nebo výčet,
# zatímco postup v aplikaci většinou používá algebraickou zkratku.
venn = [b for b in range(43) if b + (b + 8) - 5 == 27 and b >= 5]
assert venn == [12]
equals("zakl-57", venn[0])
equals("zakl-58", Rational(3, 5) * Rational(2, 7))
equals("zakl-59", (2400 * Rational(108, 100) + 168 - 2400) / 2400 * 100)
models("zakl-60", {
    r"796\text{ na desítky}": rounded(796, "1E1"),
    r"849\text{ na stovky}": rounded(849, "1E2"),
    r"750\text{ na stovky}": rounded(750, "1E2"),
    r"744\text{ na stovky}": rounded(744, "1E2"),
}, lambda v: v != 800)
equals("zakl-61", (sqrt(75) - sqrt(12))**2)
equals("zakl-62", max(number(o) for o in tasks["zakl-62"]["moznosti"]))
equals("zakl-63", (Rational(1, 3)**2)**3 * (Rational(1, 3)**3)**2 / Rational(1, 3)**16)
equals("zakl-64", sqrt(7 - sqrt(13)) * sqrt(7 + sqrt(13)))
equals("zakl-65", Rational(math.prod(range(2, 17, 2)), math.factorial(8)))
equals("zakl-66", Rational(73**2 - 9, 70))
equals("zakl-67", Rational(14**3 * 21**2, 6**2 * 7**5))
select("zakl-68", lambda o: (5204 + 10 * int(o)) % 12 == 0)
select("zakl-69", lambda o: 143 % int(o) == 23 and 263 % int(o) == 23)
select("zakl-70", lambda o: (1003**2 - 1003) % int(o) != 0)
remainders = {(4*k + 7) % 9 for k in range(1, 1000) if k % 9 == 5}
assert len(remainders) == 1
equals("zakl-71", remainders.pop())

rows = list(itertools.product([False, True], repeat=2))
implies = lambda p, q: not p or q
models("zakl-72", {
    r"\text{Jestliže má zásilka kód, je expresní.}": lambda p, q: implies(q, p),
    r"\text{Jestliže zásilka není expresní, nemá kód.}": lambda p, q: implies(not p, not q),
    r"\text{Jestliže zásilka nemá kód, není expresní.}": lambda p, q: implies(not q, not p),
    r"\text{Zásilka je expresní právě tehdy, když má kód.}": lambda p, q: p == q,
}, lambda f: all(f(p,q) == implies(p,q) for p,q in rows))
models("zakl-73", {
    r"\text{V je nepravdivý; negace: nejvýše 10 položek.}": (False, lambda n: n <= 10),
    r"\text{V je nepravdivý; negace: právě 10 položek.}": (False, lambda n: n == 10),
    r"\text{V je pravdivý; negace: nejvýše 10 položek.}": (True, lambda n: n <= 10),
    r"\text{V je nepravdivý; negace: alespoň 12 položek.}": (False, lambda n: n >= 12),
}, lambda pair: pair[0] == (9 >= 11) and all(pair[1](n) == (not n >= 11) for n in range(30)))
models("zakl-74", {
    r"A=1,\ B=1": (True, True), r"A=1,\ B=0": (True, False),
    r"A=0,\ B=0": (False, False), r"A=0,\ B=1": (False, True),
}, lambda row: not (row[0] or not row[1]))
# KaTeX dovoluje i \sqrt5; parser úmyslně přijímá jen explicitní závorky.
rationalized = {
    r"\frac{\sqrt5-1}{2}": (sqrt(5)-1)/2,
    r"\frac{\sqrt5+1}{2}": (sqrt(5)+1)/2,
    r"2\sqrt5+2": 2*sqrt(5)+2,
    r"\frac12": Rational(1,2),
}
models("zakl-75", rationalized, lambda v: simplify(v - 2/(sqrt(5)-1)) == 0)
equals("zakl-76", (Rational(5,6)-Rational(1,4))/Rational(7,12))
equals("zakl-d19", sqrt((-8)**2)-3)
equals("zakl-d20", Rational(str(rounded("3.746", "0.1"))))

# Regrese dvou původních úloh s více matematicky správnými možnostmi.
models("zakl-d16", {
    r"\{1;\, 2;\, 3\}": {1,2,3}, r"\{2\}": {2},
    r"\{1;\, 2;\, 3;\, 4\}": {1,2,3,4}, r"\{1;\, 3\}": {1,3},
}, lambda v: v == {1,2} | {2,3})
models("zakl-53", {
    r"\text{Neprší nebo není zima.}": lambda p,q: not p or not q,
    r"\text{Neprší a není zima.}": lambda p,q: not p and not q,
    r"\text{Prší nebo je zima.}": lambda p,q: p or q,
    r"\text{Jestliže neprší, není zima.}": lambda p,q: implies(not p, not q),
}, lambda f: all(f(p,q) == (not (p and q)) for p,q in rows))

assert {f"zakl-{n}" for n in range(57,77)} | {"zakl-d19","zakl-d20"} <= checked
print(f"PASS: {len(checked)} úloh, jednoznačnost a skutečné indexy odpovědí ověřeny.")
