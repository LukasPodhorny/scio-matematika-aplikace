import { describe, expect, it } from "vitest";
import type { Attempt } from "../content/types";
import { memoryStore } from "./store";
import {
  denniKlic,
  nactiCil,
  pokusyDne,
  spocitejStreak,
  ulozCil,
  VYCHOZI_CIL,
} from "./denniCil";

function attempt(ts: number, over: Partial<Attempt> = {}): Attempt {
  return {
    id: `a-${ts}`,
    taskId: "t1",
    okruh: "funkce",
    podtema: "p",
    obtiznost: 3,
    druh: "scio",
    uspech: true,
    zvolena: 0,
    vynechano: false,
    casMs: 1000,
    ts,
    ...over,
  };
}

/** Místní poledne daného dne (odolné vůči letnímu času). */
function poledne(rok: number, mesic: number, den: number): number {
  return new Date(rok, mesic - 1, den, 12, 0, 0).getTime();
}

describe("denniKlic", () => {
  it("formátuje místní den", () => {
    expect(denniKlic(poledne(2026, 5, 10))).toBe("2026-05-10");
  });
});

describe("cil", () => {
  it("bez uložení vrací výchozí", () => {
    expect(nactiCil(memoryStore())).toBe(VYCHOZI_CIL);
  });

  it("uložení a načtení", () => {
    const s = memoryStore();
    ulozCil(20, s);
    expect(nactiCil(s)).toBe(20);
  });

  it("neplatná hodnota => výchozí", () => {
    const s = memoryStore();
    s.setItem("scio-matika-cil-v1", "nesmysl");
    expect(nactiCil(s)).toBe(VYCHOZI_CIL);
    s.setItem("scio-matika-cil-v1", "0");
    expect(nactiCil(s)).toBe(VYCHOZI_CIL);
  });
});

describe("pokusyDne", () => {
  it("počítá jen pokusy daného dne", () => {
    const data = [
      attempt(poledne(2026, 5, 10)),
      attempt(poledne(2026, 5, 10) + 3600000),
      attempt(poledne(2026, 5, 9)),
    ];
    expect(pokusyDne(data, "2026-05-10")).toBe(2);
    expect(pokusyDne(data, "2026-05-09")).toBe(1);
  });
});

describe("spocitejStreak", () => {
  const cil = 2;
  const dnes = poledne(2026, 5, 10);

  it("prázdná data => nula", () => {
    expect(spocitejStreak([], cil, dnes)).toBe(0);
  });

  it("splněný dnešek + dva dny zpět => tři", () => {
    const data = [
      attempt(dnes),
      attempt(dnes + 1000),
      attempt(poledne(2026, 5, 9)),
      attempt(poledne(2026, 5, 9) + 1000),
      attempt(poledne(2026, 5, 8)),
      attempt(poledne(2026, 5, 8) + 1000),
    ];
    expect(spocitejStreak(data, cil, dnes)).toBe(3);
  });

  it("nesplněný dnešek: série běží od včerejška", () => {
    const data = [
      attempt(dnes),
      attempt(poledne(2026, 5, 9)),
      attempt(poledne(2026, 5, 9) + 1000),
    ];
    expect(spocitejStreak(data, cil, dnes)).toBe(1);
  });

  it("mezera sérii přeruší", () => {
    const data = [
      attempt(dnes),
      attempt(dnes + 1000),
      attempt(poledne(2026, 5, 8)),
      attempt(poledne(2026, 5, 8) + 1000),
    ];
    expect(spocitejStreak(data, cil, dnes)).toBe(1);
  });

  it("nesplněný včerejšek ani dnešek => nula", () => {
    const data = [attempt(poledne(2026, 5, 8)), attempt(poledne(2026, 5, 8) + 1)];
    expect(spocitejStreak(data, cil, dnes)).toBe(0);
  });
});
