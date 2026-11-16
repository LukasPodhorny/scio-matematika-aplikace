import { describe, expect, it } from "vitest";
import type { Task } from "../content/types";
import {
  formatBody,
  formatZbyva,
  sestavTest,
  spocitejBody,
  tvarBodu,
  vyhodnotTest,
} from "./simulace";

function uloha(over: Partial<Task> = {}): Task {
  return {
    id: "u1",
    okruh: "funkce",
    tema: "goniometrie",
    podtema: "p",
    podtemaNazev: "P",
    obtiznost: 3,
    druh: "scio",
    zadani: "zadání",
    moznosti: ["a", "b", "c", "d"],
    spravna: 0,
    postup: ["krok"],
    typickaChyba: "chyba",
    verified: true,
    verifiedBy: "code",
    zdroj: "handwritten",
    ...over,
  };
}

describe("sestavTest", () => {
  it("prázdný vstup či nula => prázdný test", () => {
    expect(sestavTest([], 10, 1)).toEqual([]);
    expect(sestavTest([uloha()], 0, 1)).toEqual([]);
  });

  it("nevrací víc úloh, než je k dispozici", () => {
    const ulohy = [uloha({ id: "a" }), uloha({ id: "b" })];
    expect(sestavTest(ulohy, 10, 1)).toHaveLength(2);
  });

  it("střídá okruhy a je deterministický", () => {
    const ulohy = [
      uloha({ id: "f1", okruh: "funkce" }),
      uloha({ id: "f2", okruh: "funkce" }),
      uloha({ id: "z1", okruh: "zaklady" }),
      uloha({ id: "z2", okruh: "zaklady" }),
    ];
    const jednou = sestavTest(ulohy, 4, 7);
    expect(jednou).toHaveLength(4);
    expect(new Set(jednou.map((u) => u.id)).size).toBe(4);
    // Round-robin: první dvě úlohy jsou z různých okruhů.
    expect(jednou[0].okruh).not.toBe(jednou[1].okruh);
    expect(sestavTest(ulohy, 4, 7).map((u) => u.id)).toEqual(
      jednou.map((u) => u.id),
    );
  });
});

describe("vyhodnotTest", () => {
  const ulohy = [
    uloha({ id: "a", spravna: 0 }),
    uloha({ id: "b", spravna: 2 }),
    uloha({ id: "c", spravna: 1 }),
  ];

  it("počítá správně / špatně / vynecháno", () => {
    const v = vyhodnotTest(ulohy, [
      { taskId: "a", zvolena: 0 },
      { taskId: "b", zvolena: 1 },
      { taskId: "c", zvolena: null },
    ]);
    expect(v).toEqual({
      celkem: 3,
      spravne: 1,
      spatne: 1,
      vynechano: 1,
      uspesnost: 1 / 3,
      body: 1 - 1 / 3,
    });
  });

  it("chybějící odpověď je vynecháno", () => {
    const v = vyhodnotTest(ulohy, [{ taskId: "a", zvolena: 0 }]);
    expect(v.vynechano).toBe(2);
    expect(v.spravne).toBe(1);
  });

  it("prázdný test má nulovou úspěšnost", () => {
    expect(vyhodnotTest([], [])).toEqual({
      celkem: 0,
      spravne: 0,
      spatne: 0,
      vynechano: 0,
      uspesnost: 0,
      body: 0,
    });
  });
});

describe("spocitejBody", () => {
  it("+1 za správnou, −1/3 za chybnou", () => {
    expect(spocitejBody(10, 0)).toBe(10);
    expect(spocitejBody(10, 3)).toBe(9);
    expect(spocitejBody(0, 3)).toBe(-1);
    expect(spocitejBody(1, 1)).toBeCloseTo(2 / 3, 10);
  });
});

describe("formatBody a tvarBodu", () => {
  it.each([
    [9, "9"],
    [9.5, "9,5"],
    [28.666666, "28,67"],
    [-1, "-1"],
  ])("formatBody(%d) = %s", (body, ocekavano) => {
    expect(formatBody(body)).toBe(ocekavano);
  });

  it.each([
    [1, "1 bod"],
    [3, "3 body"],
    [5, "5 bodů"],
    [9.67, "9,67 bodů"],
  ])("tvarBodu(%d) = %s", (body, ocekavano) => {
    expect(tvarBodu(body)).toBe(ocekavano);
  });
});

describe("formatZbyva", () => {
  it.each([
    [90000, "1:30"],
    [61000, "1:01"],
    [59999, "1:00"],
    [5000, "0:05"],
    [0, "0:00"],
    [-1000, "0:00"],
  ])("formatZbyva(%d) = %s", (ms, ocekavano) => {
    expect(formatZbyva(ms)).toBe(ocekavano);
  });
});
