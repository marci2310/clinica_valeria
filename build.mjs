import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const f of ['index.html', 'styles.css', 'script.js', 'manifest.webmanifest', 'logo.svg']) await cp(f, `dist/${f}`);
await cp('public/manus-routes.json', 'dist/manus-routes.json');
console.log('Static build ready in dist/');
