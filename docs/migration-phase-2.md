# Phase 2: foundation

Implemented on `codex/nextjs-migration`, 2026-10-16. This phase introduces a minimal homepage and themed 404 page; full homepage content/navigation and case studies remain phases 3 and 4. Do not publish this intermediate build as the completed portfolio.

## Setup decisions

- Next.js `16.4.2`, React/React DOM `19.3.1`, Tailwind/PostCSS plugin `4.3.3`, PostCSS `8.5.30`, TypeScript `5.9.3`, ESLint `10.13.0`, and `eslint-config-next` `16.4.2` are pinned in package.json and package-lock.json. Fontsource variable packages are `5.3.0`. npm registry metadata was checked before installation.
- Next requires Node >=20.9. This project sets Node >=24 so its native TypeScript Node test runner and current lint tooling have a consistent supported baseline; `.nvmrc` selects Node 24. Checks in this session ran on the available Node `26.5.0` / npm `11.17.0`.
- Use npm. The old Yarn lockfile remains unchanged as reference until phase 5. npm install also rewrote it as a side effect; that generated change was discarded after verifying it had no pre-existing edits.
- `output: "export"` and `trailingSlash: true` produce directory-based static routes in `out/`, without requiring extension rewrites for canonical routes. No backend/server deployment is assumed. Phase 4 must add legacy `.html` entries separately. The root index and public resume already export at their original paths.
- Next Image's server optimizer is disabled for static-host compatibility. Asset migration and responsive image sizing remain phase 4.
- Local font loading uses pinned Fontsource WOFF2 files through `next/font/local`; builds need no font-provider fetch. Licenses are copied into `public/fonts/`.
- Tailwind scans only the new app/component source. The old config was renamed to `tailwind.legacy.cjs` to retain it as reference without accidental config discovery or its existing CommonJS/ESM mismatch. Existing HTML, JavaScript, CSS, assets, Vite config, and Vite dependency remain available; Next does not import them.
- ESLint uses flat Next core-web-vitals and TypeScript rules. The unchanged legacy JavaScript/configs are explicitly excluded rather than rewritten in this phase. TypeScript is strict and excludes legacy JavaScript/build output.

Official references consulted before setup:

- [Next App Router installation and Node requirements](https://nextjs.org/docs/app/getting-started/installation)
- [Next static exports and unsupported server features](https://nextjs.org/docs/app/guides/static-exports)
- [Next local font loading](https://nextjs.org/docs/app/getting-started/fonts)
- [Next ESLint flat configuration and ESLint 10 support](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Tailwind Next.js/PostCSS installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme)

## Implemented

- Root layout with local fonts, portfolio metadata, and keyboard skip link.
- Minimal Server Component homepage using the existing hero copy, contact destination, and accessible resume download. The rest of the content stays in legacy source until conversion.
- Shared container, section heading, button/link variants, icon button, cards, and badges. The themed not-found page reuses these primitives.
- Canonical cream/charcoal semantic palettes, type/layout/motion conventions, and Tailwind utilities; no vanilla component stylesheet or new UI library.
- Persisted light/dark/system preference, synchronous pre-paint initialization, hydration-stable native selector, system fallback without JavaScript, cross-tab synchronization, storage failure handling, and listener cleanup.
- New default Next scripts plus `legacy:dev`, `legacy:build`, and `legacy:preview` for the retained Vite reference. `preview` serves the static export with Python 3, not `next start`.
- Design-system conventions and contrast results documented in `design-system.md`.

## Validation and limitations

- Clean `npm ci` passed using `package-lock.json`; working-tree changes have not been committed.
- `npm test`: 8 passing non-browser tests. Six theme scenarios exercise the exact head script and live subscriptions; two contrast tests cover both palettes, all semantic reading surfaces, controls, and primary action hover/press compositing.
- `npm run typecheck`: passed (Next type generation plus strict TypeScript).
- `npm run lint`: passed with zero warnings.
- `npm run build`: passed with statically prerendered homepage and themed not-found output in `out/`. `npm run legacy:build`: passed with all four original HTML entries in `dist/`.
- Non-browser HTTP checks against a temporary loopback static server: homepage and all 11 referenced asset URLs returned 200; resume and both font licenses returned 200; an unknown path returned 404. The server was shut down after checks. Actual hosting-provider error-document configuration remains unspecified.
- Final export inspection: all 42 HTML asset references across emitted HTML variants resolve; two self-hosted WOFF2 files are present; generated CSS contains semantic light/dark tokens and excludes the old palette. The emitted head script exactly matches the tested script and precedes the body; initial selector markup is disabled System; homepage has one h1. These are file/HTTP checks, not browser hydration tests.
- Initial sandboxed Turbopack compilation stalled; it was stopped. The same build completed with native worker permissions outside that sandbox. No browser was used.
- `npm ci` reports upstream peer-range warnings for React/import/accessibility ESLint plugins that have not declared ESLint 10. Next 16.4 explicitly supports ESLint 10; the clean install and actual lint run succeed without `--force` or `--legacy-peer-deps`.
- Dependency audit: 8 development-tooling findings (7 high, 1 moderate), covering retained legacy Vite/esbuild/Rollup and Next lint's fast-glob/micromatch/braces chain. Registry's latest braces is still 3.0.3; do not downgrade Next lint to the audit's suggested old major release. Legacy tool removal is phase 5; recheck upstream lint fixes then. `npm audit --omit=dev` reports **0 vulnerabilities**.
- No visual, browser interaction, theme-flash, or browser hydration validation is claimed. No deployment, external destination checks, full homepage migration, or project-route migration was performed.

## Handoff

Phase 2 exit criteria are satisfied through builds, source review, and non-browser checks. Stop here for the requested phase boundary. Phase 3 should compose the complete homepage from the recorded HTML content, extract shared navigation/footer, mount the existing theme control once, and implement scoped menu/hash/active-section behavior. Keep legacy `.html` route compatibility and case-study conversion for phase 4, and remove legacy tooling only in phase 5.
