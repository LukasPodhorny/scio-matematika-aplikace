import type { DruhUlohy, OkruhId, Task } from "../types";
import { ANALYTICKA } from "./analyticka";
import { FUNKCE } from "./funkce";
import { GONIOMETRIE } from "./goniometrie";
import { KOMBINATORIKA } from "./kombinatorika";
import { PLANIMETRIE } from "./planimetrie";
import { POSLOUPNOSTI } from "./posloupnosti";
import { ROVNICE } from "./rovnice";
import { STEREOMETRIE } from "./stereometrie";
import { VYRAZY } from "./vyrazy";
import { ZAKLADY } from "./zaklady";

/** Všechna statická data úloh. Nový okruh = přidat soubor a řádek sem. */
const VSECHNA_DATA: Task[] = [
  ...ANALYTICKA,
  ...FUNKCE,
  ...GONIOMETRIE,
  ...KOMBINATORIKA,
  ...PLANIMETRIE,
  ...POSLOUPNOSTI,
  ...ROVNICE,
  ...STEREOMETRIE,
  ...VYRAZY,
  ...ZAKLADY,
];

/** Jen ověřené úlohy. Neověřené se v aplikaci nikdy nezobrazí. */
export function vsechnyUlohy(): Task[] {
  return VSECHNA_DATA.filter((t) => t.verified === true);
}

/** Syrová data včetně neověřených (jen pro testy). */
export function vsechnaDataVcNeoverenych(): Task[] {
  return [...VSECHNA_DATA];
}

export type FiltrDruh = DruhUlohy | "vse";

export function ulohyProOkruh(okruh: OkruhId, filtr: FiltrDruh = "vse"): Task[] {
  return vsechnyUlohy().filter(
    (t) => t.okruh === okruh && (filtr === "vse" || t.druh === filtr),
  );
}

export function ulohaPodleId(id: string): Task | undefined {
  return vsechnyUlohy().find((t) => t.id === id);
}

export function pocetUlohProOkruh(okruh: OkruhId): number {
  return ulohyProOkruh(okruh).length;
}
