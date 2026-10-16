import { pocetUlohProOkruh } from "../content/data";
import { OKRUHY } from "../content/okruhy";
import { teorieProOkruh } from "../content/teorie";
import type { OkruhId } from "../content/types";
import { Karta } from "./Karta";

interface Props {
  okruh: OkruhId;
  onProcvicovat: () => void;
  onTeorie: (temaId: string) => void;
  onBack: () => void;
}

export function OkruhDetail({ okruh, onProcvicovat, onTeorie, onBack }: Props) {
  const meta = OKRUHY.find((o) => o.id === okruh);
  const teorie = teorieProOkruh(okruh);
  const pocet = pocetUlohProOkruh(okruh);
  if (!meta) return null;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      <button
        type="button"
        onClick={onBack}
        className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        ← Témata
      </button>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-100">
        {meta.nazev}
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{meta.popis}</p>

      <div className="mt-6 flex flex-col gap-3">
        <Karta
          nadpis="Procvičování"
          vpravo={`${pocet} úloh`}
          popis="Úlohy se střídají v náhodném pořadí, s okamžitou zpětnou vazbou."
          onClick={onProcvicovat}
        />

        {teorie.map((t) => (
          <Karta
            key={t.id}
            nadpis={`Teorie: ${t.nazev}`}
            popis="Výklad, typové úlohy, řešené příklady a shrnutí vzorců."
            onClick={() => onTeorie(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
