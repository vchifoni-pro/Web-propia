// Lista elementos que desbordan horizontalmente: node qa/overflow.mjs /ruta [ancho]
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: Number(process.argv[3] ?? 390), height: 844 } });
await p.goto('http://localhost:4321' + (process.argv[2] ?? '/'), { waitUntil: 'networkidle' });
console.log(await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 0.5 && !e.closest('.marquee,.gs__rail,.mobile-menu')).slice(0, 10).map((e) => `${e.tagName}.${e.className} → ${Math.round(e.getBoundingClientRect().right)}`)));
await b.close();
