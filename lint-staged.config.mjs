export default {
  '*.ts': ['prettier --write', 'eslint --fix'],
  '*.html': ['prettier --write', 'eslint --fix'],
  '*.{scss,css,json,md}': ['prettier --write']
};
