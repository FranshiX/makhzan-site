import { cp, mkdir, rm } from 'node:fs/promises';

await rm('public', { recursive: true, force: true });
await mkdir('public', { recursive: true });
await Promise.all([
  cp('assets', 'public/assets', { recursive: true }),
  cp('style.css', 'public/style.css'),
  cp('main.js', 'public/main.js'),
]);
