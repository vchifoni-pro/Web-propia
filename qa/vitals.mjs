// Mide LCP, CLS y TBT aproximado con CPU x4 y red "Fast 4G" simulada.
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const path of ['/', '/casos/farmacia-gambin', '/contacto']) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (1.5 * 1024 * 1024) / 8 });
  await p.addInitScript(() => {
    window.__v = { lcp: 0, cls: 0, lt: 0 };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__v.lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__v.cls += e.value))).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__v.lt += Math.max(0, e.duration - 50)))).observe({ type: 'longtask', buffered: true });
  });
  await p.goto('http://localhost:4321' + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  if (process.env.SCROLL) for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 600); await p.waitForTimeout(150); }
  const v = await p.evaluate(() => window.__v);
  console.log(path.padEnd(26), `LCP ${Math.round(v.lcp)}ms`, `CLS ${v.cls.toFixed(3)}`, `TBT~ ${Math.round(v.lt)}ms`);
  await ctx.close();
}
await b.close();
