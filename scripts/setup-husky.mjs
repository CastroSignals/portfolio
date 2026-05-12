// Install git hooks into .husky/. Runs via npm `prepare`.

import { mkdirSync, writeFileSync, chmodSync } from 'node:fs';
import { join } from 'node:path';

const HUSKY_DIR = '.husky';

const hooks = {
  'pre-commit': 'npx lint-staged\n',
  'commit-msg': 'npx --no-install commitlint --edit "$1"\n'
};

mkdirSync(HUSKY_DIR, { recursive: true });

for (const [name, content] of Object.entries(hooks)) {
  const path = join(HUSKY_DIR, name);
  writeFileSync(path, content);
  try {
    chmodSync(path, 0o755);
  } catch {
    // chmod is a no-op on Windows.
  }
}
