import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

/** Registrace PWA zůstává aktivní při cvičení; aktualizaci nabídneme až na úvodu. */
export function PwaUpdate({ visible }: { visible: boolean }) {
  const [zprava, setZprava] = useState("");
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!visible || !needRefresh) return null;

  return (
    <aside className="mx-auto w-full max-w-2xl px-4 pb-8" aria-label="Aktualizace aplikace">
      <div className="rounded-xl border border-sky-100 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/40">
        <h2 className="font-semibold">Je připravená nová verze</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Aktualizací se aplikace znovu otevře. Uložené výsledky zůstanou zachované.
        </p>
        <button
          type="button"
          onClick={() => {
            void updateServiceWorker(true).catch(() => {
              setZprava("Aktualizace se nezdařila. Zkontroluj připojení a zkus to znovu.");
            });
          }}
          className="mt-3 rounded-lg bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600"
        >
          Aktualizovat aplikaci
        </button>
        {zprava && <p className="mt-3 text-sm" role="status">{zprava}</p>}
      </div>
    </aside>
  );
}
