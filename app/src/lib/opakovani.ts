import type { Attempt } from "../content/types";
import { Rng } from "./rng";

export interface ChybnaUloha {
  taskId: string;
  /** Kolikrát uživatel úlohu pokazil či přeskočil (celkem). */
  pocetChyb: number;
  /** Čas posledního neúspěšného pokusu. */
  posledniChybaTs: number;
}

/** Úlohy k opakování: poslední pokus byl neúspěšný (špatně či přeskočeno).
 *  Řazeno: nejvíc chyb první, při shodě nejstarší chyba první. */
export function chybneUlohy(attempts: Attempt[]): ChybnaUloha[] {
  const podleTasku = new Map<string, Attempt[]>();
  for (const a of attempts) {
    const seznam = podleTasku.get(a.taskId);
    if (seznam) seznam.push(a);
    else podleTasku.set(a.taskId, [a]);
  }
  const vysledek: ChybnaUloha[] = [];
  for (const [taskId, pokusy] of podleTasku) {
    const serazene = [...pokusy].sort((x, y) => x.ts - y.ts);
    const posledni = serazene[serazene.length - 1];
    if (posledni.uspech) continue;
    vysledek.push({
      taskId,
      pocetChyb: serazene.filter((p) => !p.uspech).length,
      posledniChybaTs: posledni.ts,
    });
  }
  vysledek.sort(
    (a, b) => b.pocetChyb - a.pocetChyb || a.posledniChybaTs - b.posledniChybaTs,
  );
  return vysledek;
}

/** Zamíchání fronty opakování (deterministické pro daný seed). */
export function zamichejFrontu(taskIds: string[], seed: number): string[] {
  return new Rng(seed >>> 0).shuffle(taskIds);
}

/** Spaced repetition: Leitnerovy krabičky odvozené z historie pokusů.
 *
 * Proč Leitner a ne SM-2: stav úlohy je jedno číslo (krabička 0–5)
 * dopočitatelné čistě z historie pokusů, bez ukládání a migrací;
 * intervaly jsou pevné a předvídatelné (0/1/3/7/14/30 dní); SM-2 by
 * potřebovalo navíc evidovat kvalitu každé odpovědi a ladit parametry,
 * což jednorázové volbě A–D neodpovídá.
 *
 * Pravidla: do cyklu vstupují jen úlohy s aspoň jednou chybou či
 * přeskočením. Úspěch posune o krabičku výš (max. 5), chyba vrací do
 * nulté krabičky. Úloha je splatná, když vypršel interval její krabičky
 * od posledního pokusu; nultá krabička má interval 0 (opakovat ihned). */
export const LEITNER_INTERVALY_MS = [0, 1, 3, 7, 14, 30].map(
  (dnu) => dnu * 86400000,
);
export const LEITNER_MAX_BOX = LEITNER_INTERVALY_MS.length - 1;

export interface LeitnerStav {
  taskId: string;
  box: number;
  /** Čas, od kdy je úloha splatná k opakování. */
  dueTs: number;
  /** Celkový počet chyb a přeskočení. */
  pocetChyb: number;
}

/** Stav krabiček odvozený přehráním historie pokusů (bez ukládání). */
export function stavLeitneru(attempts: Attempt[]): LeitnerStav[] {
  const podleTasku = new Map<string, Attempt[]>();
  for (const a of attempts) {
    const seznam = podleTasku.get(a.taskId);
    if (seznam) seznam.push(a);
    else podleTasku.set(a.taskId, [a]);
  }
  const vysledek: LeitnerStav[] = [];
  for (const [taskId, pokusy] of podleTasku) {
    const serazene = [...pokusy].sort((x, y) => x.ts - y.ts);
    if (serazene.every((p) => p.uspech)) continue;
    let box = 0;
    for (const p of serazene) {
      box = p.uspech ? Math.min(box + 1, LEITNER_MAX_BOX) : 0;
    }
    const posledni = serazene[serazene.length - 1];
    vysledek.push({
      taskId,
      box,
      dueTs: posledni.ts + LEITNER_INTERVALY_MS[box],
      pocetChyb: serazene.filter((p) => !p.uspech).length,
    });
  }
  return vysledek;
}

/** Úlohy splatné k opakování: nejdřív nejvíc po splatnosti, pak víc chyb. */
export function dueUlohy(attempts: Attempt[], nowTs: number): LeitnerStav[] {
  return stavLeitneru(attempts)
    .filter((s) => s.dueTs <= nowTs)
    .sort((a, b) => a.dueTs - b.dueTs || b.pocetChyb - a.pocetChyb);
}
