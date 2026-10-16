import katex from "katex";
import { describe, expect, it } from "vitest";

/** Prázdná skupina {} na hraně matematického úseku musí dát stejné
 *  mezerové lepidlo jako sousední \text v jednotném renderu.
 *  Páry [jednotný TeX, samostatný úsek s {}] pro všechny třídy atomů. */
const HRANICE: Array<[string, string]> = [
  ["\\text{ h}=x", "{}=x"], // relace
  ["\\text{K}\\Rightarrow x", "{}\\Rightarrow x"], // relace příkazem
  ["x+\\text{; }", "x+{}"], // binární operátor
  ["\\text{a}-b", "{}-b"], // binární minus před textem
  ["a\\cdot\\text{b}", "a\\cdot{}"], // binární operátor příkazem
  ["1: +\\text{;}", "1: +{}"], // unární plus: žádné lepidlo
  ["\\text{a}x", "{}x"], // obyčejný atom: žádné lepidlo
  ["\\text{f}(x)", "{}(x)"], // otevírací závorka
  ["(a)\\text{v}", "(a){}"], // zavírací závorka
  ["x,\\text{ pak}", "x,{}"], // interpunkce
];

function strip(html: string): string {
  return html
    .replace(/<span class="katex-mathml">.*?<\/span>/s, "")
    .replace(/<span class="katex-strut"[^>]*><\/span>/g, "");
}

describe("lepidlo na hraně text–matematika", () => {
  for (const [unified, gap] of HRANICE) {
    it(`${unified} ≡ ${gap}`, () => {
      const u = strip(katex.renderToString(unified, { throwOnError: true })).replace(
        /<span class="mord text"><span class="mord">.*?<\/span><\/span>/,
        '<span class="mord"></span>',
      );
      const g = strip(katex.renderToString(gap, { throwOnError: true }));
      expect(g).toBe(u);
    });
  }
});
