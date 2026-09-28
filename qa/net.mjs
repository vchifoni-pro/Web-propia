import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('response', r => r.status() >= 400 && console.log('HTTP', r.status(), r.url()));
for (const u of ['/capacidades', '/', '/contacto']) await p.goto('http://localhost:4321' + u, { waitUntil: 'networkidle' });
await b.close();
