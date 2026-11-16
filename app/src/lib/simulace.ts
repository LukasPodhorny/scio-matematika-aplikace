import type { Task } from "../content/types";
import { Rng } from "./rng";

export const PREDVOLBY_POCET = [5, 10, 15];
export const PREDVOLBY_LIMIT = [5, 10, 15, 20];

/** Formát reálného SCIO testu z matematiky: 35 úloh, 90 minut. */
export const SCIO_POCET = 35;
export const SCIO_LIMIT_MINUT = 90;

/** Surové body SCIO: +1 za správnou, −1/3 za chybnou, 0 za vynechanou. */
export function spocitejBody(spravne: number, spatne: number): number {
  return spravne - spatne / 3;
}

/** Body s českou desetinnou čárkou, ořezané nuly (9 → "9", 28.666 → "28,67"). */
export function formatBody(body: number): string {
  const zaokrouhleno = Math.round(body * 100) / 100;
  return String(zaokrouhleno).replace(".", ",");
}

/** Skloňování: 1 bod, 2–4 body, jinak bodů. */
export function tvarBodu(body: number): string {
  if (body === 1) return `${formatBody(body)} bod`;
  if (Number.isInteger(body) && body >= 2 && body <= 4)
    return `${formatBody(body)} body`;
  return `${formatBody(body)} bodů`;
}

/** Sestaví časovaný test: round-robin napříč okruhy, aby test pokryl více látky.
 *  Deterministické pro daný seed. */
export function sestavTest(ulohy: Task[], pocet: number, seed: number): Task[] {
  if (ulohy.length === 0 || pocet <= 0) return [];
  const rng = new Rng(seed >>> 0);
  const skupiny = new Map<string, Task[]>();
  for (const u of rng.shuffle(ulohy)) {
    const fronta = skupiny.get(u.okruh);
    if (fronta) fronta.push(u);
    else skupiny.set(u.okruh, [u]);
  }
  const fronty = [...skupiny.values()];
  const cil = Math.min(pocet, ulohy.length);
  const vysledek: Task[] = [];
  let i = 0;
  while (vysledek.length < cil) {
    const fronta = fronty[i % fronty.length];
    const dalsi = fronta.shift();
    if (dalsi) vysledek.push(dalsi);
    i++;
  }
  return vysledek;
}

export interface OdpovedTestu {
  taskId: string;
  /** Zvolená možnost, null = nezodpovězeno. */
  zvolena: number | null;
}

export interface VysledekTestu {
  celkem: number;
  spravne: number;
  spatne: number;
  vynechano: number;
  /** Úspěšnost 0–1 (ze všech úloh testu). */
  uspesnost: number;
  /** Surové body SCIO (+1/−1/3/0), bez přepočtu na percentil. */
  body: number;
}

export function vyhodnotTest(
  ulohy: Task[],
  odpovedi: OdpovedTestu[],
): VysledekTestu {
  const mapa = new Map(odpovedi.map((o) => [o.taskId, o.zvolena]));
  let spravne = 0;
  let spatne = 0;
  let vynechano = 0;
  for (const u of ulohy) {
    const zvolena = mapa.get(u.id) ?? null;
    if (zvolena === null) vynechano++;
    else if (zvolena === u.spravna) spravne++;
    else spatne++;
  }
  const celkem = ulohy.length;
  return {
    celkem,
    spravne,
    spatne,
    vynechano,
    uspesnost: celkem > 0 ? spravne / celkem : 0,
    body: spocitejBody(spravne, spatne),
  };
}

/** Formát odpočtu: M:SS. */
export function formatZbyva(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
