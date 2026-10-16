import katex from "katex";
import { useMemo } from "react";
import { splitTex } from "../lib/texSplit";

interface Props {
  tex: string;
  block?: boolean;
}

function renderMath(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, { throwOnError: false, displayMode, strict: false });
}

/** Render TeXu: \text{...} úseky jako prostý text (správné české zalamování),
 *  matematika přes KaTeX. Chybný TeX se nikdy nesmí dostat do UI (kryjí to
 *  testy), throwOnError je tu jen pojistka pro vývoj. */
export function Tex({ tex, block = false }: Props) {
  const out = useMemo(() => {
    if (block) return { fallback: renderMath(tex, true), segs: null };
    const segs = splitTex(tex);
    if (segs === null) return { fallback: renderMath(tex, false), segs: null };
    return {
      fallback: null as string | null,
      segs: segs.map((s) =>
        s.kind === "text" ? { text: s.text, html: null } : { text: null, html: renderMath(s.tex, false) },
      ),
    };
  }, [tex, block]);

  if (out.segs === null) return <span dangerouslySetInnerHTML={{ __html: out.fallback ?? "" }} />;
  return (
    <span>
      {out.segs.map((s, i) =>
        s.html === null ? (
          <span key={i} className="tex-text">
            {s.text}
          </span>
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: s.html }} />
        ),
      )}
    </span>
  );
}
