// Installs git hook content into .husky/ so husky picks them up.
// Runs automatically via the `prepare` npm script after `npm install`.
// Workaround for an authoring constraint: the committed hook content lives here.

import { mkdirSync, writeFileSync, chmodSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const HUSKY_DIR = '.husky';

const hooks = {
  'pre-commit': 'npx lint-staged\n',
  'commit-msg': 'npx --no-install commitlint --edit "$1"\n'
};

if (!existsSync(HUSKY_DIR)) {
  mkdirSync(HUSKY_DIR, { recursive: true });
}

for (const [name, content] of Object.entries(hooks)) {
  const path = join(HUSKY_DIR, name);
  writeFileSync(path, content);
  try {
    chmodSync(path, 0o755);
  } catch {
    // chmod is a no-op on Windows; husky still runs the hook there.
  }
}

console.log('[setup-husky] Hooks installed into .husky/');
