import type { OkruhId } from "../types";
import analytickaMd from "./analyticka.md?raw";
import funkceMd from "./funkce.md?raw";
import goniometrieMd from "./goniometrie.md?raw";
import kombinatorikaMd from "./kombinatorika.md?raw";
import planimetrieMd from "./planimetrie.md?raw";
import posloupnostiMd from "./posloupnosti.md?raw";
import rovniceMd from "./rovnice.md?raw";
import stereometrieMd from "./stereometrie.md?raw";
import vyrazyMd from "./vyrazy.md?raw";
import zakladyMd from "./zaklady.md?raw";

export interface TeorieMeta {
  id: string;
  nazev: string;
  /** Okruhy, ke kterým se teorie vztahuje. */
  okruhy: OkruhId[];
  markdown: string;
}

/** Registr stránek teorie. Nové téma = přidat .md a řádek sem. */
export const TEORIE: TeorieMeta[] = [
  {
    id: "analyticka",
    nazev: "Analytická geometrie",
    okruhy: ["analyticka"],
    markdown: analytickaMd,
  },
  {
    id: "funkce",
    nazev: "Funkce",
    okruhy: ["funkce"],
    markdown: funkceMd,
  },
  {
    id: "goniometrie",
    nazev: "Goniometrie",
    okruhy: ["funkce", "rovnice", "planimetrie"],
    markdown: goniometrieMd,
  },
  {
    id: "kombinatorika",
    nazev: "Kombinatorika a statistika",
    okruhy: ["kombinatorika"],
    markdown: kombinatorikaMd,
  },
  {
    id: "planimetrie",
    nazev: "Planimetrie",
    okruhy: ["planimetrie"],
    markdown: planimetrieMd,
  },
  {
    id: "posloupnosti",
    nazev: "Posloupnosti a řady",
    okruhy: ["posloupnosti"],
    markdown: posloupnostiMd,
  },
  {
    id: "rovnice",
    nazev: "Rovnice a nerovnice",
    okruhy: ["rovnice"],
    markdown: rovniceMd,
  },
  {
    id: "stereometrie",
    nazev: "Stereometrie",
    okruhy: ["stereometrie"],
    markdown: stereometrieMd,
  },
  {
    id: "vyrazy",
    nazev: "Algebraické výrazy",
    okruhy: ["vyrazy"],
    markdown: vyrazyMd,
  },
  {
    id: "zaklady",
    nazev: "Základní poznatky",
    okruhy: ["zaklady"],
    markdown: zakladyMd,
  },
];

export function teoriePodleId(id: string): TeorieMeta | undefined {
  return TEORIE.find((t) => t.id === id);
}

export function teorieProOkruh(okruh: OkruhId): TeorieMeta[] {
  return TEORIE.filter((t) => t.okruhy.includes(okruh));
}
