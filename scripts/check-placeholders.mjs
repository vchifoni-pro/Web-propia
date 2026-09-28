/**
 * Lista todo lo marcado como pendiente antes de publicar.
 * Uso: npm run check:placeholders   (sale con código 1 si queda algo pendiente)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = 'src';
const hits = [];

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|ts|md|mjs)$/.test(name)) {
      readFileSync(p, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (/PENDIENTE|class="pending"|<span class="pending"/.test(line))
            hits.push(`${relative('.', p)}:${i + 1}  ${line.trim().slice(0, 110)}`);
        });
    }
  }
};
walk(root);

// Pendientes estructurados de los casos publicados.
const cases = readFileSync(join(root, 'data/cases.ts'), 'utf8');
const pendingBlocks = [...cases.matchAll(/client: '([^']+)'[\s\S]*?publish: (true|false)[\s\S]*?pending: \[([\s\S]*?)\]/g)];
for (const [, client, publish, list] of pendingBlocks) {
  const items = [...list.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  if (items.length) hits.push(`caso ${client}${publish === 'false' ? ' (oculto)' : ''}: ${items.join(' · ')}`);
}

// Fotografías.
const photos = (() => {
  try {
    return readdirSync(join(root, 'assets/victor'));
  } catch {
    return [];
  }
})();
for (const v of ['hero', 'about', 'cta']) {
  if (!photos.some((f) => f.startsWith(`${v}.`))) hits.push(`foto: falta src/assets/victor/${v}.(jpg|png|webp|avif)`);
}

if (hits.length) {
  console.log(`\n${hits.length} elementos pendientes antes de publicar:\n`);
  hits.forEach((h) => console.log(`  • ${h}`));
  console.log('\nDetalle en docs/02-pendiente.md\n');
  process.exit(1);
}
console.log('Sin pendientes. Lista para publicar.');
