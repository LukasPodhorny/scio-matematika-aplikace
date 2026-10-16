import type { ReactNode } from "react";

interface Props {
  nadpis: string;
  vpravo?: ReactNode;
  popis: string;
  onClick: () => void;
  disabled?: boolean;
}

/** Klikatelná karta (režimy, okruhy, teorie). Šipka v rohu naznačuje,
 *  že karta vede dál; neaktivní karty šipku nemají. */
export function Karta({ nadpis, vpravo, popis, onClick, disabled = false }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        disabled
          ? "cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4 text-left opacity-70 dark:border-neutral-800 dark:bg-neutral-950"
          : "group relative rounded-lg border border-neutral-300 bg-white px-5 py-4 text-left transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:bg-neutral-850"
      }
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {nadpis}
        </span>
        {vpravo !== undefined && (
          <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
            {vpravo}
          </span>
        )}
      </div>
      <p className="mt-1 pr-8 text-sm text-neutral-600 dark:text-neutral-400">{popis}</p>
      {!disabled && (
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-3 text-neutral-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-sky-400 dark:text-neutral-600 dark:group-hover:text-sky-400"
        >
          →
        </span>
      )}
    </button>
  );
}
