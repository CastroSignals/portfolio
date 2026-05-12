# Gabriel Castro — Portfolio

Personal portfolio. Frontend engineering work from revenue dashboards used by 10+ airlines at Amadeus to logistics platforms at Zetes, plus the side projects that taught me the most.

## Live

- <https://castrosignals.github.io/> — bare domain (redirects to portfolio)
- <https://castrosignals.github.io/portfolio/> — canonical URL

## Stack

- Angular 21 — standalone components, signals, OnPush, lazy-loaded routes.
- TypeScript (strict).
- SCSS with CSS custom-property theming (dark + light, `[data-theme]` toggle).
- Tested with Vitest (unit) and Playwright + axe-core (e2e + a11y).
- Linted with ESLint flat config (`angular-eslint` + a11y rules) + Prettier.
- Conventional Commits enforced via Husky + commitlint.

## Scripts

| Command                           | What it does                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `npm start`                       | Dev server on <http://localhost:4200>                                            |
| `npm run build`                   | Production build into `dist/portfolio/browser/` (with `--base-href /portfolio/`) |
| `npm test`                        | Vitest one-shot                                                                  |
| `npm run test:watch`              | Vitest watch mode                                                                |
| `npm run lint` / `lint:fix`       | ESLint over TS + Angular templates                                               |
| `npm run format` / `format:check` | Prettier over TS/HTML/SCSS/JSON/MD                                               |
| `npm run e2e:install`             | One-time: download Playwright chromium                                           |
| `npm run e2e`                     | Playwright e2e + axe sweeps                                                      |

Pre-commit hook runs `lint-staged` (Prettier + ESLint `--fix` on staged files). Commit-msg hook enforces Conventional Commits.

## Structure

```
src/
├── app/
│   ├── components/    shared UI: hero, navbar, footer, projects-preview
│   ├── pages/         route-level views: home, projects, not-found
│   ├── services/      ProjectService — timeline + detailed projects
│   ├── app.ts
│   ├── app.routes.ts  lazy-loaded routes + wildcard 404
│   └── app.config.ts
├── styles.scss        global tokens, reset, focus rings, skip-link
├── test-setup.ts      jsdom stubs (IntersectionObserver)
└── index.html         + SPA-fallback decoder script
public/
└── 404.html           GitHub Pages SPA fallback (rafgraph/spa-github-pages)
tests/e2e/             Playwright smoke + axe sweeps
```

## Deploy

The portfolio builds with `baseHref: /portfolio/` (set in `angular.json` production config) and deploys at `https://<account>.github.io/portfolio/`. Deep-link refreshes go through `public/404.html`, which encodes the requested path as a query string and redirects to `index.html`; the inline decoder there calls `history.replaceState` to restore a clean URL before Angular bootstraps.

The bare domain `castrosignals.github.io` is served by a separate one-file redirect repo — see [castrosignals.github.io](../castrosignals.github.io/).

```bash
ng build                              # production, base-href /portfolio/
# deploy dist/portfolio/browser/ to the gh-pages branch
```

## Accessibility

WCAG 2.1 AA target. Skip-link to `#main-content`, semantic landmarks (`<header>`, `<main>`, `<footer>`), focus-visible outlines, `[data-theme]` toggle persisted via the navbar, `aria-label`s on social links. Axe-core sweeps in `tests/e2e/` flag regressions on every Playwright run.

## License

MIT — see [LICENSE](LICENSE).

## Contact

Gabriel Castro · <castrosignals@gmail.com> · [LinkedIn](https://linkedin.com/in/castrosignals) · [GitHub](https://github.com/castrosignals)
