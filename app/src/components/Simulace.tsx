import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { vsechnyUlohy } from "../content/data";
import type { Task } from "../content/types";
import {
  PREDVOLBY_LIMIT,
  PREDVOLBY_POCET,
  SCIO_LIMIT_MINUT,
  SCIO_POCET,
  formatZbyva,
  sestavTest,
  tvarBodu,
  vyhodnotTest,
  type VysledekTestu,
} from "../lib/simulace";
import { addAttempt, uid } from "../lib/store";
import { useMaxRadku } from "../lib/useMaxRadku";
import { Tex } from "./Tex";

interface Props {
  onBack: () => void;
}

type Faze = "nastaveni" | "test" | "vysledky";

const PISMENA = ["A", "B", "C", "D"];

export function Simulace({ onBack }: Props) {
  const [faze, setFaze] = useState<Faze>("nastaveni");
  const [pocet, setPocet] = useState(10);
  const [limitMinut, setLimitMinut] = useState(15);
  const [ulohy, setUlohy] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);
  const [odpovedi, setOdpovedi] = useState<Record<string, number | null>>({});
  const [vysledek, setVysledek] = useState<VysledekTestu | null>(null);
  const [vysledneUlohy, setVysledneUlohy] = useState<Task[]>([]);
  const [vysledneOdpovedi, setVysledneOdpovedi] = useState<Record<string, number | null>>({});
  const [zbyvaMs, setZbyvaMs] = useState(0);
  const deadlineRef = useRef(0);
  const zobrazenoRef = useRef<Record<string, number>>({});

  const kDispozici = useMemo(() => vsechnyUlohy().length, []);
  const skutecnyPocet = Math.min(pocet, kDispozici);
  const uloha = faze === "test" && ulohy.length > 0 ? ulohy[index] : null;
  const zadaniRef = useMaxRadku<HTMLDivElement>(4, 14, uloha?.id);

  const zacit = useCallback(() => {
    const test = sestavTest(vsechnyUlohy(), pocet, Date.now() >>> 0);
    if (test.length === 0) return;
    setUlohy(test);
    setIndex(0);
    setOdpovedi({});
    setVysledek(null);
    zobrazenoRef.current = { [test[0].id]: Date.now() };
    deadlineRef.current = Date.now() + limitMinut * 60000;
    setZbyvaMs(limitMinut * 60000);
    setFaze("test");
  }, [pocet, limitMinut]);

  // Při změně úlohy zaznamenat první zobrazení (pro čas na úlohu).
  useEffect(() => {
    if (faze === "test" && uloha && !zobrazenoRef.current[uloha.id]) {
      zobrazenoRef.current[uloha.id] = Date.now();
    }
  }, [faze, uloha]);

  const odevzdat = useCallback(
    (vyprsel: boolean) => {
      if (ulohy.length === 0) return;
      const ts = Date.now();
      const vysledekTestu = vyhodnotTest(
        ulohy,
        ulohy.map((u) => ({ taskId: u.id, zvolena: odpovedi[u.id] ?? null })),
      );
      for (const u of ulohy) {
        const zvolena = odpovedi[u.id] ?? null;
        const od = zobrazenoRef.current[u.id] ?? ts;
        addAttempt({
          id: uid(),
          taskId: u.id,
          okruh: u.okruh,
          podtema: u.podtema,
          obtiznost: u.obtiznost,
          druh: u.druh,
          uspech: zvolena !== null && zvolena === u.spravna,
          zvolena,
          vynechano: zvolena === null,
          casMs: zvolena === null ? 0 : Math.max(0, ts - od),
          // Nevyplněné při vypršení limitu = chyba z času.
          ...(zvolena === null && vyprsel ? { chyba: "cas" as const } : {}),
          simulace: true,
          ts,
        });
      }
      setVysledek(vysledekTestu);
      setVysledneUlohy(ulohy);
      setVysledneOdpovedi(odpovedi);
      setFaze("vysledky");
    },
    [ulohy, odpovedi],
  );

  // Odpočet; při nule automatické odevzdání.
  const odevzdatRef = useRef(odevzdat);
  useEffect(() => {
    odevzdatRef.current = odevzdat;
  });
  useEffect(() => {
    if (faze !== "test") return;
    const t = setInterval(() => {
      const zbyva = deadlineRef.current - Date.now();
      if (zbyva <= 0) {
        clearInterval(t);
        setZbyvaMs(0);
        odevzdatRef.current(true);
      } else {
        setZbyvaMs(zbyva);
      }
    }, 250);
    return () => clearInterval(t);
  }, [faze]);

  const vybrat = useCallback(
    (i: number) => {
      if (uloha === null) return;
      setOdpovedi((o) => ({ ...o, [uloha.id]: i }));
    },
    [uloha],
  );

  const jitNa = useCallback(
    (i: number) => {
      if (ulohy.length === 0) return;
      setIndex(Math.min(ulohy.length - 1, Math.max(0, i)));
    },
    [ulohy.length],
  );

  // Klávesnice: A–D/1–4 výběr, ←/→ pohyb, Enter další, Esc zpět.
  useEffect(() => {
    if (faze !== "test") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
        return;
      }
      if (e.key === "ArrowRight") {
        jitNa(index + 1);
        return;
      }
      if (e.key === "ArrowLeft") {
        jitNa(index - 1);
        return;
      }
      if (e.key === "Enter") {
        if (index + 1 < ulohy.length) jitNa(index + 1);
        else odevzdatRef.current(false);
        return;
      }
      const idx = "abcdABCD".includes(e.key)
        ? "abcdABCD".indexOf(e.key) % 4
        : ["1", "2", "3", "4"].includes(e.key)
          ? Number(e.key) - 1
          : -1;
      if (idx >= 0) vybrat(idx);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [faze, index, ulohy.length, jitNa, vybrat, onBack]);

  useEffect(() => {
    if (faze !== "nastaveni") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
      else if (e.key === "Enter") zacit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [faze, zacit, onBack]);

  useEffect(() => {
    if (faze !== "vysledky") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [faze, onBack]);

  if (faze === "nastaveni") {
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
          Časovaná simulace testu
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Jako u přijímaček: bez nápovědy a postupu, s limitem. Výsledek se
          zapíše do statistik.
        </p>

        {kDispozici === 0 ? (
          <p className="mt-6 text-neutral-900 dark:text-neutral-100">
            Zatím nejsou k dispozici žádné úlohy.
          </p>
        ) : (
          <>
            <h2 className="mt-6 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Počet úloh
            </h2>
            <div className="mt-2 flex items-center gap-1 text-sm" role="group" aria-label="Počet úloh">
              {PREDVOLBY_POCET.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPocet(p)}
                  aria-pressed={pocet === p}
                  className={`rounded-full px-3 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    pocet === p
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Časový limit
            </h2>
            <div className="mt-2 flex items-center gap-1 text-sm" role="group" aria-label="Časový limit">
              {PREDVOLBY_LIMIT.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLimitMinut(l)}
                  aria-pressed={limitMinut === l}
                  className={`rounded-full px-3 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    limitMinut === l
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  }`}
                >
                  {l} min
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Test bude mít {skutecnyPocet} {skutecnyPocet === 1 ? "úlohu" : skutecnyPocet < 5 ? "úlohy" : "úloh"} a limit {limitMinut} minut.
            </p>

            <button
              type="button"
              onClick={() => {
                setPocet(SCIO_POCET);
                setLimitMinut(SCIO_LIMIT_MINUT);
              }}
              className="mt-3 w-full rounded-lg border border-neutral-300 bg-white px-6 py-2.5 font-semibold text-neutral-900 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-500"
            >
              Předvolba SCIO: {SCIO_POCET} úloh / {SCIO_LIMIT_MINUT} minut
            </button>

            <button
              type="button"
              onClick={zacit}
              autoFocus
              className="mt-5 w-full rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              Začít test ↵
            </button>
          </>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          Klávesnice: Enter začít · Esc témata
        </p>
      </div>
    );
  }

  if (faze === "vysledky" && vysledek) {
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
          Výsledek testu
        </h1>
        <p
          className="feedback-enter mt-3 rounded-lg bg-neutral-100 px-4 py-3 text-lg font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
          role="status"
        >
          {vysledek.spravne}/{vysledek.celkem} správně
          {" · "}
          {Math.round(vysledek.uspesnost * 100)} %
          {" · "}
          {tvarBodu(vysledek.body)}
          {vysledek.vynechano > 0 && ` · vynecháno ${vysledek.vynechano}`}
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Surové body: +1 za správnou, −⅓ za chybnou, 0 za vynechanou. Bez
          přepočtu na percentil.
        </p>

        <ol className="mt-4 flex flex-col gap-2">
          {vysledneUlohy.map((u, i) => {
            const zvolena = vysledneOdpovedi[u.id] ?? null;
            const ok = zvolena !== null && zvolena === u.spravna;
            return (
              <li
                key={u.id}
                className={`rounded-lg border px-4 py-3 ${
                  ok
                    ? "border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950"
                    : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {i + 1}. {u.podtemaNazev}
                  </span>
                  <span
                    className={
                      ok
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-neutral-500 dark:text-neutral-400"
                    }
                  >
                    {zvolena === null
                      ? `vynecháno · správně ${PISMENA[u.spravna]}`
                      : ok
                        ? `správně (${PISMENA[zvolena]})`
                        : `${PISMENA[zvolena]} → správně ${PISMENA[u.spravna]}`}
                  </span>
                </div>
                {!ok && (
                  <div className="math-box mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <Tex tex={u.zadani} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={onBack}
          autoFocus
          className="mt-5 w-full rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          Zpět na témata ↵
        </button>
      </div>
    );
  }

  if (uloha === null) return null;
  const vybrana = odpovedi[uloha.id] ?? null;
  const zodpovezeno = Object.values(odpovedi).filter((v) => v !== null).length;
  const dochazi = zbyvaMs < 60000;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      <div className="flex items-center justify-between gap-3 text-sm">
        <button
          type="button"
          onClick={onBack}
          className="rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          ← Ukončit bez uložení
        </button>
        <div className="flex items-center gap-3">
          <span className="text-neutral-600 dark:text-neutral-400" title="Zodpovězeno">
            {zodpovezeno}/{ulohy.length}
          </span>
          <span
            className={`rounded px-2 py-1 font-semibold tabular-nums ${
              dochazi
                ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
            }`}
            title="Zbývající čas"
            role="timer"
          >
            {formatZbyva(zbyvaMs)}
          </span>
        </div>
      </div>

      {/* Přehled úloh */}
      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Přehled úloh">
        {ulohy.map((u, i) => {
          const maOdpoved = (odpovedi[u.id] ?? null) !== null;
          const aktualni = i === index;
          return (
            <button
              key={u.id}
              type="button"
              onClick={() => jitNa(i)}
              aria-label={`Úloha ${i + 1}${maOdpoved ? ", zodpovězena" : ""}`}
              aria-current={aktualni}
              className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                aktualni
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : maOdpoved
                    ? "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-200"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Úloha {index + 1} z {ulohy.length} · {uloha.podtemaNazev}
      </p>

      <div
        key={uloha.id}
        ref={zadaniRef}
        className="task-enter task-statement math-box mt-3 text-xl leading-relaxed text-neutral-900 md:text-2xl dark:text-neutral-100"
      >
        <Tex tex={uloha.zadani} />
      </div>

      <div className="mt-6 flex flex-col gap-2" role="radiogroup" aria-label="Možnosti odpovědi">
        {uloha.moznosti.map((m, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i === vybrana}
            onClick={() => vybrat(i)}
            className={`flex items-center gap-4 rounded-lg border px-4 py-3 text-left text-lg transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
              i === vybrana
                ? "border-sky-600 bg-sky-50 dark:bg-sky-950"
                : "border-neutral-300 bg-white hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-500"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                i === vybrana
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
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => jitNa(index - 1)}
          disabled={index === 0}
          className="rounded px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          ← Předchozí
        </button>
        {index + 1 < ulohy.length ? (
          <button
            type="button"
            onClick={() => jitNa(index + 1)}
            className="rounded-lg bg-neutral-900 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            Další →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => odevzdat(false)}
            className="rounded-lg bg-sky-700 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Odevzdat test ↵
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
        Klávesnice: A–D výběr · ←/→ pohyb · Enter další/odevzdat · Esc ukončit
      </p>
    </div>
  );
}
