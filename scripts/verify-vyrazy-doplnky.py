#!/usr/bin/env python3
"""Ověření doplněných úloh a oprav proti skutečným datům aplikace.

Spusť: python3 scripts/verify-vyrazy-doplnky.py
Vyžaduje Node s podporou TypeScript strip-types a Python se SymPy.
"""
import json
from pathlib import Path
import re
import subprocess

from sympy import Poly, Rational, Symbol, div, expand, simplify, solve, sqrt
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations, implicit_multiplication_application,
    convert_xor,
)

ROOT = Path(__file__).resolve().parents[1]
data = json.loads(subprocess.check_output([
    "node", "--experimental-strip-types", "--input-type=module", "-e",
    'import {VYRAZY} from "./app/src/content/data/vyrazy.ts"; console.log(JSON.stringify(VYRAZY));',
], cwd=ROOT, text=True))
tasks = {t["id"]: t for t in data}
assert len(tasks) == len(data), "Duplicitní ID"
x = Symbol("x", positive=True)
t, u, v = (Symbol(name, real=True) for name in ("t", "u", "v"))
checked = set()


def expression(tex):
    # Možnosti nových úloh obsahují pouze mnohočleny, zlomky a mocniny.
    text = re.sub(r"\\frac\{([^{}]*)\}\{([^{}]*)\}", r"((\1)/(\2))", tex)
    text = text.replace("{", "(").replace("}", ")")
    return parse_expr(text, local_dict={"x": x, "t": t, "u": u, "v": v},
                      transformations=standard_transformations +
                      (implicit_multiplication_application, convert_xor))


def check(ident, expected):
    task = tasks[ident]
    flags = [simplify(expression(option) - expected) == 0 for option in task["moznosti"]]
    assert sum(flags) == 1, (ident, flags)
    assert flags[task["spravna"]], (ident, task["spravna"], flags)
    checked.add(ident)


# Věk: nezávisle vyřešíme vztahy z původních časových údajů.
aunt, grandpa = Symbol("aunt"), Symbol("grandpa")
ages = solve([aunt + 5 - 3*(t + 5), grandpa - 3 - 5*(t - 3)],
             [aunt, grandpa])
check("vyraz-57", t + ages[aunt] + ages[grandpa])
# Identita: koeficienty získáme dosazením tří různých hodnot x.
a, b, c = Symbol("a"), Symbol("b"), Symbol("c")
identity = 3*x**2 - 5*x + c - (x + 2)*(a*x + b)
coefficients = solve([identity.subs(x, k) for k in (0, 1, 2)], [a,b,c])
assert expand(identity.subs(coefficients)) == 0
check("vyraz-58", (2*a - b + c).subs(coefficients))
check("vyraz-59", (x**2 * sqrt(x**8))**Rational(1,3))
quotient, remainder = div(3*x**3 - 2*x**2 + 5*x + 1, x**2 + 2, x)
assert expand((x**2+2)*quotient+remainder) == 3*x**3-2*x**2+5*x+1
assert Poly(remainder,x).degree() < 2
check("vyraz-60", remainder)
check("vyraz-61", 27*u**3+8*v**3)
check("vyraz-62", (x**2-16)/(x**2-2*x) * x/(x+4))
# Doménu posoudíme před krácením, včetně x = 0.
real_x = Symbol("x", real=True)
forbidden = set(solve(real_x**2-2*real_x,real_x)) | set(solve(real_x+4,real_x))
assert forbidden == {-4,0,2}
check("vyraz-d19", Poly(expand((4*x**5+3*x**3-2)-(4*x**5-x**2+6)),x).degree())
check("vyraz-d20", (12*x**4-8*x**2+4*x)/(4*x))

# Regrese: otázka se musí ptát na definovanost, protože možnosti uvádějí zákazy.
domain_task = tasks["vyraz-13"]
assert r"\text{Určete, pro která reálná } x \text{ je definován výraz }" in domain_task["zadani"]
assert set(solve((real_x-2)*(real_x+3),real_x)) == {-3,2}
assert domain_task["moznosti"][domain_task["spravna"]] == r"x \ne 2 \text{ a } x \ne -3"
# Vytknutí je nyní výslovně úplné. Z trojice ekvivalentních možností
# vyhovuje jen ta, ve které v závorce nezůstává další společný jednočlen.
factoring_task = tasks["vyraz-d01"]
assert "největší společný jednočlen s kladným koeficientem" in factoring_task["zadani"]
factors = [(2,2*x**2+3*x),(x,4*x+6),(2*x,2*x+3),(2*x,2*x+6)]
flags = [expand(outside*inside) == 4*x**2+6*x and
         Poly(inside,x).content() == 1 and Poly(inside,x).eval(0) != 0
         for outside,inside in factors]
assert [i for i,valid in enumerate(flags) if valid] == [factoring_task["spravna"]]
assert factoring_task["moznosti"] == ["2(2x^2 + 3x)","x(4x + 6)","2x(2x + 3)","2x(2x + 6)"]

# Příklady v doplněném výkladu: zpětná kontrola roznásobením.
assert expand((x+3)*(2*x-4)) == 2*x**2+2*x-12
assert expand((x**2+1)*(2*x+3)+(-2*x+1)) == 2*x**3+3*x**2+4
assert expand((2*x+3)*(4*x**2-6*x+9)) == 8*x**3+27
assert simplify(sqrt(x*sqrt(x**6))-x**2) == 0
assert len(checked) == 8
print("PASS: 8 nových úloh (včetně jednoznačnosti odpovědí), 2 regrese a příklady teorie.")
