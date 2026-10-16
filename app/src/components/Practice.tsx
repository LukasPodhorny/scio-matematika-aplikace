import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ulohyProOkruh } from "../content/data";
import type { ChybaKategorie, OkruhId } from "../content/types";
import { CHYBA_NAZEV } from "../content/types";
import { checkChoice } from "../lib/check";
import { Rng } from "../lib/rng";
import { useMaxRadku } from "../lib/useMaxRadku";
import { addAttempt, addReport, loadData, uid } from "../lib/store";
import { Tex } from "./Tex";

interface Props {
  okruh: OkruhId;
  onBack: () => void;
  onTeorie: (temaId: string) => void;
}

type Faze = "odpoved" | "kategorie" | "vysledek";

const PISMENA = ["A", "B", "C", "D"];
const KATEGORIE: ChybaKategorie[] = ["neznalost", "nepozornost", "cas"];

function formatCas(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}:${String(s % 60).padStart(2, "0")}` : `${s} s`;
}

/** Deterministické zamíchání indexů pro dané kolo (Fisher–Yates nad seedem). */
function zamichaneIndexy(pocet: number, kolo: number): number[] {
  const rng = new Rng((kolo * 2654435761 + 97) >>> 0);
  return rng.shuffle(Array.from({ length: pocet }, (_, i) => i));
}

export function Practice({ okruh, onBack, onTeorie }: Props) {
  const [kolo, setKolo] = useState(0);
  // Seed losovaný při každém otevření: pořadí je pokaždé jiné.
  const [seed] = useState(() => Math.floor(Math.random() * 4294967296));
  const [index, setIndex] = useState(0);
  const [vybrana, setVybrana] = useState<number | null>(null);
  const [faze, setFaze] = useState<Faze>("odpoved");
  const [uspech, setUspech] = useState<boolean | null>(null);
  const [casMs, setCasMs] = useState(0);
  const [uplynulo, setUplynulo] = useState(0);
  const [relace, setRelace] = useState({ celkem: 0, spravne: 0 });
  const [nahlaseno, setNahlaseno] = useState(false);

  const ulohy = useMemo(() => ulohyProOkruh(okruh), [okruh]);
  const smes = useMemo(
    () => (ulohy.length > 0 ? zamichaneIndexy(ulohy.length, seed + kolo) : []),
    [ulohy.length, kolo, seed],
  );
  const uloha = ulohy.length > 0 ? ulohy[smes[index % smes.length]] : null;
  const zadaniRef = useMaxRadku<HTMLDivElement>(4, 14, uloha?.id);
  const startRef = useRef<number>(0);

  // Nová úloha => nový začátek měření; interval přepíše displej do 250 ms.
  useEffect(() => {
    startRef.current = Date.now();
    const t = setInterval(() => setUplynulo(Date.now() - startRef.current), 250);
    return () => clearInterval(t);
  }, [uloha?.id]);

  const potvrdit = useCallback(() => {
    if (uloha === null || vybrana === null) return;
    const ms = Date.now() - startRef.current;
    const ok = checkChoice(uloha, vybrana);
    setCasMs(ms);
    setUspech(ok);
    setRelace((r) => ({ celkem: r.celkem + 1, spravne: r.spravne + (ok ? 1 : 0) }));
    if (ok) {
      addAttempt({
        id: uid(),
        taskId: uloha.id,
        okruh: uloha.okruh,
        podtema: uloha.podtema,
        obtiznost: uloha.obtiznost,
        druh: uloha.druh,
        uspech: true,
        zvolena: vybrana,
        vynechano: false,
        casMs: ms,
        ts: Date.now(),
      });
      setFaze("vysledek");
    } else {
      setFaze("kategorie");
    }
  }, [vybrana, uloha]);

  const ulozitKategorii = useCallback(
    (chyba: ChybaKategorie) => {
      if (uloha === null) return;
      addAttempt({
        id: uid(),
        taskId: uloha.id,
        okruh: uloha.okruh,
        podtema: uloha.podtema,
        obtiznost: uloha.obtiznost,
        druh: uloha.druh,
        uspech: false,
        zvolena: vybrana,
        vynechano: false,
        casMs,
        chyba,
        ts: Date.now(),
      });
      setFaze("vysledek");
    },
    [uloha, vybrana, casMs],
  );

  const dalsi = useCallback(() => {
    if (index + 1 >= smes.length) {
      setKolo((k) => k + 1);
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
    setVybrana(null);
    setFaze("odpoved");
    setUspech(null);
    setNahlaseno(false);
  }, [index, smes.length]);

  // Přeskočit: zapíše vynechání a jde hned na další úlohu, bez odhalení.
  const preskocit = useCallback(() => {
    if (uloha === null) return;
    addAttempt({
      id: uid(),
      taskId: uloha.id,
      okruh: uloha.okruh,
      podtema: uloha.podtema,
      obtiznost: uloha.obtiznost,
      druh: uloha.druh,
      uspech: false,
      zvolena: null,
      vynechano: true,
      casMs: Date.now() - startRef.current,
      ts: Date.now(),
    });
    setRelace((r) => ({ ...r, celkem: r.celkem + 1 }));
    dalsi();
  }, [uloha, dalsi]);

  const nahlasit = useCallback(() => {
    if (uloha === null) return;
    const uz = loadData().reports.some((r) => r.taskId === uloha.id);
    if (!uz) {
      addReport({ id: uid(), taskId: uloha.id, ts: Date.now() });
    }
    setNahlaseno(true);
  }, [uloha]);

  // Klávesnice: A–D/1–4 výběr, Enter potvrdit/další, 1–3 kategorie chyby, Esc zpět.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
        return;
      }
      if (faze === "odpoved") {
        const idx = "abcdABCD".includes(e.key)
          ? "abcdABCD".indexOf(e.key) % 4
          : ["1", "2", "3", "4"].includes(e.key)
            ? Number(e.key) - 1
            : -1;
        if (idx >= 0) setVybrana(idx);
        else if (e.key === "Enter") potvrdit();
      } else if (faze === "kategorie") {
        if (["1", "2", "3"].includes(e.key)) {
          ulozitKategorii(KATEGORIE[Number(e.key) - 1]);
        }
      } else if (faze === "vysledek") {
        if (e.key === "Enter") dalsi();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [faze, potvrdit, ulozitKategorii, dalsi, onBack]);

  const zodpovezeno = faze !== "odpoved";

  if (uloha === null) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
        <button
          type="button"
          onClick={onBack}
          className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          ← Témata
        </button>
        <p className="mt-6 text-neutral-900 dark:text-neutral-100">
          Pro tento okruh zatím nejsou žádné úlohy.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      {/* Horní lišta */}
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onBack}
            className="rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            ← Zpět
          </button>
          <button
            type="button"
            onClick={() => onTeorie(uloha.tema)}
            className="rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            Zopakovat teorii
          </button>
        </div>
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
          <span className="tabular-nums" title="Čas od zobrazení úlohy">
            {formatCas(zodpovezeno ? casMs : uplynulo)}
          </span>
          <span title="Správně / celkem v této relaci">
            {relace.spravne}/{relace.celkem}
          </span>
        </div>
      </div>

      {/* Hlavička úlohy */}
      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span>{uloha.podtemaNazev}</span>
        <span aria-hidden="true">·</span>
        <span title={`Obtížnost ${uloha.obtiznost} z 5`}>
          obtížnost {uloha.obtiznost}/5
        </span>
      </div>

      {/* Zadání */}
      <div
        key={uloha.id}
        ref={zadaniRef}
        className="task-enter task-statement math-box mt-3 text-xl leading-relaxed text-neutral-900 md:text-2xl dark:text-neutral-100"
      >
        <Tex tex={uloha.zadani} />
      </div>

      {/* Možnosti */}
      <div className="mt-6 flex flex-col gap-2" role="radiogroup" aria-label="Možnosti odpovědi">
        {uloha.moznosti.map((m, i) => {
          const jeSpravna = zodpovezeno && i === uloha.spravna;
          const jeSpatnaVolba = zodpovezeno && uspech === false && i === vybrana;
          const jeVybrana = !zodpovezeno && i === vybrana;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === vybrana}
              disabled={zodpovezeno}
              onClick={() => setVybrana(i)}
              className={`flex items-center gap-4 rounded-lg border px-4 py-3 text-left text-lg transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                jeSpravna
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950"
                  : jeSpatnaVolba
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : jeVybrana
                      ? "border-sky-600 bg-sky-50 dark:bg-sky-950"
                      : "border-neutral-300 bg-white hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                  jeSpravna
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-300"
                    : jeSpatnaVolba
                      ? "border-red-600 text-red-700 dark:text-red-300"
                      : jeVybrana
                        ? "border-sky-600 text-sky-700 dark:text-sky-300"
                        : "border-neutral-300 text-neutral-500 dark:border-neutral-600 dark:text-neutral-400"
                }`}
              >
                {PISMENA[i]}
              </span>
              <span className="math-box min-w-0 flex-1 text-neutral-900 dark:text-neutral-100">
                <Tex tex={m} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Akce */}
      {!zodpovezeno && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={preskocit}
            className="rounded px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            Přeskočit
          </button>
          <button
            type="button"
            onClick={potvrdit}
            disabled={vybrana === null}
            className="rounded-lg bg-sky-700 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Potvrdit ↵
          </button>
        </div>
      )}

      {/* Kategorie chyby */}
      {faze === "kategorie" && (
        <div className="feedback-enter mt-4 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Proč to nevyšlo?
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            {KATEGORIE.map((k, i) => (
              <button
                key={k}
                type="button"
                onClick={() => ulozitKategorii(k)}
                className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 text-neutral-900 transition-colors hover:border-sky-600 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-sky-400 dark:hover:bg-sky-950"
              >
                <span className="mr-2 text-sm text-neutral-400">{i + 1}</span>
                {CHYBA_NAZEV[k]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Postup řešení */}
      {faze === "vysledek" && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
            Postup řešení
          </h2>
          <ol className="mt-2 flex flex-col gap-2">
            {uloha.postup.map((krok, i) => (
              <li
                key={i}
                className="math-box rounded-lg bg-neutral-100 px-4 py-2.5 text-base text-neutral-900 md:text-lg dark:bg-neutral-800 dark:text-neutral-100"
              >
                <Tex tex={krok} />
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-lg border border-neutral-200 px-4 py-3 text-sm dark:border-neutral-800">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Typická chyba:{" "}
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">
              {uloha.typickaChyba}
            </span>
          </div>

          <button
            type="button"
            onClick={dalsi}
            autoFocus
            className="mt-5 w-full rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Další úloha ↵
          </button>

          <div className="mt-3 text-center">
            {nahlaseno ? (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Uloženo k revizi.
              </span>
            ) : (
              <button
                type="button"
                onClick={nahlasit}
                className="rounded px-2 py-1 text-sm text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
              >
                Nahlásit chybu v úloze
              </button>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
        Klávesnice: A–D výběr · Enter potvrdit/další · Esc témata
      </p>
    </div>
  );
}
