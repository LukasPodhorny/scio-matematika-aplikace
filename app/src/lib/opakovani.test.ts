import { describe, expect, it } from "vitest";
import type { Attempt } from "../content/types";
import {
  LEITNER_INTERVALY_MS,
  chybneUlohy,
  dueUlohy,
  stavLeitneru,
  zamichejFrontu,
} from "./opakovani";

function attempt(over: Partial<Attempt> = {}): Attempt {
  return {
    id: "a",
    taskId: "t1",
    okruh: "funkce",
    podtema: "p",
    obtiznost: 3,
    druh: "scio",
    uspech: false,
    zvolena: 1,
    vynechano: false,
    casMs: 1000,
    ts: 1000,
    ...over,
  };
}

describe("chybneUlohy", () => {
  it("prázdné pokusy => prázdná fronta", () => {
    expect(chybneUlohy([])).toEqual([]);
  });

  it("úloha se zvládnutým posledním pokusem ve frontě není", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, uspech: false }),
      attempt({ taskId: "t1", ts: 2, uspech: true, zvolena: 0 }),
    ];
    expect(chybneUlohy(data)).toEqual([]);
  });

  it("poslední pokus špatně => úloha je ve frontě s počtem chyb", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, uspech: false }),
      attempt({ taskId: "t1", ts: 2, uspech: true, zvolena: 0 }),
      attempt({ taskId: "t1", ts: 3, uspech: false }),
    ];
    expect(chybneUlohy(data)).toEqual([
      { taskId: "t1", pocetChyb: 2, posledniChybaTs: 3 },
    ]);
  });

  it("přeskočená úloha je ve frontě", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, vynechano: true, zvolena: null }),
    ];
    expect(chybneUlohy(data)).toHaveLength(1);
  });

  it("řazení: víc chyb první, pak starší chyba první", () => {
    const data = [
      attempt({ taskId: "jedna", ts: 10 }),
      attempt({ taskId: "dve-nove", ts: 20 }),
      attempt({ taskId: "dve-nove", ts: 30 }),
      attempt({ taskId: "dve-stare", ts: 5 }),
      attempt({ taskId: "dve-stare", ts: 6 }),
    ];
    expect(chybneUlohy(data).map((c) => c.taskId)).toEqual([
      "dve-stare",
      "dve-nove",
      "jedna",
    ]);
  });
});

describe("stavLeitneru", () => {
  const DEN = 86400000;

  it("prázdné pokusy => prázdný stav", () => {
    expect(stavLeitneru([])).toEqual([]);
  });

  it("nikdy nechyběná úloha do cyklu nevstupuje", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, uspech: true, zvolena: 0 }),
      attempt({ taskId: "t1", ts: 2, uspech: true, zvolena: 0 }),
    ];
    expect(stavLeitneru(data)).toEqual([]);
  });

  it("chyba => krabička 0 splatná ihned", () => {
    const data = [attempt({ taskId: "t1", ts: 1000 })];
    expect(stavLeitneru(data)).toEqual([
      { taskId: "t1", box: 0, dueTs: 1000, pocetChyb: 1 },
    ]);
  });

  it("úspěch posune výš a nastaví interval", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1000, uspech: false }),
      attempt({ taskId: "t1", ts: 2000, uspech: true, zvolena: 0 }),
    ];
    expect(stavLeitneru(data)).toEqual([
      { taskId: "t1", box: 1, dueTs: 2000 + DEN, pocetChyb: 1 },
    ]);
  });

  it("chyba po úspěších vrací do nulté krabičky", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, uspech: false }),
      attempt({ taskId: "t1", ts: 2, uspech: true, zvolena: 0 }),
      attempt({ taskId: "t1", ts: 3, uspech: true, zvolena: 0 }),
      attempt({ taskId: "t1", ts: 4, uspech: false }),
    ];
    expect(stavLeitneru(data)).toEqual([
      { taskId: "t1", box: 0, dueTs: 4, pocetChyb: 2 },
    ]);
  });

  it("krabička je shora omezená", () => {
    const data = [attempt({ taskId: "t1", ts: 1, uspech: false })];
    for (let i = 2; i <= 10; i++) {
      data.push(attempt({ taskId: "t1", ts: i, uspech: true, zvolena: 0 }));
    }
    const [stav] = stavLeitneru(data);
    expect(stav.box).toBe(LEITNER_INTERVALY_MS.length - 1);
    expect(stav.dueTs).toBe(10 + 30 * DEN);
  });

  it("přeskočení se počítá jako chyba", () => {
    const data = [
      attempt({ taskId: "t1", ts: 1, vynechano: true, zvolena: null }),
    ];
    expect(stavLeitneru(data)).toEqual([
      { taskId: "t1", box: 0, dueTs: 1, pocetChyb: 1 },
    ]);
  });
});

describe("dueUlohy", () => {
  const DEN = 86400000;
  const TED = 100 * DEN;

  it("vrací jen splatné úlohy", () => {
    const data = [
      attempt({ taskId: "splatna", ts: TED - 2 * DEN, uspech: false }),
      attempt({
        taskId: "nesplatna",
        ts: TED - 2 * DEN,
        uspech: false,
      }),
      attempt({
        taskId: "nesplatna",
        ts: TED,
        uspech: true,
        zvolena: 0,
      }),
    ];
    expect(dueUlohy(data, TED).map((s) => s.taskId)).toEqual(["splatna"]);
  });

  it("řazení: nejvíc po splatnosti první, pak víc chyb", () => {
    const data = [
      attempt({ taskId: "nova", ts: TED, uspech: false }),
      attempt({ taskId: "stara", ts: TED - 5 * DEN, uspech: false }),
      attempt({ taskId: "chybova", ts: TED, uspech: false }),
      attempt({
        taskId: "chybova",
        ts: TED - DEN,
        uspech: false,
      }),
    ];
    expect(dueUlohy(data, TED).map((s) => s.taskId)).toEqual([
      "stara",
      "chybova",
      "nova",
    ]);
  });
});

describe("zamichejFrontu", () => {
  it("nemění množinu a je deterministické", () => {
    const vstup = ["a", "b", "c", "d", "e"];
    const jednou = zamichejFrontu(vstup, 42);
    expect([...jednou].sort()).toEqual([...vstup].sort());
    expect(zamichejFrontu(vstup, 42)).toEqual(jednou);
  });
});
