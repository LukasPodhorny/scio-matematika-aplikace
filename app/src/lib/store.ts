import type { Attempt, Report } from "../content/types";

export const STORE_KEY = "scio-matika-v1";
const STORE_VERSION = 2;

export interface StoreData {
  version: number;
  attempts: Attempt[];
  reports: Report[];
}

/** Minimální rozhraní úložiště (localStorage v prohlížeči, paměť v testech). */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function defaultStore(): KeyValueStore | null {
  try {
    if (typeof localStorage !== "undefined") return localStorage;
  } catch {
    /* nedostupné (SSR/testy) */
  }
  return null;
}

export function memoryStore(): KeyValueStore {
  const map = new Map<string, string>();
  return {
    getItem: (k) => (map.has(k) ? map.get(k)! : null),
    setItem: (k, v) => {
      map.set(k, v);
    },
  };
}

export function emptyData(): StoreData {
  return { version: STORE_VERSION, attempts: [], reports: [] };
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Načtení dat; při poškození vrátí prázdná data (nemaže). Verzi 1 migruje na 2. */
export function loadData(store: KeyValueStore | null = defaultStore()): StoreData {
  if (!store) return emptyData();
  const raw = store.getItem(STORE_KEY);
  if (!raw) return emptyData();
  const parsed = parseData(raw);
  if (!parsed.ok) return emptyData();
  return parsed.data;
}

export function saveData(
  data: StoreData,
  store: KeyValueStore | null = defaultStore(),
): void {
  if (!store) return;
  store.setItem(STORE_KEY, JSON.stringify(data));
}

export function addAttempt(
  attempt: Attempt,
  store: KeyValueStore | null = defaultStore(),
): StoreData {
  const data = loadData(store);
  data.attempts.push(attempt);
  saveData(data, store);
  return data;
}

export function addReport(
  report: Report,
  store: KeyValueStore | null = defaultStore(),
): StoreData {
  const data = loadData(store);
  data.reports.push(report);
  saveData(data, store);
  return data;
}

/** Smaže pokusy (statistiky, denní cíl i frontu opakování).
 *  Hlášení chyb v úlohách nechává — ta nejsou statistikou uživatele. */
export function vymazatPokusy(
  store: KeyValueStore | null = defaultStore(),
): StoreData {
  const data = loadData(store);
  const prazdna: StoreData = { ...emptyData(), reports: data.reports };
  saveData(prazdna, store);
  return prazdna;
}

/** Validovaný parse pro import. Akceptuje verze 1 (migruje) a 2. */
export function parseData(
  json: string,
): { ok: true; data: StoreData } | { ok: false; error: string } {
  let obj: unknown;
  try {
    obj = JSON.parse(json);
  } catch {
    return { ok: false, error: "Soubor není platný JSON." };
  }
  if (typeof obj !== "object" || obj === null) {
    return { ok: false, error: "Neočekávaná struktura dat." };
  }
  const rec = obj as Record<string, unknown>;
  if (rec.version !== 1 && rec.version !== STORE_VERSION) {
    return { ok: false, error: `Nepodporovaná verze dat (očekáváno ${STORE_VERSION}).` };
  }
  if (!Array.isArray(rec.attempts)) {
    return { ok: false, error: "Chybí pole attempts." };
  }
  const migrated: Attempt[] = [];
  for (const a of rec.attempts) {
    if (rec.version === 1) {
      const m = migrateAttemptV1(a);
      if (typeof m === "string") return { ok: false, error: `Neplatný záznam pokusu: ${m}` };
      migrated.push(m);
    } else {
      const err = validateAttempt(a);
      if (err) return { ok: false, error: `Neplatný záznam pokusu: ${err}` };
      migrated.push(a as Attempt);
    }
  }
  let reports: Report[] = [];
  if (rec.version === STORE_VERSION) {
    if (!Array.isArray(rec.reports)) {
      return { ok: false, error: "Chybí pole reports." };
    }
    for (const r of rec.reports) {
      const err = validateReport(r);
      if (err) return { ok: false, error: `Neplatný záznam hlášení: ${err}` };
    }
    reports = rec.reports as Report[];
  }
  return { ok: true, data: { version: STORE_VERSION, attempts: migrated, reports } };
}

/** Migrace pokusu z v1 (generátory) na v2: generátorové úlohy byly základní => dril. */
function migrateAttemptV1(a: unknown): Attempt | string {
  if (typeof a !== "object" || a === null) return "není objekt";
  const r = a as Record<string, unknown>;
  const str = ["id", "taskId", "okruh", "podtema"];
  for (const k of str) if (typeof r[k] !== "string") return `pole ${k} není řetězec`;
  if (typeof r.obtiznost !== "number") return "obtiznost není číslo";
  if (typeof r.uspech !== "boolean") return "uspech není boolean";
  if (typeof r.vynechano !== "boolean") return "vynechano není boolean";
  if (r.zvolena !== null && typeof r.zvolena !== "number") {
    return "zvolena není číslo ani null";
  }
  if (typeof r.casMs !== "number" || r.casMs < 0) return "neplatné casMs";
  if (typeof r.ts !== "number") return "neplatné ts";
  if (
    r.chyba !== undefined &&
    r.chyba !== "neznalost" &&
    r.chyba !== "nepozornost" &&
    r.chyba !== "cas"
  ) {
    return "neplatná kategorie chyby";
  }
  return {
    id: r.id as string,
    taskId: r.taskId as string,
    okruh: r.okruh as Attempt["okruh"],
    podtema: r.podtema as string,
    obtiznost: r.obtiznost as Attempt["obtiznost"],
    druh: "dril",
    uspech: r.uspech as boolean,
    zvolena: r.zvolena as number | null,
    vynechano: r.vynechano as boolean,
    casMs: r.casMs as number,
    ...(typeof r.chyba === "string" ? { chyba: r.chyba as Attempt["chyba"] } : {}),
    ts: r.ts as number,
  };
}

function validateAttempt(a: unknown): string | null {
  if (typeof a !== "object" || a === null) return "není objekt";
  const r = a as Record<string, unknown>;
  const str = ["id", "taskId", "okruh", "podtema"];
  for (const k of str) if (typeof r[k] !== "string") return `pole ${k} není řetězec`;
  if (typeof r.obtiznost !== "number") return "obtiznost není číslo";
  if (r.druh !== "scio" && r.druh !== "dril") return "neplatný druh úlohy";
  if (typeof r.uspech !== "boolean") return "uspech není boolean";
  if (typeof r.vynechano !== "boolean") return "vynechano není boolean";
  if (r.zvolena !== null && typeof r.zvolena !== "number") {
    return "zvolena není číslo ani null";
  }
  if (typeof r.casMs !== "number" || r.casMs < 0) return "neplatné casMs";
  if (typeof r.ts !== "number") return "neplatné ts";
  if (
    r.chyba !== undefined &&
    r.chyba !== "neznalost" &&
    r.chyba !== "nepozornost" &&
    r.chyba !== "cas"
  ) {
    return "neplatná kategorie chyby";
  }
  if (r.simulace !== undefined && typeof r.simulace !== "boolean") {
    return "simulace není boolean";
  }
  return null;
}

function validateReport(r: unknown): string | null {
  if (typeof r !== "object" || r === null) return "není objekt";
  const rec = r as Record<string, unknown>;
  if (typeof rec.id !== "string") return "pole id není řetězec";
  if (typeof rec.taskId !== "string") return "pole taskId není řetězec";
  if (rec.poznamka !== undefined && typeof rec.poznamka !== "string") {
    return "pole poznamka není řetězec";
  }
  if (typeof rec.ts !== "number") return "neplatné ts";
  return null;
}

export function exportJson(
  store: KeyValueStore | null = defaultStore(),
): string {
  return JSON.stringify(loadData(store), null, 2);
}
