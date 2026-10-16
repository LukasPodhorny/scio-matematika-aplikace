import { pocetUlohProOkruh } from "../content/data";
import { OKRUHY } from "../content/okruhy";
import type { OkruhId } from "../content/types";
import { Karta } from "./Karta";
import { DenniCilWidget } from "./Statistiky";

interface Props {
  pocetPokusu: number;
  pocetChyb: number;
  onSelect: (okruh: OkruhId) => void;
  onOpakovani: () => void;
  onSimulace: () => void;
  onStatistiky: () => void;
}

export function OkruhSelect({
  pocetPokusu,
  pocetChyb,
  onSelect,
  onOpakovani,
  onSimulace,
  onStatistiky,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-100">
        Procvičování
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Vyber si okruh. Úlohy se střídají v náhodném pořadí.
        {pocetPokusu > 0 && (
          <span className="mt-1 block text-sm">
            Dosud zaznamenáno pokusů: {pocetPokusu}.
          </span>
        )}
      </p>

      <DenniCilWidget key={pocetPokusu} />

      <h2 className="mt-10 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Okruhy
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        {OKRUHY.map((o) => {
          const pocet = pocetUlohProOkruh(o.id);
          const aktivni = pocet > 0;
          return (
            <Karta
              key={o.id}
              nadpis={o.nazev}
              vpravo={aktivni ? `${pocet} úloh` : "Připravuje se"}
              popis={o.popis}
              onClick={() => onSelect(o.id)}
              disabled={!aktivni}
            />
          );
        })}
      </div>

      <h2 className="mt-10 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Další režimy
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        <Karta
          nadpis="Opakování chyb"
          vpravo={pocetChyb > 0 ? `čeká ${pocetChyb}` : "hotovo"}
          popis="Cílené procvičování dříve chybných a přeskočených úloh."
          onClick={onOpakovani}
        />
        <Karta
          nadpis="Časovaná simulace testu"
          popis="Test s limitem, bez nápovědy. Výsledek se zapíše do statistik."
          onClick={onSimulace}
        />
        <Karta
          nadpis="Statistiky"
          popis="Úspěšnost podle okruhů, příčiny chyb a aktivita v čase."
          onClick={onStatistiky}
        />
      </div>

      <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-500">
        Obtížnost úloh: 1 (lehká) až 5 (těžká). Formát: 4 možnosti, vždy
        jedna správná. Neoficiální projekt, není spojeno se SCIO.
        Zdrojový kód:{" "}
        <a
          href="https://github.com/LukasPodhorny/scio_matika"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          github.com/LukasPodhorny/scio_matika
        </a>
        , příspěvky vítány.
      </p>
    </div>
  );
}
