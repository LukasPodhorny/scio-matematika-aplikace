import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Teorie } from "./Teorie";
import { TEORIE } from "../content/teorie";

/** SSR test prohlížeče teorie: tabulky, callouty a matematika se musí vykreslit. */
describe("Teorie render", () => {
  for (const t of TEORIE) {
    it(`${t.id}: žádné surové markdown artefakty`, () => {
      const html = renderToString(<Teorie teorie={t} onBack={() => {}} />);
      // Každá GFM tabulka v md (řádek s |---|---|) má svůj <table> v HTML.
      const tabulekVMd = t.markdown
        .split("\n")
        .filter((l) => /^\|[\s:|-]+\|\s*$/.test(l.trim())).length;
      const tabulekVHtml = html.split("<table").length - 1;
      expect(tabulekVMd).toBeGreaterThan(0);
      expect(tabulekVHtml).toBe(tabulekVMd);
      // Callouty přeložené na bloky, marker nikde doslovně.
      expect(html).not.toContain("[!");
      expect(html).toContain("Věta / Pravidlo");
      expect(html).toContain("Pozor – častá chyba");
      // Každý display blok v md má svůj .katex-display v HTML.
      const ploty = t.markdown
        .split("\n")
        .filter((l) => l.trim().replace(/^>\s?/, "") === "$$").length;
      const displayVHtml = html.split("katex-display").length - 1;
      expect(ploty).toBeGreaterThan(0);
      expect(displayVHtml).toBe(ploty / 2);
      // Příklady jsou sekce s nadpisem, ne karty.
      expect(html).toContain("Příklad 1");
      // Nadpisy mají id (osnova funguje).
      expect(html).toContain('id="');
      // Žádné programátorské /= místo ≠.
      expect(html).not.toContain("/=");
      // Žádný KaTeX error.
      expect(html).not.toContain("katex-error");
    });
  }
});
