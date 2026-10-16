/** Rozdělení TeXu na segmenty prostého textu a matematiky.
 *
 *  Důvod: KaTeX skládá česká písmena s diakritikou (č, ř, ž, …) uvnitř
 *  \text{...} z více elementů (základ + atomická tabulka s akcentem).
 *  Hranice takového elementu uprostřed slova je pak příležitost ke zlomu
 *  řádku a slova se trhají ("čí|sla"). Prostý text v HTML se naproti tomu
 *  láme správně jen na mezerách.
 *
 *  Pravidla odpovídají TeXu: mezery v matematice se ignorují, \text{...}
 *  se převede na prostý text (známé escapy), zbytek se renderuje přes KaTeX.
 *  Mezera mezi segmenty se nepřidává žádná — stejně jako v TeXu.
 *  Matematika sousedící s textem dostane na hranu prázdnou skupinu {},
 *  aby binární operátory a relace měly správný kontext (text je v TeXu
 *  atom třídy ord): {} má nulovou šířku a nic viditelného nemění.
 *
 *  Vrací null, když narazí na neznámý escape uvnitř \text, na neuzavřenou
 *  závorku, na prostředí (\begin) nebo na \text vnořený do argumentu
 *  příkazu — volající pak vyrenderuje celý řetězec přes KaTeX.
 */

export type TexSegment = { kind: "text"; text: string } | { kind: "math"; tex: string };

const ESCAPES: Record<string, string> = {
  "%": "%",
  "&": "&",
  _: "_",
  "{": "{",
  "}": "}",
  $: "$",
  "#": "#",
  " ": " ",
  ",": "\u2009", // \, → tenká mezera
  ":": "\u2009", // \: → tenká mezera
  ";": "\u2005", // \; → střední mezera
  "~": "\u00a0", // ~ → nezlomitelná mezera
  "\\": " ",
};

function unescapeText(raw: string): string | null {
  let out = "";
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === "\\") {
      const next = raw[i + 1];
      if (next === undefined) return null;
      const mapped = ESCAPES[next];
      if (mapped === undefined) return null;
      out += mapped;
      i++;
    } else if (c === "{" || c === "}") {
      // TeXová skupina, nevykresluje se.
    } else {
      out += c;
    }
  }
  return out;
}

export function splitTex(tex: string): TexSegment[] | null {
  // Prostředí (tabulky, případy) drží pohromadě jen v jednom renderu.
  if (tex.includes("\\begin") || tex.includes("\\end")) return null;

  const segs: TexSegment[] = [];
  let math = "";
  let prevText = false;
  const pushMath = (suffix: boolean) => {
    if (math.trim() !== "") {
      let t = math;
      if (prevText) t = "{}" + t;
      if (suffix) t += "{}";
      segs.push({ kind: "math", tex: t });
    }
    math = "";
  };

  let i = 0;
  let depth = 0;
  while (i < tex.length) {
    // Escapovaný znak do matematiky patří celý, závorku neotevírá.
    if (tex[i] === "\\" && /[^a-zA-Z]/.test(tex[i + 1] ?? "")) {
      math += tex.slice(i, i + 2);
      i += 2;
      continue;
    }
    if (tex[i] === "{") {
      depth++;
      math += tex[i];
      i++;
      continue;
    }
    if (tex[i] === "}") {
      depth--;
      math += tex[i];
      i++;
      continue;
    }
    const isTextCmd = tex.startsWith("\\text", i) && !/[a-zA-Z]/.test(tex[i + 5] ?? "");
    if (!isTextCmd) {
      math += tex[i];
      i++;
      continue;
    }
    // \text vnořený do argumentu příkazu (např. \boxed{210 \text{ Kč}})
    // se extrahovat nedá — celek patří do jednoho renderu.
    if (depth > 0) return null;
    let j = i + 5;
    while (tex[j] === " ") j++;
    if (tex[j] !== "{") {
      // "\text" bez závorky — předej KaTeXu tak, jak je.
      math += tex.slice(i, j);
      i = j;
      continue;
    }
    let k = j + 1;
    let inner = 1;
    while (k < tex.length && inner > 0) {
      if (tex[k] === "\\") {
        k += 2;
        continue;
      }
      if (tex[k] === "{") inner++;
      else if (tex[k] === "}") inner--;
      k++;
    }
    if (inner !== 0) return null;
    const converted = unescapeText(tex.slice(j + 1, k - 1));
    if (converted === null) return null;
    pushMath(true);
    if (converted !== "") segs.push({ kind: "text", text: converted });
    prevText = true;
    i = k;
  }
  pushMath(false);
  return segs;
}
