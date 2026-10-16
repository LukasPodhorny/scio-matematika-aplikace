import type { Attempt } from "../content/types";
import type { KeyValueStore } from "./store";

export const CIL_KEY = "scio-matika-cil-v1";
export const VYCHOZI_CIL = 10;
export const MIN_CIL = 1;
export const MAX_CIL = 200;

function defaultStore(): KeyValueStore | null {
  try {
    if (typeof localStorage !== "undefined") return localStorage;
  } catch {
    /* nedostupné (SSR/testy) */
  }
  return null;
}

/** Lokální den jako YYYY-MM-DD (streak se počítá v místním čase). */
export function denniKlic(ts: number): string {
  const d = new Date(ts);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const den = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${den}`;
}

/** Denní cíl (počet pokusů). Při chybějící či neplatné hodnotě výchozí. */
export function nactiCil(
  store: KeyValueStore | null = defaultStore(),
): number {
  if (!store) return VYCHOZI_CIL;
  const raw = store.getItem(CIL_KEY);
  if (!raw) return VYCHOZI_CIL;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < MIN_CIL || n > MAX_CIL) return VYCHOZI_CIL;
  return n;
}

export function ulozCil(
  cil: number,
  store: KeyValueStore | null = defaultStore(),
): void {
  if (!store) return;
  const n = Math.min(MAX_CIL, Math.max(MIN_CIL, Math.round(cil)));
  store.setItem(CIL_KEY, String(n));
}

/** Počet pokusů v daném dni (klíč z denniKlic). */
export function pokusyDne(attempts: Attempt[], den: string): number {
  return attempts.filter((a) => denniKlic(a.ts) === den).length;
}

/** Série: počet po sobě jdoucích dnů se splněným cílem.
 *  Dnešek se počítá, je-li už splněn; jinak série běží od včerejška. */
export function spocitejStreak(
  attempts: Attempt[],
  cil: number,
  now: number = Date.now(),
): number {
  const pocty = new Map<string, number>();
  for (const a of attempts) {
    const den = denniKlic(a.ts);
    pocty.set(den, (pocty.get(den) ?? 0) + 1);
  }
  const splnen = (den: string) => (pocty.get(den) ?? 0) >= cil;
  const dnes = new Date(now);
  dnes.setHours(0, 0, 0, 0);
  let kurzor = splnen(denniKlic(dnes.getTime()))
    ? dnes.getTime()
    : dnes.getTime() - 86400000;
  let serie = 0;
  while (splnen(denniKlic(kurzor))) {
    serie++;
    kurzor -= 86400000;
  }
  return serie;
}
