/** Integrační kontrola produkčního buildu. Vyžaduje npm run build a Google Chrome.
 * Spuštění z kořene: node scripts/verify-pwa.mjs
 * Prohlížeč používá dočasný profil, uživatelských dat se nedotýká.
 */
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { preview } from '../app/node_modules/vite/dist/node/index.js';
import { chromium } from '../app/node_modules/playwright-core/index.mjs';

const root = fileURLToPath(new URL('../app/', import.meta.url));
const server = await preview({ root, preview: { host: '127.0.0.1', port: 4173, strictPort: true } });
let context;
try {
  // Běžný dočasný profil: anonymní okna instalaci PWA záměrně blokují.
  context = await chromium.launchPersistentContext('', {
    channel: 'chrome', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('heading', { name: 'Procvičování', exact: true }).waitFor();
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  const cdp = await context.newCDPSession(page);
  const manifest = await cdp.send('Page.getAppManifest');
  assert.equal(manifest.errors.length, 0, JSON.stringify(manifest.errors));
  const data = JSON.parse(manifest.data);
  assert.equal(data.display, 'standalone');
  assert.equal(data.lang, 'cs');
  assert.ok(data.icons.some((icon) => icon.purpose === 'maskable'));
  const installability = await cdp.send('Page.getInstallabilityErrors');
  assert.deepEqual(installability.installabilityErrors, []);
  const cached = await page.evaluate(async () => {
    const cachesByName = await Promise.all((await caches.keys()).map((name) => caches.open(name)));
    return (await Promise.all(cachesByName.map((cache) => cache.keys()))).flat().map((request) => request.url);
  });
  assert.ok(cached.some((url) => url.includes('index.html')));
  assert.ok(cached.some((url) => url.includes('KaTeX') && url.includes('.woff2')));
  for (const icon of data.icons) {
    const image = await page.evaluate(async (src) => {
      const img = new Image(); img.src = src; await img.decode();
      return [img.naturalWidth, img.naturalHeight];
    }, icon.src);
    assert.equal(image.join('x'), icon.sizes);
  }

  // Prohlížeč může zobrazit vlastní nabídku; aplikace událost nesmí potlačit.
  const defaultPrevented = await page.evaluate(() => {
    const event = new Event('beforeinstallprompt', { cancelable: true });
    window.dispatchEvent(event);
    return event.defaultPrevented;
  });
  assert.equal(defaultPrevented, false);
  assert.equal(await page.locator('header img').count(), 0);
  assert.equal(await page.getByText('Matematika přímo z plochy', { exact: true }).count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Nainstalovat aplikaci', exact: true }).count(), 0);
  await page.screenshot({ path: '/tmp/scio-pwa-mobile.png', fullPage: true, animations: 'disabled' });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));

  await page.getByRole('button', { name: /Mix všech okruhů/ }).click();
  await page.getByText(/Úloha 1 z 9/).waitFor();
  const firstQuestion = await page.locator('.task-statement').textContent();
  await page.getByRole('radio').nth(0).click();
  await page.getByRole('button', { name: 'Zopakovat teorii', exact: true }).click();
  await page.locator('article.teorie').waitFor();
  await page.keyboard.press('Enter'); // Skryté procvičování nesmí reagovat na klávesnici.
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('scio-matika-v1') || '{"attempts":[]}').attempts.length), 0);
  await page.getByRole('button', { name: '← Zpět', exact: true }).click();
  assert.equal(await page.locator('.task-statement').textContent(), firstQuestion);
  assert.equal(await page.getByRole('radio').nth(0).getAttribute('aria-checked'), 'true');
  await page.screenshot({ path: '/tmp/scio-mix-mobile.png', fullPage: true });

  // Osm odpovědí a přeskočení poslední úlohy: devět pokusů, devět různých okruhů.
  for (let i = 1; i <= 9; i++) {
    await page.getByText(new RegExp(`Úloha ${i} z 9`)).waitFor();
    if (i === 9) {
      await page.getByRole('button', { name: 'Přeskočit', exact: true }).click();
    } else {
      await page.getByRole('radio').nth(0).click();
      await page.keyboard.press('Enter');
      if (await page.getByText('Proč to nevyšlo?', { exact: true }).isVisible()) {
        await page.getByRole('button', { name: /Neznalost látky/ }).click();
      }
      await page.getByRole('heading', { name: 'Postup řešení', exact: true }).waitFor();
      await page.keyboard.press('Enter');
    }
  }
  await page.getByRole('heading', { name: 'Sada dokončena', exact: true }).waitFor();
  const attempts = await page.evaluate(() => JSON.parse(localStorage.getItem('scio-matika-v1')).attempts);
  assert.equal(attempts.length, 9);
  assert.equal(new Set(attempts.map((attempt) => attempt.okruh)).size, 9);
  assert.equal(attempts.filter((attempt) => attempt.vynechano).length, 1);
  assert.ok(attempts.every((attempt) => !attempt.simulace));
  await page.getByRole('button', { name: 'Nová náhodná sada', exact: true }).click();
  await page.getByText(/Úloha 1 z 9/).waitFor();
  assert.equal(await page.getByRole('radio', { checked: true }).count(), 0);

  // Poslední zodpovězená úloha rovněž ukončí sadu; začátek další neresetuje statistiky.
  for (let i = 1; i <= 8; i++) {
    await page.getByRole('button', { name: 'Přeskočit', exact: true }).click();
  }
  await page.getByText(/Úloha 9 z 9/).waitFor();
  await page.getByRole('radio').nth(0).click();
  await page.getByRole('button', { name: 'Potvrdit ↵', exact: true }).click();
  if (await page.getByText('Proč to nevyšlo?', { exact: true }).isVisible()) {
    await page.getByRole('button', { name: /Neznalost látky/ }).click();
  }
  await page.getByRole('button', { name: 'Dokončit sadu ↵', exact: true }).click();
  await page.getByRole('heading', { name: 'Sada dokončena', exact: true }).waitFor();

  await context.setOffline(true);
  await page.reload();
  await page.getByRole('heading', { name: 'Procvičování', exact: true }).waitFor();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('scio-matika-v1')).attempts);
  assert.equal(saved.length, 18);
  await page.getByRole('button', { name: /Mix všech okruhů/ }).click();
  await page.getByRole('radio').nth(0).waitFor();
  await page.getByRole('button', { name: 'Zopakovat teorii', exact: true }).click();
  await page.locator('article.teorie').waitFor();
  assert.equal(await page.locator('.katex-error').count(), 0);
  await page.getByRole('button', { name: '← Zpět', exact: true }).click();
  await page.getByRole('button', { name: '← Zpět', exact: true }).click();
  await page.getByRole('button', { name: 'Tmavý', exact: true }).click();
  await page.screenshot({ path: '/tmp/scio-pwa-dark.png', fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 320, height: 740 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  assert.deepEqual(errors, []);
  console.log('PASS: 9 okruhů, obě cesty dokončení sady, návrat z teorie, statistiky, instalovatelnost, ikony, mobilní rozložení a reload + teorie offline.');
} finally {
  await context?.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
