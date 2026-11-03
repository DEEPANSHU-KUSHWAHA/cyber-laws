import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const api = path.join(root, 'src/app/api');
const backup = path.join(root, '.pages-api-backup');
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const basePath = repo ? `/${repo}` : '';
let moved = false;
if (fs.existsSync(api)) { fs.renameSync(api, backup); moved = true; }
try {
  const result = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, STATIC_EXPORT: '1', NEXT_PUBLIC_STATIC_EXPORT: '1', NEXT_PUBLIC_BASE_PATH: basePath },
  });
  if (result.status !== 0) process.exit(result.status || 1);
  fs.writeFileSync(path.join(root, 'out/.nojekyll'), '');
  const index = path.join(root, 'out/index.html');
  if (fs.existsSync(index)) fs.copyFileSync(index, path.join(root, 'out/404.html'));
  console.log(`GitHub Pages export ready in out/ ${basePath ? `(base path ${basePath})` : ''}`);
} finally {
  if (moved && fs.existsSync(backup)) fs.renameSync(backup, api);
}
