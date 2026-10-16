import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import { remark } from "remark";
import { describe, expect, it } from "vitest";
import { TEORIE } from "./index";

describe("teorie", () => {
  it("každé téma má název a neprázdný obsah", () => {
    expect(TEORIE.length).toBeGreaterThan(0);
    for (const t of TEORIE) {
      expect(t.nazev.length).toBeGreaterThan(0);
      expect(t.markdown.length).toBeGreaterThan(100);
      expect(t.okruhy.length).toBeGreaterThan(0);
    }
  });

  it("nadpisy jsou prostý text bez vzorců a každý právě jednou (předpoklad osnovy)", () => {
    for (const t of TEORIE) {
      const nadpisy: string[] = [];
      for (const line of t.markdown.split("\n")) {
        const m = /^(#{1,3})\s+(.+)$/.exec(line.trim());
        if (m) {
          expect(m[2]).not.toContain("$");
          nadpisy.push(m[2].trim());
        }
      }
      expect(nadpisy.length).toBeGreaterThan(3);
      expect(new Set(nadpisy).size).toBe(nadpisy.length);
    }
  });

  it("konvence zápisu: slova i ≠ mimo matematiku, žádné /=", () => {
    for (const t of TEORIE) {
      // Česká slova se v $...$ rozpadají (závislost na fontu) — patří ven.
      expect(t.markdown).not.toContain("\\text{");
      // Nerovnost jako textový znak (systémový font), ne kompozitní \ne.
      expect(t.markdown).not.toContain("\\ne");
      expect(t.markdown).not.toContain("/=");
    }
  });

  it("roury patří jen do tabulek nebo do matematiky", () => {
    for (const t of TEORIE) {
      const bezMatiky = t.markdown
        .replace(/\$\$[\s\S]*?\$\$/g, "M")
        .replace(/\$[^$\n]*?\$/g, "M");
      for (const line of bezMatiky.split("\n")) {
        if (!line.includes("|")) continue;
        // Řádek tabulky (hlavička, oddělovač i data začínají |).
        expect(line.trim().startsWith("|")).toBe(true);
      }
    }
  });

  it("display matematika má ploty $$ na vlastních řádcích", () => {
    // Jednolinkové $$...$$ remark-math tiše degraduje na inline — zakázáno.
    for (const t of TEORIE) {
      const ploty = t.markdown.split("\n").filter((l) => l.includes("$$"));
      expect(ploty.length).toBeGreaterThan(0);
      for (const line of ploty) {
        expect(line.trim().replace(/^>\s?/, "")).toBe("$$");
      }
      expect(ploty.length % 2).toBe(0);
    }
  });

  it("inline vzorce jsou krátké (dlouhé patří do display bloku)", () => {
    // Heuristika proti vodorovnému přetečení na mobilu: inline .katex má
    // white-space: nowrap, takže dlouhý vzorec roztáhne stránku. ~55 znaků
    // je hranice naměřená na viewportu 390 px (ověřeno v prohlížeči).
    for (const t of TEORIE) {
      const mimoDisplay: string[] = [];
      let vDisplay = false;
      for (const line of t.markdown.split("\n")) {
        if (line.trim().replace(/^>\s?/, "") === "$$") {
          vDisplay = !vDisplay;
          continue;
        }
        if (!vDisplay) mimoDisplay.push(line);
      }
      for (const line of mimoDisplay) {
        if (line.trim().startsWith("|")) continue; // tabulky scrollují samy
        for (const m of line.matchAll(/\$([^$\n]+)\$/g)) {
          expect(m[1].length, `dlouhý inline vzorec: ${m[1].slice(0, 60)}`).toBeLessThanOrEqual(55);
        }
      }
    }
  });

  it("bloky používají jen známé markery", () => {
    for (const t of TEORIE) {
      const markery = [...t.markdown.matchAll(/^\s*>\s*\[!([A-Z]+)\]/gm)].map((m) => m[1]);
      expect(markery.length).toBeGreaterThan(0);
      for (const mk of markery) {
        expect(["VETA", "POZOR"]).toContain(mk);
      }
    }
  });

  it("matematika v markdownu projde KaTeX renderem bez chyby", async () => {
    for (const t of TEORIE) {
      const file = await remark()
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeKatex, { throwOnError: true, strict: true })
        .use(rehypeStringify)
        .process(t.markdown);
      const html = String(file);
      expect(html).toContain("katex");
      expect(html).not.toContain("katex-error");
    }
  }, 30000);
});
