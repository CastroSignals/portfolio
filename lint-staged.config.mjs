// Lint-staged config — runs on the subset of staged files only.
// Pre-commit speed matters: keep this fast.

export default {
  '*.ts': ['prettier --write', 'eslint --fix'],
  '*.html': ['prettier --write', 'eslint --fix'],
  '*.{scss,css,json,md}': ['prettier --write']
};
