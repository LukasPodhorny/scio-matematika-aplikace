import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  chyba: boolean;
}

/** Poslední záchrana: místo bílé stránky česká hláška s obnovou. */
export class ChybovaHranice extends Component<Props, State> {
  state: State = { chyba: false };

  static getDerivedStateFromError(): State {
    return { chyba: true };
  }

  render() {
    if (this.state.chyba) {
      return (
        <div className="mx-auto w-full max-w-2xl px-4 py-10">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Něco se pokazilo
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Aplikace narazila na chybu. Pokrok je uložený v prohlížeči,
            zkus obnovit stránku.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Obnovit stránku
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
