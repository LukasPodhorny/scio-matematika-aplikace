import { OKRUHY } from "../content/okruhy";
import type { Attempt, ChybaKategorie, DruhUlohy, OkruhId } from "../content/types";
import { denniKlic } from "./denniCil";

export interface StatistikaOkruhu {
  okruh: OkruhId;
  nazev: string;
  celkem: number;
  spravne: number;
  /** Úspěšnost 0–1. */
  uspesnost: number;
}

export interface DenniStatistika {
  /** Lokální den YYYY-MM-DD. */
  den: string;
  celkem: number;
  spravne: number;
}

export interface Prehled {
  celkem: number;
  spravne: number;
  spatne: number;
  vynechano: number;
  uspesnost: number;
  prumernyCasMs: number;
  celkemCasMs: number;
  podleOkruhu: StatistikaOkruhu[];
  podleDruhu: Array<{ druh: DruhUlohy; celkem: number; spravne: number }>;
  podleChyby: Array<{ kategorie: ChybaKategorie; pocet: number }>;
  /** Posledních 14 dní včetně dneška, vzestupně. */
  posledniDny: DenniStatistika[];
  simulace: { testy: number; uloh: number; spravne: number };
}

const POCET_DNI = 14;

export function spocitejPrehled(
  attempts: Attempt[],
  now: number = Date.now(),
): Prehled {
  let spravne = 0;
  let spatne = 0;
  let vynechano = 0;
  let celkemCasMs = 0;
  const okruhy = new Map<OkruhId, { celkem: number; spravne: number }>();
  const druhy = new Map<DruhUlohy, { celkem: number; spravne: number }>();
  const chyby = new Map<ChybaKategorie, number>();
  const dny = new Map<string, { celkem: number; spravne: number }>();
  const testoveTs = new Set<number>();
  let simulaceUloh = 0;
  let simulaceSpravne = 0;

  for (const a of attempts) {
    if (a.uspech) spravne++;
    else if (a.vynechano) vynechano++;
    else spatne++;
    celkemCasMs += a.casMs;
    const o = okruhy.get(a.okruh) ?? { celkem: 0, spravne: 0 };
    o.celkem++;
    if (a.uspech) o.spravne++;
    okruhy.set(a.okruh, o);
    const d = druhy.get(a.druh) ?? { celkem: 0, spravne: 0 };
    d.celkem++;
    if (a.uspech) d.spravne++;
    druhy.set(a.druh, d);
    if (a.chyba) chyby.set(a.chyba, (chyby.get(a.chyba) ?? 0) + 1);
    const den = denniKlic(a.ts);
    const ds = dny.get(den) ?? { celkem: 0, spravne: 0 };
    ds.celkem++;
    if (a.uspech) ds.spravne++;
    dny.set(den, ds);
    if (a.simulace) {
      testoveTs.add(a.ts);
      simulaceUloh++;
      if (a.uspech) simulaceSpravne++;
    }
  }

  const nazevOkruhu = new Map(OKRUHY.map((o) => [o.id, o.nazev]));
  const podleOkruhu: StatistikaOkruhu[] = [...okruhy.entries()]
    .map(([okruh, s]) => ({
      okruh,
      nazev: nazevOkruhu.get(okruh) ?? okruh,
      celkem: s.celkem,
      spravne: s.spravne,
      uspesnost: s.celkem > 0 ? s.spravne / s.celkem : 0,
    }))
    .sort((a, b) => b.celkem - a.celkem);

  const dnes = new Date(now);
  dnes.setHours(0, 0, 0, 0);
  const posledniDny: DenniStatistika[] = [];
  for (let i = POCET_DNI - 1; i >= 0; i--) {
    const den = new Date(dnes.getTime() - i * 86400000);
    const klic = denniKlic(den.getTime());
    const s = dny.get(klic) ?? { celkem: 0, spravne: 0 };
    posledniDny.push({ den: klic, celkem: s.celkem, spravne: s.spravne });
  }

  const celkem = attempts.length;
  return {
    celkem,
    spravne,
    spatne,
    vynechano,
    uspesnost: celkem > 0 ? spravne / celkem : 0,
    prumernyCasMs: celkem > 0 ? Math.round(celkemCasMs / celkem) : 0,
    celkemCasMs,
    podleOkruhu,
    podleDruhu: [...druhy.entries()].map(([druh, s]) => ({ druh, ...s })),
    podleChyby: [...chyby.entries()].map(([kategorie, pocet]) => ({
      kategorie,
      pocet,
    })),
    posledniDny,
    simulace: { testy: testoveTs.size, uloh: simulaceUloh, spravne: simulaceSpravne },
  };
}
