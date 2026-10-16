import { useEffect, useRef } from "react";

/** Zmenšuje písmo elementu, dokud se text nevejde do maxRadku řádků
 *  a na šířku (nejméně na minPx). Šířka je nutná, protože KaTeX vzorce
 *  se nelámou a přetékají na jednom řádku. Měří při změně klíče (typicky
 *  id úlohy), po načtení fontů a při změně velikosti okna. Písmo mění
 *  přímo ve stylu, nererenderuje. */
export function useMaxRadku<T extends HTMLElement>(
  maxRadku: number,
  minPx = 14,
  klic: unknown = null,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let zive = true;

    const prepocti = () => {
      if (!zive) return;
      el.style.fontSize = "";
      const styl = getComputedStyle(el);
      const radek = parseFloat(styl.lineHeight);
      let velikost = parseFloat(styl.fontSize);
      if (!Number.isFinite(radek) || !Number.isFinite(velikost)) return;
      const maxVyska = radek * maxRadku;
      const preteka = () =>
        el.scrollHeight > maxVyska + 1 || el.scrollWidth > el.clientWidth + 1;
      while (preteka() && velikost > minPx) {
        velikost -= 1;
        el.style.fontSize = `${velikost}px`;
      }
    };

    prepocti();
    document.fonts.ready.then(() => {
      prepocti();
    });
    window.addEventListener("resize", prepocti);
    return () => {
      zive = false;
      window.removeEventListener("resize", prepocti);
    };
  }, [maxRadku, minPx, klic]);

  return ref;
}
