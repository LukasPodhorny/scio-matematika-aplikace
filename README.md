# SCIO Matematika – aplikace

Veřejná část projektu: webová aplikace pro přípravu na SCIO test z matematiky
(teorie, cvičení, simulace testu, statistiky).

## Struktura

- `app/` – webová aplikace (React + Vite + TypeScript, Tailwind)
- `scripts/` – ověřovací skripty pro úlohy (Python)

## Vývoj

```sh
cd app
npm install
npm run dev     # vývojový server
npm run test    # testy (vitest)
npm run build   # produkční build do dist/
```

## Nasazení

Aplikace běží na Vercelu, Root Directory je `app`.

Produkční build obsahuje také PWA manifest, ikony a service worker. Po prvním
načtení jsou úlohy, teorie a fonty dostupné offline. Nabídku instalace řídí
prohlížeč; aplikace ji nepotlačuje ani nezobrazuje vlastní instalační blok.
Na iPhonu lze použít Safari → Sdílet → Přidat na plochu.
Nová verze nabídne aktualizaci na úvodní stránce a nepřerušuje běžící cvičení.
Na veřejné doméně je potřeba HTTPS (Vercel jej poskytuje automaticky).

Po sestavení lze instalovatelnost, offline načtení a nepřetržitý mix všech okruhů
ověřit v dočasném profilu Google Chrome:

```sh
node scripts/verify-pwa.mjs
```

Service worker je zapnutý v produkčním buildu a náhledu `npm run preview`,
nikoli ve vývojovém serveru `npm run dev`.
