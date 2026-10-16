import katex from "katex";
import { describe, expect, it } from "vitest";
import { teoriePodleId } from "../teorie";
import type { Task } from "../types";
import { ulohyProOkruh, vsechnaDataVcNeoverenych, vsechnyUlohy } from "./index";

function checkTask(t: Task) {
  expect(t.id).toMatch(/^[a-z0-9-]+$/);
  expect(t.zdroj).toBe("handwritten");
  expect(t.verified).toBe(true);
  expect(["independent-solve", "code"]).toContain(t.verifiedBy);
  expect(t.druh === "scio" || t.druh === "dril").toBe(true);
  expect(t.obtiznost).toBeGreaterThanOrEqual(1);
  expect(t.obtiznost).toBeLessThanOrEqual(5);
  expect(t.moznosti).toHaveLength(4);
  expect(new Set(t.moznosti).size).toBe(4);
  expect(t.spravna).toBeGreaterThanOrEqual(0);
  expect(t.spravna).toBeLessThan(4);
  expect(t.postup.length).toBeGreaterThan(0);
  expect(t.typickaChyba.length).toBeGreaterThan(10);
  expect(t.podtemaNazev.length).toBeGreaterThan(0);
  // Odkaz na teorii musí existovat.
  expect(teoriePodleId(t.tema)).toBeDefined();
  // Všechny vzorce musí projít striktním KaTeX renderem.
  for (const tex of [t.zadani, ...t.moznosti, ...t.postup]) {
    expect(tex.length).toBeGreaterThan(0);
    expect(() => katex.renderToString(tex, { throwOnError: true })).not.toThrow();
  }
}

describe("data úloh", () => {
  it("id jsou unikátní", () => {
    const ids = vsechnyUlohy().map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("všechny úlohy v datech jsou ověřené (jinak by se nezobrazily)", () => {
    const neoverene = vsechnaDataVcNeoverenych().filter((t) => t.verified !== true);
    expect(neoverene.map((t) => t.id)).toEqual([]);
  });

  it("každá úloha projde schématem a striktním KaTeX renderem", () => {
    expect(vsechnyUlohy().length).toBeGreaterThan(0);
    for (const t of vsechnyUlohy()) checkTask(t);
  });

  it("filtry vracejí disjunktní podmnožiny", () => {
    const scio = ulohyProOkruh("funkce", "scio");
    const dril = ulohyProOkruh("funkce", "dril");
    const vse = ulohyProOkruh("funkce", "vse");
    expect(scio.every((t) => t.druh === "scio")).toBe(true);
    expect(dril.every((t) => t.druh === "dril")).toBe(true);
    expect(vse.length).toBe(scio.length + dril.length);
  });
});
