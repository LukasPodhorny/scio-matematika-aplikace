import { describe, expect, it } from "vitest";
import { vsechnyUlohy } from "../content/data";
import { splitTex } from "./texSplit";

describe("splitTex", () => {
  it("čistá matematika je jeden segment", () => {
    expect(splitTex("2^{20} + x_1")).toEqual([{ kind: "math", tex: "2^{20} + x_1" }]);
  });

  it("rozdělí text a matematiku", () => {
    expect(splitTex("\\text{Jaký je zbytek }2^{20}\\text{ číslem }7\\text{?}")).toEqual([
      { kind: "text", text: "Jaký je zbytek " },
      { kind: "math", tex: "{}2^{20}{}" },
      { kind: "text", text: " číslem " },
      { kind: "math", tex: "{}7{}" },
      { kind: "text", text: "?" },
    ]);
  });

  it("matematika u textu dostane {} pro správné lepidlo operátorů", () => {
    expect(splitTex("8{:}00 + 3\\text{ h}=\\boxed{11{:}00}")).toEqual([
      { kind: "math", tex: "8{:}00 + 3{}" },
      { kind: "text", text: " h" },
      { kind: "math", tex: "{}=\\boxed{11{:}00}" },
    ]);
  });

  it("mezery v matematice se ignorují (prázdné úseky mizí)", () => {
    expect(splitTex("\\text{a}  \\text{b}")).toEqual([
      { kind: "text", text: "a" },
      { kind: "text", text: "b" },
    ]);
  });

  it("převede \\% na procento", () => {
    expect(splitTex("\\text{Nemoc má 1\\% populace.}")).toEqual([
      { kind: "text", text: "Nemoc má 1% populace." },
    ]);
  });

  it("převede tenké mezery a vlnku", () => {
    expect(splitTex("x\\text{\\,}\\text{a\\~b}")).toEqual([
      { kind: "math", tex: "x{}" },
      { kind: "text", text: "\u2009" },
      { kind: "text", text: "a\u00a0b" },
    ]);
  });

  it("neznámý příkaz v textu → null (fallback na KaTeX)", () => {
    expect(splitTex("\\text{a\\foo b}")).toBeNull();
  });

  it("neuzavřená závorka → null", () => {
    expect(splitTex("\\text{abc")).toBeNull();
  });

  it("\\text bez závorky projde do matematiky", () => {
    const segs = splitTex("a\\text b");
    expect(segs).toEqual([{ kind: "math", tex: "a\\text b" }]);
  });

  it("vnořený \\text vrací null (celek patří do jednoho renderu)", () => {
    expect(splitTex("\\boxed{210 \\text{ Kč}}")).toBeNull();
    expect(splitTex("x = \\frac{\\text{a}}{2}")).toBeNull();
  });

  it("fallback smí nastat jen u \\text vnořeného do příkazu", () => {
    const zakazane: string[] = [];
    for (const t of vsechnyUlohy()) {
      for (const tex of [t.zadani, ...t.moznosti, ...t.postup]) {
        if (splitTex(tex) === null && !/\\(?:boxed|frac|dfrac|sqrt)\{[^]*\\text\{/.test(tex)) {
          zakazane.push(`${t.id}: ${tex.slice(0, 80)}`);
        }
      }
    }
    expect(zakazane).toEqual([]);
  });
});
