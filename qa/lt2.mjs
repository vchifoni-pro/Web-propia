import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const variants = {
  base: '',





};
for (const [name, css] of Object.entries(variants)) {
  let tot = 0;
  for (let r = 0; r < 3; r++) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.addInitScript((css) => { window.__lt = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__lt += Math.max(0, e.duration - 50)))).observe({ type: 'longtask', buffered: true }); if (css) document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.append(s); }); }, css);
    await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(2000);
    tot += await p.evaluate(() => window.__lt);
    await ctx.close();
  }
  console.log(name.padEnd(12), Math.round(tot / 3));
}
await b.close();
