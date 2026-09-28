// QA funcional: menú móvil, tabs del sistema y formulario (con endpoint simulado).
import { chromium } from 'playwright';
const base = process.env.BASE ?? 'http://localhost:4321';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ok = (c, m) => console.log(c ? 'PASS' : 'FAIL', m);

// Menú móvil
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + '/', { waitUntil: 'networkidle' });
await m.click('[data-menu-toggle]');
await m.waitForTimeout(800);
ok(await m.isVisible('#mobile-menu'), 'menú móvil se abre');
ok((await m.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true', 'aria-expanded=true');
await m.screenshot({ path: 'qa/screenshots/menu-390.png' });
await m.keyboard.press('Escape');
await m.waitForTimeout(800);
ok(!(await m.isVisible('#mobile-menu')), 'Escape cierra el menú');

// Tabs del sistema
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(base + '/', { waitUntil: 'networkidle' });
await d.focus('#gs-tab-adquisicion');
await d.keyboard.press('ArrowDown');
ok((await d.getAttribute('#gs-tab-visibilidad', 'aria-selected')) === 'true', 'flecha abajo selecciona la siguiente pestaña');
ok(await d.evaluate(() => document.activeElement?.id === 'gs-tab-visibilidad'), 'el foco sigue a la pestaña');
ok(await d.isVisible('#gs-panel-visibilidad'), 'panel visible');
await d.click('#gs-tab-datos');
await d.waitForTimeout(600);
ok(await d.isVisible('#gs-panel-datos'), 'clic cambia panel');

// Formulario
const f = await b.newPage({ viewport: { width: 390, height: 844 } });
await f.goto(base + '/contacto', { waitUntil: 'networkidle' });
await f.evaluate(() => (document.querySelector('[data-contact-form]').dataset.endpoint = 'https://example.test/form'));
let posted = null;
await f.route('https://example.test/form', async (r) => { posted = JSON.parse(r.request().postData()); await r.fulfill({ status: 200, body: '{}' }); });
await f.click('button[type=submit]');
ok((await f.textContent('[data-form-status]')).includes('Revisa'), 'envío vacío muestra resumen de errores');
ok((await f.getAttribute('#f-nombre', 'aria-invalid')) === 'true', 'campo inválido marcado con aria-invalid');
ok(await f.evaluate(() => document.activeElement?.id === 'f-nombre'), 'foco al primer error');
await f.screenshot({ path: 'qa/screenshots/form-errors-390.png', fullPage: false });
await f.fill('#f-nombre', 'Ana García');
await f.fill('#f-email', 'ana@empresa');
await f.locator('#f-email').blur();
ok((await f.textContent('#f-email ~ .field__error')).includes('email válido'), 'email mal formado');
await f.fill('#f-email', 'ana@empresa.com');
await f.fill('#f-empresa', 'Empresa SL');
await f.fill('#f-web', 'empresa.com');
await f.locator('#f-web').blur();
ok((await f.inputValue('#f-web')) === 'https://empresa.com', 'web normalizada');
await f.fill('#f-negocio', 'Tienda online de mobiliario');
await f.selectOption('#f-facturacion', { index: 2 });
await f.selectOption('#f-inversion', { index: 3 });
await f.click('.chip:has-text("Adquisición")');
await f.click('.chip:has-text("IA")');
await f.fill('#f-problema', 'Invertimos en Ads pero los leads no se convierten en ventas.');
await f.click('button[type=submit]');
await f.waitForTimeout(600);
ok(posted && posted.mejorar === 'Adquisición, IA' && posted.email === 'ana@empresa.com', 'payload enviado correcto');
ok(await f.isVisible('[data-form-success]'), 'estado de éxito visible');
ok((await f.textContent('[data-form-success] h2')).includes('Gracias, Ana'), 'éxito personalizado');
await f.screenshot({ path: 'qa/screenshots/form-success-390.png' });

// Error de red
const g = await b.newPage({ viewport: { width: 1440, height: 900 } });
await g.goto(base + '/contacto', { waitUntil: 'networkidle' });
await g.evaluate(() => (document.querySelector('[data-contact-form]').dataset.endpoint = 'https://example.test/form'));
await g.route('https://example.test/form', (r) => r.fulfill({ status: 500 }));
await g.fill('#f-nombre', 'Ana'); await g.fill('#f-email', 'a@b.com'); await g.fill('#f-empresa', 'X');
await g.fill('#f-negocio', 'Clínica'); await g.selectOption('#f-facturacion', { index: 1 }); await g.selectOption('#f-inversion', { index: 1 });
await g.click('.chip:has-text("SEO")'); await g.fill('#f-problema', 'Necesitamos más pacientes cada mes.');
await g.click('button[type=submit]'); await g.waitForTimeout(500);
ok((await g.textContent('[data-form-status]')).includes('No se ha podido enviar'), 'error de red con alternativa directa');
ok((await g.inputValue('#f-nombre')) === 'Ana', 'los datos se conservan tras el error');
await b.close();
