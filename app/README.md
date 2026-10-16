# SCIO Matematika

Osobní webová aplikace pro procvičování matematiky k přijímacímu testu
SCIO (NSZ). Úlohy po okruzích, teorie, opakování chyb, časovaná simulace,
statistiky, denní cíl.

## Stack

React + Vite + TypeScript, Tailwind, KaTeX. Bez backendu; pokrok se ukládá
do localStorage s exportem/importem do JSON.

## Vývoj

```sh
cd aplikace/app
npm install
npm run dev      # vývojový server
npm test         # unit testy (vitest)
npm run lint     # oxlint
npm run build    # typová kontrola + produkční build do dist/
```

## Ověřování úloh

Každá úloha je nezávisle dořešena a výsledek je ověřen kódem (sympy):

```sh
cd aplikace
python3 scripts/verify-<okruh>.py
```

Neověřené úlohy se v aplikaci nezobrazují.

## Nasazení

Statický web, žádné serverové části. Produkční build (`npm run build`,
výstup `dist/`) jde nasadit na jakýkoli statický hosting. Doporučený postup
je Vercel s kořenem projektu v `aplikace/app` (preset Vite, build `npm run
build`, výstup `dist`).
