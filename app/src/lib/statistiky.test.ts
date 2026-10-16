import { describe, expect, it } from "vitest";
import type { Attempt } from "../content/types";
import { spocitejPrehled } from "./statistiky";

function attempt(over: Partial<Attempt> = {}): Attempt {
  return {
    id: "a",
    taskId: "t1",
    okruh: "funkce",
    podtema: "p",
    obtiznost: 3,
    druh: "scio",
    uspech: true,
    zvolena: 0,
    vynechano: false,
    casMs: 10000,
    ts: new Date(2026, 4, 10, 12, 0, 0).getTime(),
    ...over,
  };
}

const TED = new Date(2026, 4, 10, 18, 0, 0).getTime();

describe("spocitejPrehled", () => {
  it("prázdná data mají nulové součty a 14 dní", () => {
    const p = spocitejPrehled([], TED);
    expect(p.celkem).toBe(0);
    expect(p.uspesnost).toBe(0);
    expect(p.prumernyCasMs).toBe(0);
    expect(p.posledniDny).toHaveLength(14);
    expect(p.posledniDny[13].den).toBe("2026-05-10");
    expect(p.podleOkruhu).toEqual([]);
  });

  it("součty, úspěšnost a časy", () => {
    const p = spocitejPrehled(
      [
        attempt({ uspech: true, casMs: 10000 }),
        attempt({ uspech: false, vynechano: false, zvolena: 1, casMs: 20000 }),
        attempt({ uspech: false, vynechano: true, zvolena: null, casMs: 5000 }),
      ],
      TED,
    );
    expect(p.celkem).toBe(3);
    expect(p.spravne).toBe(1);
    expect(p.spatne).toBe(1);
    expect(p.vynechano).toBe(1);
    expect(p.uspesnost).toBeCloseTo(1 / 3);
    expect(p.celkemCasMs).toBe(35000);
    expect(p.prumernyCasMs).toBe(Math.round(35000 / 3));
  });

  it("agreguje podle okruhu, druhu a kategorie chyby", () => {
    const p = spocitejPrehled(
      [
        attempt({ okruh: "funkce", druh: "scio", uspech: true }),
        attempt({
          okruh: "funkce",
          druh: "dril",
          uspech: false,
          zvolena: 1,
          chyba: "nepozornost",
        }),
        attempt({
          okruh: "zaklady",
          druh: "scio",
          uspech: false,
          zvolena: 2,
          chyba: "cas",
        }),
      ],
      TED,
    );
    expect(p.podleOkruhu).toHaveLength(2);
    expect(p.podleOkruhu[0].okruh).toBe("funkce");
    expect(p.podleOkruhu[0].uspesnost).toBe(0.5);
    expect(p.podleDruhu).toHaveLength(2);
    expect(p.podleChyby).toHaveLength(2);
    expect(new Set(p.podleChyby.map((c) => c.kategorie))).toEqual(
      new Set(["nepozornost", "cas"]),
    );
  });

  it("denní řada přiřazuje pokusy správným dnům", () => {
    const vcera = new Date(2026, 4, 9, 20, 0, 0).getTime();
    const p = spocitejPrehled(
      [attempt({ ts: vcera, uspech: true }), attempt({ uspech: false, zvolena: 1 })],
      TED,
    );
    const vceraStat = p.posledniDny.find((d) => d.den === "2026-05-09");
    const dnesStat = p.posledniDny.find((d) => d.den === "2026-05-10");
    expect(vceraStat).toEqual({ den: "2026-05-09", celkem: 1, spravne: 1 });
    expect(dnesStat).toEqual({ den: "2026-05-10", celkem: 1, spravne: 0 });
  });

  it("časované testy se počítají podle shodného času odevzdání", () => {
    const ts = new Date(2026, 4, 10, 15, 0, 0).getTime();
    const p = spocitejPrehled(
      [
        attempt({ simulace: true, ts, uspech: true }),
        attempt({ simulace: true, ts, uspech: false, zvolena: 1 }),
        attempt({ uspech: true }),
      ],
      TED,
    );
    expect(p.simulace).toEqual({ testy: 1, uloh: 2, spravne: 1 });
    expect(p.celkem).toBe(3);
  });
});
