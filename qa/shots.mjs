// Capturas de QA: node qa/shots.mjs [ruta...]  (requiere `npm run preview` en :4321)
import { chromium } from 'playwright';
const base = process.env.BASE ?? 'http://localhost:4321';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const sizes = (process.env.SIZES ?? '390,1440').split(',').map(Number);
const out = process.env.OUT ?? 'qa/screenshots';
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const w of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 700 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: process.env.RM ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    // content-visibility no pinta lo que está fuera del viewport: se desactiva solo para la captura completa.
    await page.addStyleTag({ content: 'main > .section{content-visibility:visible!important}' });
    // Recorrer la página para disparar reveals/contadores
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 450) { await page.mouse.wheel(0, 450); await page.waitForTimeout(110); }
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
    await page.waitForTimeout(1800);
    const name = `${out}/${(p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_/, ''))}-${w}.png`;
    await page.screenshot({ path: name, fullPage: true });
    if (process.env.PARTS) {
      const full = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = w < 700 ? 1400 : 1800;
      for (let y = 0, i = 0; y < full; y += step, i++) {
        await page.screenshot({ path: name.replace('.png', `-p${i}.png`), fullPage: true, clip: { x: 0, y, width: w, height: Math.min(step, full - y) } });
      }
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(name, overflow > 0 ? `HORIZONTAL OVERFLOW ${overflow}px` : 'ok', errors.length ? errors : '');
  }
  await ctx.close();
}
await browser.close();
