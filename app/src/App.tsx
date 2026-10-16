import { useEffect, useState } from "react";
import { OKRUHY } from "./content/okruhy";
import { teoriePodleId } from "./content/teorie";
import type { OkruhId } from "./content/types";
import { OkruhDetail } from "./components/OkruhDetail";
import { OkruhSelect } from "./components/OkruhSelect";
import { Opakovani } from "./components/Opakovani";
import { Practice } from "./components/Practice";
import { Simulace } from "./components/Simulace";
import { Statistiky } from "./components/Statistiky";
import { Teorie } from "./components/Teorie";
import { dueUlohy } from "./lib/opakovani";
import { loadData } from "./lib/store";

type View =
  | { name: "temata" }
  | { name: "okruh"; okruh: OkruhId }
  | { name: "procvicovani"; okruh: OkruhId }
  | { name: "opakovani" }
  | { name: "simulace" }
  | { name: "statistiky" }
  | { name: "teorie"; id: string; navrat: Exclude<View, { name: "teorie" }> };

const THEME_KEY = "scio-matika-theme";

function initialDark(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) return saved === "dark";
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export default function App() {
  const [view, setView] = useState<View>({ name: "temata" });
  const [dark, setDark] = useState(initialDark);
  const [pocetPokusu, setPocetPokusu] = useState(() => loadData().attempts.length);
  const [pocetChyb, setPocetChyb] = useState(
    () => dueUlohy(loadData().attempts, Date.now()).length,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const obnovPocty = () => {
    const data = loadData();
    setPocetPokusu(data.attempts.length);
    setPocetChyb(dueUlohy(data.attempts, Date.now()).length);
  };

  const zpetNaTemata = () => {
    obnovPocty();
    setView({ name: "temata" });
  };

  const otevriTeorii = (id: string) => {
    if (!teoriePodleId(id)) return;
    obnovPocty();
    setView((v) => ({
      name: "teorie",
      id,
      navrat: v.name === "teorie" ? { name: "temata" } : v,
    }));
  };

  const titulek =
    view.name === "procvicovani" || view.name === "okruh"
      ? OKRUHY.find((o) => o.id === view.okruh)?.nazev
      : view.name === "opakovani"
        ? "Opakování chyb"
        : view.name === "simulace"
          ? "Časovaná simulace"
          : view.name === "statistiky"
            ? "Statistiky"
            : view.name === "teorie"
              ? teoriePodleId(view.id)?.nazev
              : null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 px-4 py-3">
          <button
            type="button"
            onClick={zpetNaTemata}
            className="rounded text-left focus-visible:outline-2 focus-visible:outline-sky-600"
            title="Zpět na výběr témat"
          >
            <span className="font-bold tracking-tight">Příprava SCIO Matematika</span>
            {titulek && (
              <span className="ml-2 hidden text-sm font-normal text-neutral-500 min-[500px]:inline dark:text-neutral-400">
                {titulek}
              </span>
            )}
          </button>
          <div className="flex items-center gap-1 text-sm">
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              className="rounded px-2 py-1 text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
              title={dark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
            >
              {dark ? "Světlý" : "Tmavý"}
            </button>
          </div>
        </div>
      </header>

      <main>
        {view.name === "temata" ? (
          <OkruhSelect
            pocetPokusu={pocetPokusu}
            pocetChyb={pocetChyb}
            onSelect={(okruh) => setView({ name: "okruh", okruh })}
            onOpakovani={() => setView({ name: "opakovani" })}
            onSimulace={() => setView({ name: "simulace" })}
            onStatistiky={() => setView({ name: "statistiky" })}
          />
        ) : view.name === "okruh" ? (
          <OkruhDetail
            okruh={view.okruh}
            onProcvicovat={() =>
              setView({ name: "procvicovani", okruh: view.okruh })
            }
            onTeorie={otevriTeorii}
            onBack={zpetNaTemata}
          />
        ) : view.name === "procvicovani" ? (
          <Practice
            key={view.okruh}
            okruh={view.okruh}
            onBack={() => setView({ name: "okruh", okruh: view.okruh })}
            onTeorie={otevriTeorii}
          />
        ) : view.name === "opakovani" ? (
          <Opakovani onBack={zpetNaTemata} onTeorie={otevriTeorii} />
        ) : view.name === "simulace" ? (
          <Simulace onBack={zpetNaTemata} />
        ) : view.name === "statistiky" ? (
          <Statistiky onBack={zpetNaTemata} />
        ) : (
          (() => {
            const t = teoriePodleId(view.id);
            if (!t) return null;
            const navrat = view.navrat;
            return <Teorie teorie={t} onBack={() => setView(navrat)} />;
          })()
        )}
      </main>
    </div>
  );
}
