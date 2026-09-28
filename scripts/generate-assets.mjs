/**
 * Genera los recursos estáticos derivados de la marca:
 * favicon.ico, apple-touch-icon.png, icon-512.png y og/default.png.
 * Uso: node scripts/generate-assets.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pub = resolve('public');
const executablePath = process.env.CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const font = (p) => readFileSync(resolve('node_modules', p)).toString('base64');
const geist = font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');
const mono = font('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2');
const serif = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2');

const fonts = `
@font-face{font-family:G;src:url(data:font/woff2;base64,${geist}) format('woff2');font-weight:100 900}
@font-face{font-family:M;src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:100 900}
@font-face{font-family:S;src:url(data:font/woff2;base64,${serif}) format('woff2');font-style:italic}
*{margin:0;box-sizing:border-box}`;

const og = `<html><head><style>${fonts}
body{width:1200px;height:630px;background:#0a0a09;color:#edeae3;font-family:G;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;
background-image:radial-gradient(700px 400px at 90% 0%,rgba(255,90,38,.14),transparent 70%),repeating-linear-gradient(0deg,transparent 0 39px,#1a1a17 39px 40px),repeating-linear-gradient(90deg,transparent 0 39px,#1a1a17 39px 40px)}
.top{display:flex;justify-content:space-between;align-items:center;font-family:M;font-size:20px;letter-spacing:.04em;text-transform:uppercase;color:#9e9b92}
.brand{display:flex;align-items:center;gap:16px;color:#edeae3}
.mark{width:48px;height:48px;border-radius:50%;background:#edeae3;color:#0a0a09;display:grid;place-items:center;font-weight:700;font-size:16px}
.dot{display:inline-block;width:12px;height:12px;border-radius:50%;background:#ff4f1f;margin-right:12px}
h1{font-size:92px;line-height:.95;letter-spacing:-.05em;font-weight:520;max-width:980px}
em{font-family:S;font-weight:400;color:#ff7a4a;letter-spacing:-.02em}
.foot{display:flex;gap:14px;font-family:M;font-size:18px;text-transform:uppercase;letter-spacing:.03em}
.foot span{padding:10px 16px;border:1px solid #3a3934;border-radius:999px;background:#0a0a09}
.foot span.s{background:#ff5a26;border-color:#ff5a26;color:#0a0a09}
</style></head><body>
<div class="top"><div class="brand"><span class="mark">VC</span>Victor Chifoni</div><div><span class="dot"></span>Growth Partner</div></div>
<h1>Me incorporo a tu empresa para que genere más <em>negocio.</em></h1>
<div class="foot"><span>Adquisición</span><span>Conversión</span><span>Automatización</span><span class="s">IA</span></div>
</body></html>`;

const icon = (size) => `<html><head><style>${fonts}
body{width:${size}px;height:${size}px;background:#111110;display:grid;place-items:center;position:relative;overflow:hidden}
b{font-family:M;font-weight:700;color:#f3f1ec;font-size:${size * 0.36}px;letter-spacing:-.04em}
i{position:absolute;right:${size * 0.16}px;top:${size * 0.16}px;width:${size * 0.16}px;height:${size * 0.16}px;border-radius:50%;background:#ff4f1f}
</style></head><body><b>VC</b><i></i></body></html>`;

const browser = await chromium.launch({ executablePath });
const shot = async (html, w, h, path) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ path, type: 'png' });
  await page.close();
  return buf;
};

await shot(og, 1200, 630, `${pub}/og/default.png`);
await shot(icon(180), 180, 180, `${pub}/apple-touch-icon.png`);
await shot(icon(512), 512, 512, `${pub}/icon-512.png`);
await shot(icon(192), 192, 192, `${pub}/icon-192.png`);
const png32 = await shot(icon(32), 32, 32);
await browser.close();

// ICO con una única imagen PNG de 32x32.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(`${pub}/favicon.ico`, Buffer.concat([header, png32]));
console.log('Recursos generados en public/');
