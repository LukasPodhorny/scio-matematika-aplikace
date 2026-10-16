import GithubSlugger from "github-slugger";
import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { TeorieMeta } from "../content/teorie";

interface Props {
  teorie: TeorieMeta;
  onBack: () => void;
}

interface Nadpis {
  uroven: 2 | 3;
  text: string;
  id: string;
}

function textZDeti(deti: ReactNode): string {
  if (typeof deti === "string") return deti;
  if (typeof deti === "number") return String(deti);
  if (Array.isArray(deti)) return deti.map(textZDeti).join("");
  if (isValidElement<{ children?: ReactNode }>(deti)) {
    return textZDeti(deti.props.children);
  }
  return "";
}

/** Odstraní první výskyt markeru z renderovaných dětí (marker je vždy na začátku). */
function bezMarkeru(deti: ReactNode, marker: RegExp): ReactNode {
  let hotovo = false;
  const strip = (n: ReactNode): ReactNode => {
    if (hotovo) return n;
    if (typeof n === "string") {
      const m = marker.exec(n);
      if (m && m.index === 0) {
        hotovo = true;
        return n.slice(m[0].length);
      }
      return n;
    }
    if (Array.isArray(n)) return Children.map(n, strip);
    if (isValidElement<{ children?: ReactNode }>(n)) {
      return cloneElement(n as ReactElement<{ children?: ReactNode }>, {
        children: strip(n.props.children),
      } as { children?: ReactNode });
    }
    return n;
  };
  return strip(deti);
}

const ADMONICE: Record<string, { nazev: string; prouzek: string; stitek: string }> = {
  VETA: {
    nazev: "Věta / Pravidlo",
    prouzek: "#a3a3a3",
    stitek: "text-neutral-500 dark:text-neutral-400",
  },
  POZOR: {
    nazev: "Pozor – častá chyba",
    prouzek: "#b45309",
    stitek: "text-amber-700 dark:text-amber-500",
  },
};

const MARKER = /^\[!(VETA|POZOR)\]\s*/;

export function Teorie({ teorie, onBack }: Props) {
  // Osnova + id nadpisů: jeden průchod, deterministické, bezpečné pro StrictMode.
  // (Nadpisy v .md souborech jsou prostý text bez vzorců, každý text právě jednou.)
  const { nadpisy, idMapa } = useMemo(() => {
    const slugger = new GithubSlugger();
    const seznam: Nadpis[] = [];
    const mapa = new Map<string, string>();
    for (const line of teorie.markdown.split("\n")) {
      const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (m) {
        const text = m[2].trim();
        const id = slugger.slug(text);
        seznam.push({ uroven: m[1].length === 2 ? 2 : 3, text, id });
        if (!mapa.has(text)) mapa.set(text, id);
      }
    }
    return { nadpisy: seznam, idMapa: mapa };
  }, [teorie.markdown]);

  return (
    <div className="w-full py-[var(--teorie-s3)] md:py-[var(--teorie-s4)]">
      {/* Zpět na mobilu (na desktopu je ve sloupci nalevo) */}
      <div className="mx-auto max-w-2xl px-4 xl:hidden">
        <button
          type="button"
          onClick={onBack}
          className="rounded px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          ← Zpět
        </button>
      </div>

      {/* Textový sloupec centrovaný jako hlavička (max-w-2xl),
          osnova prostě nalevo od něj. Třetí buňka zůstává prázdná. */}
      <div className="mt-[var(--teorie-s2)] grid gap-x-10 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)]">
        {/* Levý sloupec: zpět + osnova, jen desktop */}
        <aside className="hidden w-60 justify-self-end xl:block">
          <div className="sticky top-[var(--teorie-s2)]">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 rounded px-2 py-1 align-top text-sm text-neutral-600 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-sky-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              ← Zpět
            </button>
            <nav className="mt-[var(--teorie-s2)] max-h-[80vh] overflow-y-auto text-sm">
              <p className="mb-[var(--teorie-s1)] text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                Obsah
              </p>
              <ul className="space-y-[var(--teorie-s1)]">
                {nadpisy.map((n) => (
                  <li key={n.id} className={n.uroven === 3 ? "pl-[var(--teorie-s2)]" : ""}>
                    <a
                      href={`#${n.id}`}
                      className="text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {n.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <article className="teorie mx-auto min-w-0 w-full max-w-2xl px-4 text-neutral-900 xl:mx-0 xl:max-w-[70ch] xl:justify-self-start dark:text-neutral-100">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-[var(--teorie-s3)] text-2xl font-bold tracking-tight md:text-3xl">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  id={idMapa.get(textZDeti(children).trim())}
                  className="mt-[var(--teorie-s5)] mb-[var(--teorie-s2)] scroll-mt-[var(--teorie-s2)] border-t border-neutral-200 pt-[var(--teorie-s2)] text-[1.75rem] font-bold tracking-tight dark:border-neutral-800"
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  id={idMapa.get(textZDeti(children).trim())}
                  className="mt-[var(--teorie-s4)] mb-[var(--teorie-s1)] scroll-mt-[var(--teorie-s2)] text-[1.2rem] font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="my-[var(--teorie-s2)] leading-7">{children}</p>,
              ul: ({ children }) => (
                <ul className="my-[var(--teorie-s3)] list-disc space-y-[var(--teorie-s1)] pl-[var(--teorie-s3)] leading-7">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-[var(--teorie-s3)] list-decimal space-y-[var(--teorie-s1)] pl-[var(--teorie-s3)] leading-7">
                  {children}
                </ol>
              ),
              table: ({ children }) => (
                <div className="my-[var(--teorie-s3)] overflow-x-auto">
                  <table className="w-full border-collapse text-sm leading-6">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-neutral-300 bg-neutral-100 px-[var(--teorie-s1)] py-[var(--teorie-s1)] text-left font-semibold dark:border-neutral-700 dark:bg-neutral-800">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-neutral-300 px-[var(--teorie-s1)] py-[var(--teorie-s1)] dark:border-neutral-700">
                  {children}
                </td>
              ),
              code: ({ children, className }) =>
                className ? (
                  <code className={className}>{children}</code>
                ) : (
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em] dark:bg-neutral-800">
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="my-[var(--teorie-s3)] overflow-x-auto rounded-lg bg-neutral-100 p-[var(--teorie-s2)] text-sm leading-6 dark:bg-neutral-800">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => {
                // react-markdown obaluje children znaky \n — před kotvou ^ oříznout.
                const m = MARKER.exec(textZDeti(children).trimStart());
                if (!m) {
                  return (
                    <blockquote className="my-4 border-l-2 border-neutral-300 pl-4 text-neutral-700 italic dark:border-neutral-600 dark:text-neutral-300">
                      {children}
                    </blockquote>
                  );
                }
                const adm = ADMONICE[m[1]];
                return (
                  <div
                    className="admonice my-[var(--teorie-s3)] rounded-r-lg border-l-2 bg-neutral-50 px-[var(--teorie-s3)] py-[var(--teorie-s2)] dark:bg-neutral-900"
                    style={{ borderLeftColor: adm.prouzek }}
                  >
                    <p className={`mb-[var(--teorie-s1)] text-xs font-semibold tracking-wide uppercase ${adm.stitek}`}>
                      {adm.nazev}
                    </p>
                    <div className="admonice-body [&>p]:leading-7">
                      {bezMarkeru(children, MARKER)}
                    </div>
                  </div>
                );
              },
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-sky-700 underline decoration-sky-300 underline-offset-2 hover:decoration-sky-600 dark:text-sky-300"
                >
                  {children}
                </a>
              ),
            }}
          >
            {teorie.markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
