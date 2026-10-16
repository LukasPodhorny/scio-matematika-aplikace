import { compile } from "mathjs";
import type { Task } from "../content/types";

/** Ověření volby u uzavřené úlohy. */
export function checkChoice(task: Task, index: number): boolean {
  return index === task.spravna;
}

/** Parsování čísla z českého vstupu: desetinná čárka i tečka, mezery jako oddělovače tisíců. */
export function parseCzechNumber(input: string): number | null {
  const s = input.trim().replace(/\s+/g, "");
  if (s === "") return null;
  const normalized = s.replace(",", ".");
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(normalized)) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

export interface Tolerance {
  /** Relativní tolerance, výchozí 1e-9. */
  rel?: number;
  /** Absolutní tolerance, výchozí 1e-9. */
  abs?: number;
}

/** Číselná odpověď s tolerancí. */
export function checkNumeric(
  expected: number,
  input: string,
  tol: Tolerance = {},
): boolean {
  const got = parseCzechNumber(input);
  if (got === null) return false;
  const rel = tol.rel ?? 1e-9;
  const abs = tol.abs ?? 1e-9;
  return Math.abs(got - expected) <= abs + rel * Math.abs(expected);
}

/** Vzorkovací body pro významové porovnání výrazů. */
const SAMPLE_XS = [-2.7, -1, -0.4, 0.3, 1, 2, 3.5];

/** Normalizace vstupu výrazu: desetinné čárky na tečky (jen mezi číslicemi), ^ a **, implicitní ×. */
function normalizeExpr(input: string): string {
  return input
    .trim()
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, "")
    .toLowerCase();
}

/** Algebraické výrazy porovnané významově: oba se vyhodnotí v několika bodech.
 *  Nikdy se neporovnávají řetězce. Vrací false i při neparsovatelném vstupu. */
export function checkExpression(
  expected: string,
  input: string,
  variable = "x",
  tol: Tolerance = {},
): boolean {
  const rel = tol.rel ?? 1e-9;
  const abs = tol.abs ?? 1e-9;
  let expCompiled;
  let gotCompiled;
  try {
    expCompiled = compile(normalizeExpr(expected));
    gotCompiled = compile(normalizeExpr(input));
  } catch {
    return false;
  }
  let compared = 0;
  for (const x of SAMPLE_XS) {
    let e: unknown;
    let g: unknown;
    try {
      e = expCompiled.evaluate({ [variable]: x });
      g = gotCompiled.evaluate({ [variable]: x });
    } catch {
      return false;
    }
    if (typeof e !== "number" || typeof g !== "number") return false;
    if (!Number.isFinite(e) || !Number.isFinite(g)) {
      // Oba nedefinované (např. dělení nulou) => bod přeskočíme, jinak neshoda.
      if (!Number.isFinite(e) && !Number.isFinite(g)) continue;
      return false;
    }
    if (Math.abs(g - e) > abs + rel * Math.abs(e)) return false;
    compared++;
  }
  return compared > 0;
}
