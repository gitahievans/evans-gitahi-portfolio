# Phase 5: verification and cleanup

Completed 2026-10-16 on `codex/nextjs-migration`. All five migration phases are complete and the static migration is ready for code review. No commit, deployment, domain change or production switch was performed.

## Final changes

- Removed Vite and its exclusive dependency subtree, legacy npm scripts/config, root/project HTML source, old JavaScript and styles, generated Tailwind CSS, the legacy Tailwind config, unused images/SVGs, old `dist/` output and redundant Yarn lockfile. The Next app now has one styling system and one npm lockfile.
- Kept original text and destinations as a focused fixture in `tests/fixtures/legacy-content.json` before deleting source. The export checker now verifies the homepage and all case studies against those expectations independently of retired HTML. This is content-preservation coverage, not a snapshot of the new implementation.
- Preserved the pre-existing Scorelearn Vite-entry change as `docs/legacy-vite-entry.patch`. Confirmed the phase 1 archive still exists and matches its documented SHA-256 before deletion; tracked original source also remains in Git history. No unrelated work was committed or reset. The temporary archive location remains documented in `migration-baseline.md`.
- Fixed a source-review finding: desktop CSS hides the mobile **details** element; the old handler checked the summary's own display value and could leave body scrolling locked after resizing. The handler now checks details, and its event/geometry test explicitly models a hidden parent while summary remains flex. Cleanup and focus behavior are unchanged.
- Added `npm run verify:http`, using a temporary loopback static server with the same Python handler as preview. It reuses export checks, requests every local target, compares legacy/canonical bodies, tests unknown routes and shuts down in `finally`. No browser is used.
- Included build scripts in strict TypeScript checking, removed obsolete lint/ignore exceptions, rewrote setup/static-host instructions, and retained older profile prose separately as `docs/profile-notes-legacy.md`.

## Source review

- **Styling/themes:** all component styling uses static Tailwind utilities and shared typed variants. Raw palette values occur only in canonical globals; body/display fonts, layout widths, breakpoints, navigation spacing, intentional grid exceptions, radius, stacking and motion are centralized. Both cream/charcoal themes and CSS system fallback cover every semantic surface. No hidden reveals, long staggers or animated counters remain.
- **Responsive layout:** mobile-first grids preserve source boundaries at 521/801/1101px. About/timeline stack, cards adapt one/two/three columns, buttons wrap/stack, and the mobile disclosure scrolls within viewport height. Case-study images retain intrinsic aspect ratios and 640/960/1600px candidates. The readiness table has a labeled focusable scroll region and native header/caption semantics. Responsive appearance remains unverified visually.
- **Semantics/keyboard:** homepage has one h1, five h2 and nine h3 headings; case studies use one h1 and ordered h2/h3 sections. Six homepage fragments are labeled/focusable; the root skip link targets main content. Links retain native history/scroll behavior, focus outlines and minimum control heights. External new-tab links retain safe rel attributes and accessible wording. Static images have descriptive alt text and dimensions.
- **Navigation:** disclosure uses native details/summary, remains usable without JavaScript and closes on activation/Escape/focus departure/outside interaction/desktop resize/hash changes. Escape returns focus and scroll styles restore. Listeners and pending frames clean up. Case studies do not subscribe to homepage section geometry. Slug lookup is exact, including rejection of object-prototype names.
- **Theme/hydration:** synchronous head initialization sets attributes before paint; the server and first client pass use the same disabled System selector. Storage/system changes and unavailable storage are tested; explicit values persist, System removes the saved value. Suppression is confined to the root attributes changed by initialization. Runtime hydration/flash behavior remains unverified in a browser.
- **Contrast:** unchanged palette tests pass WCAG AA targets across background/surface/elevated. Minimum normal text is 4.80:1 light / 6.63:1 dark; minimum control/focus is 3.85:1 / 3.80:1. Primary-button text is 7.13:1 / 14.13:1, including passing composited hover/pressed-state checks. Decorative borders are not relied on to identify controls.

## Validation after cleanup

| Check | Result |
| --- | --- |
| `npm ci --no-audit --no-fund` | Passed from updated lockfile; 353 packages installed |
| `npm run build` | Passed; Webpack production build and three legacy HTML copies |
| `npm run typecheck` | Passed, including build scripts |
| `npm run lint` | Passed, zero warnings |
| `npm test` | 16 passed, including updated resize regression and theme/contrast cases |
| `npm run verify:export` | Passed: 10 HTML files, 300 local references/fragments, all 166 homepage + 314 case-study text segments and original normalized destinations |
| `npm run verify:http` | Passed: 38 known page/asset paths return 200; all three legacy bodies equal canonical pages; five unknown routes return 404 |
| `git diff --check` | Passed |
| Production dependency audit | Zero reported vulnerabilities |

The HTTP paths cover canonical directory routes, legacy `.html` requests, homepage/index, resume, favicon, fonts, scripts/styles and all screenshot variants. Unknown checks include a missing homepage route, unknown directory/HTML project routes and `toString`/`constructor` slugs. Local process permissions were elevated for loopback checks, resolving phase 4's socket limitation. No server remains running. This tests static-file behavior, not browser JavaScript or an unspecified remote host.

## Dependency findings and limits

- Removing Vite reduced the audit from eight findings to **five high-severity development-only findings**, all in the `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob`/`micromatch`/`braces` chain. The advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), for deeply nested patterns. npm offers a downgrade to `eslint-config-next@14.2.35`, incompatible with keeping the selected current framework/lint pairing; no forced downgrade or speculative override was applied. Revisit upstream releases separately. Runtime audit is clean.
- Clean install still emits upstream ESLint 10 peer-range warnings for import/React/accessibility lint plugins. Actual lint/build pass without force or legacy-peer-deps flags. npm also reports an unapproved `unrs-resolver` postinstall under the environment's allow-scripts policy; no script approval override was needed for successful checks.
- Checks ran on available Node 26.5.0 / npm 11.17.0; `.nvmrc` and engines document Node 24+. The requested minimum was not separately executed here.
- Browser visuals, native interactions, responsive rendering, hydration and theme flashes remain explicitly unverified under the no-browser-review constraint. External destination availability was not requested.
- Hosting/provider/domain remain unspecified. Publish `out/` at the domain root, serve directory index files, and configure `404.html` as the error document **with HTTP 404 status**, without an SPA homepage fallback. Python preview returns a standard error body on unknown requests; the themed 404 file itself is emitted and verified. Confirm the eventual host's routing before production switching.

## Handoff

No migration phase remains. Changes are uncommitted and reviewable on the migration branch; production is unchanged. Future work, if requested, is review/host selection and deployment validation. Keep the historical phase reports as dated evidence; final commands, layout and limitations are in README and this report.
