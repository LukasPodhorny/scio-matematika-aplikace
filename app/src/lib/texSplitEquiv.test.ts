import katex from "katex";
import { describe, expect, it } from "vitest";
import { vsechnyUlohy } from "../content/data";
import { splitTex } from "./texSplit";

function renderSplit(tex: string): string {
  const segs = splitTex(tex);
  if (segs === null) return katex.renderToString(tex, { throwOnError: false, strict: false });
  return segs
    .map((s) =>
      s.kind === "text"
        ? `<span>${s.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`
        : katex.renderToString(s.tex, { throwOnError: false, strict: false }),
    )
    .join("");
}

/** Vizuální textový obsah HTML: bez MathML anotací (obsahují zdrojový TeX),
 *  bez tagů, entity dekódované, beztečková i/j na normální, NFC. */
function textContent(html: string): string {
  return (
    html
      // MathML vrstva neobsahuje žádné vnořené spany, líný match stačí.
      .replace(/<span class="katex-mathml">.*?<\/span>/gs, "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;|\u00a0/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\u200b|\u200c|\u200d|\ufeff/g, "")
      .replace(/\u0131/g, "i")
      .replace(/\u0237/g, "j")
      // KaTeX skládá akcenty ze spacing znaků, NFC potřebuje kombinující.
      .replace(/\u02cb/g, "\u0300")
      .replace(/\u02ca/g, "\u0301")
      .replace(/\u02c7/g, "\u030c")
      .replace(/\u02da/g, "\u030a")
      .replace(/\u02d8/g, "\u0306")
      .normalize("NFC")
      .replace(/\s+/g, " ")
      .trim()
  );
}

describe("ekvivalence renderu", () => {
  it("split render má stejný text jako jednotný KaTeX render", () => {
    const rozdily: string[] = [];
    for (const t of vsechnyUlohy()) {
      for (const tex of [t.zadani, ...t.moznosti, ...t.postup]) {
        const a = textContent(katex.renderToString(tex, { throwOnError: false, strict: false }));
        const b = textContent(renderSplit(tex));
        if (a !== b) rozdily.push(`${t.id}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);
      }
    }
    expect(rozdily).toEqual([]);
  });
});
