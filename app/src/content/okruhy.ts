import type { OkruhId } from "./types";

export interface OkruhMeta {
  id: OkruhId;
  nazev: string;
  popis: string;
  podtemata: string[];
}

/** Taxonomie 9 okruhů schválená uživatelem (krok 1). */
export const OKRUHY: OkruhMeta[] = [
  {
    id: "zaklady",
    nazev: "Základní poznatky",
    popis: "Čísla, mocniny, zlomky, dělitelnost, poměry, procenta, množiny, logika",
    podtemata: [
      "Číselné obory",
      "Mocniny, odmocniny a zlomky",
      "Dělitelnost, NSD, NSN",
      "Procenta, poměry, trojčlenka, zaokrouhlování",
      "Množiny a intervaly",
      "Výroková logika",
    ],
  },
  {
    id: "vyrazy",
    nazev: "Algebraické výrazy",
    popis: "Úpravy výrazů, mnohočleny, mocniny, odmocniny",
    podtemata: [
      "Úpravy výrazů",
      "Mnohočleny a vzorce",
      "Lomené výrazy",
      "Mocniny a odmocniny",
      "Absolutní hodnota",
    ],
  },
  {
    id: "rovnice",
    nazev: "Rovnice a nerovnice",
    popis: "Lineární, kvadratické, soustavy, s parametrem",
    podtemata: [
      "Lineární rovnice a soustavy",
      "Kvadratické rovnice",
      "Rovnice s parametrem",
      "Iracionální rovnice",
      "Exponenciální a logaritmické rovnice",
      "Goniometrické rovnice",
      "Nerovnice a jejich soustavy",
      "Rovnice a nerovnice s absolutní hodnotou",
    ],
  },
  {
    id: "funkce",
    nazev: "Funkce",
    popis: "Vlastnosti, grafy, definiční obory, typy funkcí",
    podtemata: [
      "Hodnota funkce v bodě",
      "Vrchol paraboly",
      "Inverzní funkce",
      "Definiční obor",
      "Průsečíky s osami",
      "Goniometrické funkce",
      "Exponenciální a logaritmické funkce",
    ],
  },
  {
    id: "posloupnosti",
    nazev: "Posloupnosti a řady",
    popis: "Aritmetická, geometrická, limita, finanční matematika",
    podtemata: [
      "Aritmetická posloupnost",
      "Geometrická posloupnost",
      "Limita posloupnosti",
      "Nekonečná geometrická řada",
      "Finanční matematika",
    ],
  },
  {
    id: "planimetrie",
    nazev: "Planimetrie",
    popis: "Trojúhelníky, podobnost, kružnice, obsahy",
    podtemata: [
      "Trojúhelníky",
      "Shodnost a podobnost",
      "Mnohoúhelníky",
      "Kružnice a kruh",
      "Trigonometrie",
      "Obvody a obsahy",
    ],
  },
  {
    id: "stereometrie",
    nazev: "Stereometrie",
    popis: "Polohové a metrické vztahy, tělesa",
    podtemata: ["Polohové vztahy", "Metrické vztahy", "Objem a povrch těles"],
  },
  {
    id: "analyticka",
    nazev: "Analytická geometrie",
    popis: "Vektory, přímka, rovina, kuželosečky",
    podtemata: ["Vektory", "Přímka", "Rovina", "Vzdálenosti a odchylky", "Kuželosečky"],
  },
  {
    id: "kombinatorika",
    nazev: "Kombinatorika a statistika",
    popis: "Kombinace, pravděpodobnost, práce s daty",
    podtemata: [
      "Kombinatorická pravidla a skupiny",
      "Binomická věta",
      "Pravděpodobnost",
      "Statistické charakteristiky",
    ],
  },
];
