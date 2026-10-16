/** Společné typy datového modelu (v2: statická data místo generátorů). */

export type OkruhId =
  | "zaklady"
  | "vyrazy"
  | "rovnice"
  | "funkce"
  | "posloupnosti"
  | "planimetrie"
  | "stereometrie"
  | "analyticka"
  | "kombinatorika";

export type Obtiznost = 1 | 2 | 3 | 4 | 5;

/** Kategorie chyby podle třídění uživatele. */
export type ChybaKategorie = "neznalost" | "nepozornost" | "cas";

export const CHYBA_NAZEV: Record<ChybaKategorie, string> = {
  neznalost: "Neznalost látky",
  nepozornost: "Nepozornost",
  cas: "Nestihl kvůli času",
};

/** Druh úlohy: (a) ve stylu SCIO, (b) dril pravidel. */
export type DruhUlohy = "scio" | "dril";

export const DRUH_NAZEV: Record<DruhUlohy, string> = {
  scio: "SCIO",
  dril: "Dril",
};

/** Způsob ověření správnosti úlohy. */
export type Overeni = "independent-solve" | "code";

/** Ručně psaná úloha. Zobrazují se jen úlohy s verified: true. */
export interface Task {
  /** Jednoznačné id, např. "gonio-01". */
  id: string;
  okruh: OkruhId;
  /** Id tématu teorie, např. "goniometrie". */
  tema: string;
  /** Id podtématu v rámci okruhu. */
  podtema: string;
  podtemaNazev: string;
  obtiznost: Obtiznost;
  druh: DruhUlohy;
  /** Zadání jako TeX (může obsahovat \text{}). */
  zadani: string;
  /** 4 možnosti jako TeX. */
  moznosti: [string, string, string, string];
  /** Index správné možnosti 0–3. */
  spravna: number;
  /** Postup řešení krok za krokem, každý krok TeX. */
  postup: string[];
  /** Krátká poznámka: na čem se lidé u této úlohy nejčastěji zaseknou. Prostý text. */
  typickaChyba: string;
  verified: true;
  verifiedBy: Overeni;
  zdroj: "handwritten";
}

/** Jeden pokus o vyřešení úlohy. */
export interface Attempt {
  id: string;
  taskId: string;
  okruh: OkruhId;
  podtema: string;
  obtiznost: Obtiznost;
  druh: DruhUlohy;
  uspech: boolean;
  /** Index zvolené možnosti, null při vynechání. */
  zvolena: number | null;
  vynechano: boolean;
  /** Čas od zobrazení do potvrzení v ms. */
  casMs: number;
  /** Kategorie chyby, vyplněno jen při špatné odpovědi. */
  chyba?: ChybaKategorie;
  /** True, pokud pokus vznikl v časované simulaci testu. */
  simulace?: boolean;
  /** Unix timestamp (ms). */
  ts: number;
}

/** Nahlášená chyba v úloze (seznam k revizi). */
export interface Report {
  id: string;
  taskId: string;
  /** Volitelná poznámka uživatele. */
  poznamka?: string;
  ts: number;
}
