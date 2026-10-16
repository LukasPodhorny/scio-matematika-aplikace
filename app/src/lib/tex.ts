/** Pomocné formátování čísel a výrazů do TeXu (pro KaTeX).
 *  Desetinná čárka podle české konvence, v TeXu jako {,} (správné mezery). */

/** Číslo do TeXu: celé beze změny, desetinné s čárkou. */
export function texNum(n: number): string {
  if (!Number.isFinite(n)) throw new Error("nekonečné číslo nelze formátovat");
  if (Number.isInteger(n)) return String(n);
  return String(n).replace(".", "{,}");
}

/** Lineární dvojčlen ax + b (a ≠ 0), např. "2x - 3", "-x", "5x". */
export function texLin(a: number, b: number, variable = "x"): string {
  let head: string;
  if (a === 1) head = variable;
  else if (a === -1) head = `-${variable}`;
  else head = `${texNum(a)}${variable}`;
  if (b === 0) return head;
  return b > 0 ? `${head} + ${texNum(b)}` : `${head} - ${texNum(-b)}`;
}

/** Kvadratický trojčlen ax² + bx + c (a ≠ 0). */
export function texQuad(a: number, b: number, c: number, variable = "x"): string {
  let head: string;
  if (a === 1) head = `${variable}^{2}`;
  else if (a === -1) head = `-${variable}^{2}`;
  else head = `${texNum(a)}${variable}^{2}`;
  let s = head;
  if (b !== 0) {
    const term = Math.abs(b) === 1 ? variable : `${texNum(Math.abs(b))}${variable}`;
    s += b > 0 ? ` + ${term}` : ` - ${term}`;
  }
  if (c !== 0) s += c > 0 ? ` + ${texNum(c)}` : ` - ${texNum(-c)}`;
  return s;
}

/** Číslo do TeXu, záporné v závorce (pro dosazování). */
export function texParen(n: number): string {
  return n < 0 ? `(${texNum(n)})` : texNum(n);
}

/** Číslo se znaménkem pro navazování ve výrazu: "+ 3" / "- 3". */
export function texSigned(v: number): string {
  return v < 0 ? `- ${texNum(-v)}` : `+ ${texNum(v)}`;
}

/** Zlomek v TeXu. */
export function texFrac(num: number, den: number): string {
  return `\\frac{${texNum(num)}}{${texNum(den)}}`;
}

/** Bod [x; y] českým zápisem. */
export function texPoint(x: string, y: string): string {
  return `\\left[${x};\\, ${y}\\right]`;
}

/** Uzavřený/otevřený interval českým zápisem, např. ⟨-2; ∞). */
export function texInterval(
  from: string,
  fromClosed: boolean,
  to: string,
  toClosed: boolean,
): string {
  const l = fromClosed ? "\\langle " : "(";
  const r = toClosed ? "\\rangle" : ")";
  return `${l}${from};\\, ${to}${r}`;
}
