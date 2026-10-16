import { describe, expect, it } from "vitest";
import type { Attempt } from "../content/types";
import {
  addAttempt,
  addReport,
  emptyData,
  exportJson,
  loadData,
  memoryStore,
  parseData,
  vymazatPokusy,
} from "./store";

function attempt(over: Partial<Attempt> = {}): Attempt {
  return {
    id: "a1",
    taskId: "gonio-01",
    okruh: "funkce",
    podtema: "gonio-hodnoty",
    obtiznost: 3,
    druh: "scio",
    uspech: false,
    zvolena: 2,
    vynechano: false,
    casMs: 12345,
    chyba: "nepozornost",
    ts: 1700000000000,
    ...over,
  };
}

describe("store", () => {
  it("prázdný obchod vrací prázdná data verze 2", () => {
    expect(loadData(memoryStore())).toEqual(emptyData());
    expect(emptyData().version).toBe(2);
  });

  it("addAttempt a addReport ukládají a načítají", () => {
    const s = memoryStore();
    addAttempt(attempt(), s);
    addAttempt(attempt({ id: "a2", uspech: true, chyba: undefined }), s);
    addReport({ id: "r1", taskId: "gonio-01", ts: 1 }, s);
    const data = loadData(s);
    expect(data.attempts).toHaveLength(2);
    expect(data.attempts[0].chyba).toBe("nepozornost");
    expect(data.reports).toHaveLength(1);
  });

  it("vymazatPokusy smaže pokusy a nechá hlášení", () => {
    const s = memoryStore();
    addAttempt(attempt(), s);
    addReport({ id: "r1", taskId: "gonio-01", ts: 1 }, s);
    const data = vymazatPokusy(s);
    expect(data.attempts).toHaveLength(0);
    expect(data.reports).toHaveLength(1);
    expect(loadData(s).attempts).toHaveLength(0);
    expect(loadData(s).reports).toHaveLength(1);
  });

  it("poškozený JSON znamená prázdná data", () => {
    const s = memoryStore();
    s.setItem("scio-matika-v1", "{neplatný");
    expect(loadData(s)).toEqual(emptyData());
  });

  it("export → import round-trip", () => {
    const s = memoryStore();
    addAttempt(attempt(), s);
    addReport({ id: "r1", taskId: "gonio-01", ts: 1 }, s);
    const json = exportJson(s);
    const parsed = parseData(json);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.data.attempts).toHaveLength(1);
      expect(parsed.data.reports).toHaveLength(1);
    }
  });

  it("migruje data verze 1 (pokusy bez druhu a hlášení)", () => {
    const v1 = JSON.stringify({
      version: 1,
      attempts: [
        {
          id: "a1",
          taskId: "x:1",
          generatorId: "g",
          okruh: "funkce",
          podtema: "p",
          obtiznost: 1,
          uspech: true,
          zvolena: 0,
          vynechano: false,
          casMs: 5,
          ts: 1,
        },
      ],
    });
    const parsed = parseData(v1);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.data.version).toBe(2);
      expect(parsed.data.attempts[0].druh).toBe("dril");
      expect(parsed.data.reports).toEqual([]);
    }
  });

  it.each([
    ["není json", "Soubor není platný JSON."],
    ['{"version":99,"attempts":[]}', "Nepodporovaná verze dat (očekáváno 2)."],
    ['{"version":2}', "Chybí pole attempts."],
    ['{"version":2,"attempts":[]}', "Chybí pole reports."],
    [
      '{"version":2,"attempts":[{"id":1}],"reports":[]}',
      "Neplatný záznam pokusu: pole id není řetězec",
    ],
    [
      '{"version":2,"attempts":[],"reports":[{"id":1}]}',
      "Neplatný záznam hlášení: pole id není řetězec",
    ],
  ])("parseData odmítne %s", (json, error) => {
    const r = parseData(json);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe(error);
  });
});
