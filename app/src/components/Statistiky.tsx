import { useEffect, useMemo, useRef, useState } from "react";
import type { Attempt } from "../content/types";
import { CHYBA_NAZEV } from "../content/types";
import {
  denniKlic,
  nactiCil,
  pokusyDne,
  spocitejStreak,
  ulozCil,
} from "../lib/denniCil";
import {
  exportJson,
  loadData,
  parseData,
  saveData,
  vymazatPokusy,
  type StoreData,
} from "../lib/store";
import { spocitejPrehled } from "../lib/statistiky";

/** Záloha dat: export a import pokroku a hlášení (JSON). */
function ZalohaDat({
  pocetHlaseni,
  onImport,
}: {
  pocetHlaseni: number;
  onImport: (data: StoreData) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [zprava, setZprava] = useState<string | null>(null);

  const exportovat = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scio-matematika-zaloha.json";
    a.click();
    URL.revokeObjectURL(url);
    setZprava("Záloha stažena.");
  };

  const importovat = (file: File) => {
    file
      .text()
      .then((text) => {
        const parsed = parseData(text);
        if (!parsed.ok) {
          setZprava(`Import se nezdařil: ${parsed.error}`);
          return;
        }
        saveData(parsed.data);
        onImport(parsed.data);
        setZprava(
          `Importováno ${parsed.data.attempts.length} pokusů a ${parsed.data.reports.length} hlášení.`,
        );
      })
      .catch(() => setZprava("Import se nezdařil: soubor nelze přečíst."));
  };

  return (
    <div className="mt-8 rounded-lg border border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Záloha dat
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Export a import pokroku a hlášení (JSON).
            {pocetHlaseni > 0 && ` K revizi: ${pocetHlaseni}.`}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={exportovat}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-900 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-neutral-600 dark:text-neutral-100"
          >
            Export
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-900 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-neutral-600 dark:text-neutral-100"
          >
            Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importovat(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
      {zprava && (
        <p
          role="status"
          className="mt-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          {zprava}
        </p>
      )}
    </div>
  );
}

interface Props {
  onBack: () => void;
}

function procenta(x: number): string {
  return `${Math.round(x * 100)} %`;
}

function formatDoba(ms: number): string {
  const min = Math.round(ms / 60000);
  if (min < 1) return "méně než minuta";
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  return `${h} h ${min % 60} min`;
}

/** Jednoduchý vodorovný sloupec (čistě CSS). */
function Sloupec({ podil, trida }: { podil: number; trida: string }) {
  return (
    <div
      className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
      aria-hidden="true"
    >
      <div
        className={`h-full rounded-full ${trida}`}
        style={{ width: `${Math.round(Math.min(1, Math.max(0, podil)) * 100)}%` }}
      />
    </div>
  );
}

export function Statistiky({ onBack }: Props) {
  const [attempts, setAttempts] = useState<Attempt[]>(() => loadData().attempts);
  const [reports, setReports] = useState(() => loadData().reports);
  const [cil] = useState(() => nactiCil());
  const [now] = useState(() => Date.now());
  const [potvrditReset, setPotvrditReset] = useState(false);

  const resetovat = () => {
    const data = vymazatPokusy();
    setAttempts(data.attempts);
    setPotvrditReset(false);
  };

  const poImportu = (data: StoreData) => {
    setAttempts(data.attempts);
    setReports(data.reports);
  };
  const prehled = useMemo(() => spocitejPrehled(attempts, now), [attempts, now]);
  const streak = useMemo(
    () => spocitejStreak(attempts, cil, now),
    [attempts, cil, now],
  );
  const dnes = useMemo(
    () => pokusyDne(attempts, denniKlic(now)),
    [attempts, now],
  );
  const maxDen = Math.max(1, ...prehled.posledniDny.map((d) => d.celkem));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  if (prehled.celkem === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
        <button
          type="button"
          onClick={onBack}
          className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          ← Témata
        </button>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Statistiky
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Zatím nemáš žádné zaznamenané pokusy. Až začneš procvičovat, objeví se
          tady přehled.
        </p>
        <ZalohaDat pocetHlaseni={reports.length} onImport={poImportu} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      <button
        type="button"
        onClick={onBack}
        className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        ← Témata
      </button>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Statistiky
      </h1>

      {/* Přehled */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { nazev: "Pokusy", hodnota: String(prehled.celkem) },
          { nazev: "Úspěšnost", hodnota: procenta(prehled.uspesnost) },
          {
            nazev: "Průměrný čas",
            hodnota: `${Math.round(prehled.prumernyCasMs / 1000)} s`,
          },
          { nazev: "Série dnů", hodnota: String(streak) },
        ].map((k) => (
          <div
            key={k.nazev}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{k.nazev}</p>
            <p className="mt-0.5 text-xl font-bold text-neutral-900 tabular-nums dark:text-neutral-100">
              {k.hodnota}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Správně {prehled.spravne} · špatně {prehled.spatne} · vynecháno{" "}
        {prehled.vynechano} · celkem procvičeno {formatDoba(prehled.celkemCasMs)}.
        Dnes {dnes}/{cil} pokusů.
      </p>

      {/* Podle okruhu */}
      <h2 className="mt-8 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        Podle okruhu
      </h2>
      <div className="mt-2 flex flex-col gap-2">
        {prehled.podleOkruhu.map((o) => (
          <div
            key={o.okruh}
            className="rounded-lg border border-neutral-200 px-4 py-2.5 dark:border-neutral-800"
          >
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {o.nazev}
              </span>
              <span className="shrink-0 text-neutral-600 tabular-nums dark:text-neutral-400">
                {o.spravne}/{o.celkem} · {procenta(o.uspesnost)}
              </span>
            </div>
            <div className="mt-1.5">
              <Sloupec podil={o.uspesnost} trida="bg-sky-600 dark:bg-sky-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Kategorie chyb */}
      {prehled.podleChyby.length > 0 && (
        <>
          <h2 className="mt-8 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
            Proč chyby vznikají
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {prehled.podleChyby
              .sort((a, b) => b.pocet - a.pocet)
              .map((c) => (
                <div
                  key={c.kategorie}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm dark:border-neutral-800"
                >
                  <span className="w-32 shrink-0 text-neutral-900 dark:text-neutral-100">
                    {CHYBA_NAZEV[c.kategorie]}
                  </span>
                  <Sloupec
                    podil={c.pocet / prehled.spatne}
                    trida="bg-amber-600 dark:bg-amber-500"
                  />
                  <span className="w-8 shrink-0 text-right text-neutral-600 tabular-nums dark:text-neutral-400">
                    {c.pocet}×
                  </span>
                </div>
              ))}
          </div>
        </>
      )}

      {/* Poslední dny */}
      <h2 className="mt-8 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        Posledních 14 dní
      </h2>
      <div className="mt-2 flex h-28 items-end gap-1" role="img" aria-label="Počet pokusů v posledních 14 dnech">
        {prehled.posledniDny.map((d) => (
          <div
            key={d.den}
            className="flex min-w-0 flex-1 flex-col items-center gap-1"
            title={`${d.den}: ${d.celkem} pokusů, z toho ${d.spravne} správně`}
          >
            <div className="flex h-20 w-full items-end overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
              <div
                className="w-full rounded bg-sky-600/70 dark:bg-sky-500/70"
                style={{ height: `${Math.round((d.celkem / maxDen) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 tabular-nums dark:text-neutral-500">
              {d.den.slice(8)}
            </span>
          </div>
        ))}
      </div>

      {/* Časované testy */}
      {prehled.simulace.testy > 0 && (
        <>
          <h2 className="mt-8 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
            Časované testy
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Dokončeno testů: {prehled.simulace.testy} · úlohy v testech:{" "}
            {prehled.simulace.spravne}/{prehled.simulace.uloh} správně (
            {procenta(
              prehled.simulace.uloh > 0
                ? prehled.simulace.spravne / prehled.simulace.uloh
                : 0,
            )}
            ).
          </p>
        </>
      )}

      {/* Záloha */}
      <ZalohaDat pocetHlaseni={reports.length} onImport={poImportu} />

      {/* Reset */}
      <div className="mt-8 rounded-lg border border-neutral-200 px-4 py-3 dark:border-neutral-800">
        {potvrditReset ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Opravdu smazat všechny zaznamenané pokusy? Hlášení chyb v úlohách
              zůstanou.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={resetovat}
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-red-600 dark:bg-red-600 dark:hover:bg-red-500"
              >
                Smazat
              </button>
              <button
                type="button"
                onClick={() => setPotvrditReset(false)}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-900 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-neutral-600 dark:text-neutral-100"
              >
                Zrušit
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPotvrditReset(true)}
            className="rounded px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            Smazat statistiky…
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
        Klávesnice: Esc témata
      </p>
    </div>
  );
}

/** Kompaktní widget denního cíle na úvodní obrazovku. */
/** Widget počítá se čtením při mountu; rodič ho přemountuje přes key. */
export function DenniCilWidget() {
  const [cil, setCil] = useState(() => nactiCil());
  const [attempts] = useState<Attempt[]>(() => loadData().attempts);
  const [now] = useState(() => Date.now());

  const { dnes, streak } = useMemo(() => {
    return {
      dnes: pokusyDne(attempts, denniKlic(now)),
      streak: spocitejStreak(attempts, cil, now),
    };
  }, [attempts, cil, now]);

  const zmenCil = (novy: number) => {
    ulozCil(novy);
    setCil(nactiCil());
  };

  const splneno = dnes >= cil;
  return (
    <div className="mt-6 rounded-lg border border-neutral-200 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
          Denní cíl
        </span>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Série: {streak} {streak === 1 ? "den" : streak >= 2 && streak <= 4 ? "dny" : "dnů"}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Sloupec podil={dnes / cil} trida={splneno ? "bg-emerald-600 dark:bg-emerald-500" : "bg-sky-600 dark:bg-sky-500"} />
        <span className="shrink-0 text-sm text-neutral-600 tabular-nums dark:text-neutral-400">
          {dnes}/{cil}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="text-neutral-500 dark:text-neutral-400">Cíl:</span>
        {[5, 10, 20, 30].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => zmenCil(v)}
            aria-pressed={cil === v}
            className={`rounded-full px-2.5 py-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
              cil === v
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {v}
          </button>
        ))}
        {splneno && (
          <span className="ml-auto text-emerald-700 dark:text-emerald-300">
            Splněno
          </span>
        )}
      </div>
    </div>
  );
}
