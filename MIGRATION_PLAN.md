# Portfolio migration plan

Status: all five phases complete. Final source/export/HTTP verification and remaining limits: `docs/migration-phase-5.md`. No production switch performed.
Purpose: executable handoff for LLM-assisted work. Read this file first; inspect only files relevant to the active phase.

## Outcome

Migrate this repository in place to Next.js App Router + TypeScript + Tailwind. Preserve portfolio content, dark-theme identity, responsive behavior, and existing links. Add a coordinated light theme and a centralized, documented design system. Work on a migration branch; switch production only after validation.

## Initial state (before foundation work)

- Vite + plain HTML/JavaScript; React is not installed.
- Homepage: `index.html`.
- Project pages: `projects/{sceneit,ladyshelf,scorelearn}.html`. All three are now Vite build entries; Scorelearn's missing entry was fixed before migration and its production HTML output confirmed.
- Interactions: `src/main.js` (navigation, active section, smooth scroll, reveal motion, counters).
- Styling: `src/style.css`, `src/mediaqueries.css`, `src/input.css`, generated `src/output.css`, `tailwind.config.js`.
- Existing CSS variables and Tailwind colors overlap; consolidate rather than maintain two definitions.
- Assets: `src/assets/`; resume: `public/Evans_Gitahi_Resume.pdf`.
- Both npm and Yarn lockfiles exist; standardize on npm unless repository instructions require otherwise.

## Decisions and constraints

- Keep the repository/history; create `codex/nextjs-migration` after checking branch state and local changes. Preserve unrelated work.
- Use the existing layout and content as the starting point. Apply the approved calm design direction below in both themes; avoid unrelated redesign/content changes.
- Do not open the site, capture screenshots, or perform browser-based visual/interaction reviews. Reimplement styling, responsive rules, and behavior from the existing HTML/CSS/JavaScript source. Use source review and non-browser checks; report runtime/visual behavior as unverified where applicable.
- Select compatible stable Next.js/React/Tailwind versions at implementation time; verify Node requirements and official setup guidance before installing. Record selected versions in the lockfile.
- Use App Router and TypeScript. Default to Server Components; limit client boundaries to interactive features.
- Use Tailwind utilities for component styling and responsive variants. A small global stylesheet may define tokens, base rules, and shared keyframes; do not recreate vanilla component styles or the old media-query stylesheet.
- Keep literal, statically detectable utility classes. Use typed variant maps for variants; avoid dynamically concatenated class names.
- No CMS, database, authentication, or new backend scope. Decide hosting/build mode from existing deployment requirements before implementing redirects or server-dependent features.

## Target structure

```text
src/app/layout.tsx                 # fonts, metadata, global styles, theme integration
src/app/page.tsx                   # homepage composition
src/app/projects/[slug]/page.tsx   # typed project content; validate unknown slugs
src/app/globals.css                # Tailwind entry + canonical design tokens/base/motion
src/components/ui/                # shared primitives and typed variants
src/components/layout/            # header, footer, container, section
src/components/sections/          # homepage sections
src/components/theme/             # theme provider/control, if needed
src/components/motion/            # small reusable behavior boundaries
src/content/                      # typed projects, career, skills, profile data
public/images/                    # migrated static images
docs/design-system.md             # token/component/theme conventions
```

## Design-system contract

- Canonical theme values live in `globals.css`; expose them through the selected Tailwind version's supported theme mechanism. No duplicate color palettes in configuration or components.
- Semantic colors: background, surface, elevated surface, foreground, secondary/muted foreground, accent, accent foreground, border, strong border, focus ring. Add status colors only when required.
- Define paired light/dark values by meaning. Do not copy the pale dark-mode accent into light mode without checking readability.
- Centralize font families, type scale, spacing scale, container widths, navigation height, breakpoints, radii, shadows, stacking order, durations, and easing. Use Tailwind's shared scale where sufficient; extend centrally for intentional exceptions.
- Components use semantic utilities (e.g. `bg-surface`, `text-foreground`); prohibit scattered raw color values and unexplained arbitrary dimensions. Document justified exceptions.
- Shared primitives cover buttons/links, containers, section headings, cards, badges, and icon controls. Define accessible focus, hover, active, and disabled states where applicable.
- Portfolio data stays separate from layout. Extract repeated patterns; avoid one-use abstractions and unnecessary component libraries.

## Approved visual direction: warm and calm

- Goal: welcoming, easy on the eyes, enjoyable to read and scroll; content carries the visual interest. Apply through source changes only; the no-browser-review constraint still applies.
- Light theme: nearly cream background (starting candidate `#F6F2E8`), lighter ivory surfaces, deep charcoal text, readable warm-gray secondary text, restrained olive/bronze accents.
- Dark theme: warm charcoal background (starting candidate `#171816`), gently lifted charcoal surfaces, soft ivory text instead of pure white, readable warm-gray secondary text, existing cream accent.
- Palette candidates are not final tokens. Calculate contrast before finalizing; keep all values in the canonical semantic theme definitions.
- Typography/layout: use a native system sans-serif stack for body and headings (supersedes the original serif/sans pairing); use comfortable line heights, bounded reading widths, generous section spacing, and a consistent heading hierarchy. Reduce oversized headings where they crowd content.
- Surfaces: soften borders/shadows, limit glows, reserve gradients for a signature detail such as the name. Avoid equal emphasis on every card; allow suitable sections to sit directly on the page.
- Motion: short fades, small movements, subtle consistent hover feedback. Remove animated number counters and long stagger sequences. Keep reading content immediately available and honor reduced motion.
- Reading rhythm: clear section introductions, scannable project summaries, deeper detail on project pages. Preserve factual content and destinations; avoid unnecessary copy rewrites.
- Navigation/actions: softly tinted header, restrained active indicator, refined accessible theme selector with mode icon and custom chevron; compact icon-only control on small screens. Remember the last choice across refreshes/return visits using localStorage; System follows the device. Remove the Download CV button; reserve strong button emphasis for primary actions.
- Implement these as shared token/component decisions, not scattered section-specific overrides. Document final choices in `docs/design-system.md`.

## Phases

- [x] Phase 1 — Baseline and inventory
- [x] Phase 2 — Foundation
- [x] Phase 3 — Homepage
- [x] Phase 4 — Project routes and assets
- [x] Phase 5 — Verification and cleanup

### 1. Baseline and inventory — complete

Completed 2026-10-16 on `codex/nextjs-migration`. Evidence and recovery details: `docs/migration-baseline.md`; full link/asset inventory: `docs/migration-source-inventory.json`.

- Inspect applicable repository instructions, Git state, page content, all links/assets, build commands, and hosting configuration.
- Run the current build; record existing failures separately. Inventory styling, breakpoints, and interaction logic directly from source.
- Record route mapping, including legacy `.html` URLs and homepage section IDs. Confirm Scorelearn's intended content from its source.
- Create migration branch and a recoverable baseline without committing unrelated changes.
- Exit: source inventory, build results, route mapping, and deployment constraints recorded.

### 2. Foundation — complete

Implemented 2026-10-16 on `codex/nextjs-migration`. Setup, validation, dependency limitations, and static-export decisions: `docs/migration-phase-2.md`. Canonical token/component/theme conventions: `docs/design-system.md`. Full homepage and project content remain for phases 3 and 4.

- Configure Next.js, TypeScript, Tailwind, linting, scripts, and ignore rules; retain legacy source as a reference during conversion.
- Add root layout, font loading, metadata, theme tokens, and minimal shared primitives.
- Implement light/dark/system preference with an accessible toggle and persisted explicit choice. Default to system when no choice exists; follow system changes in that state.
- Set the initial theme before paint; avoid theme flashes and hydration mismatches. Keep theme-sensitive rendering stable between server and client.
- Exit: minimal Next.js page builds; themes and primitives work in both modes.

### 3. Homepage — complete

Completed 2026-10-16 on `codex/nextjs-migration`. Content, layout/behavior decisions, source/export comparison, 16 passing tests, and HTTP evidence: `docs/migration-phase-3.md`. Case-study destinations remain pending phase 4 in the Next export.

- Convert navigation, hero, about, skills, career, projects, contact, and footer to typed React components and Tailwind utilities.
- Extract repeated content into typed data. Preserve section IDs, content, resume access, and external destinations.
- Replace DOM-wide event setup with scoped React state/effects or native browser behavior. Clean up listeners/observers/animation frames.
- Preserve menu close-on-link/Escape, focus behavior, active-section tracking, hash navigation, and reduced-motion support. Replace counters with static values and simplify reveals per the approved visual direction. Keep content visible if enhancement fails.
- Exit: existing layout and responsive rules translated from source; calm visual refinements and corresponding light/dark tokens implemented.

### 4. Project routes and assets — complete

Completed 2026-10-16 on `codex/nextjs-migration`. Three statically generated case studies, full legacy HTML compatibility entries, responsive WebP assets/favicon, shared navigation and page metadata are implemented. Source/export verification passes; local HTTP smoke checks are deferred because socket binding is restricted. Evidence: `docs/migration-phase-4.md`.

- Migrate all project pages and shared case-study patterns; statically generate known project slugs and return a proper not-found response for unknown ones.
- Move assets with descriptive names; update references. Supply image dimensions, responsive sizing, and appropriate alternative text.
- Add page-specific metadata and favicon. Preserve legacy URLs using redirects where hosting supports them; otherwise provide compatible static routes.
- Exit: internal links, legacy entries, images, external links, and resume all resolve.

### 5. Verification and cleanup — complete

Completed 2026-10-16. Legacy source/tooling/assets and redundant lockfile removed; content-preservation fixtures retained. Clean install, production build, strict typecheck, zero-warning lint, 16 tests and export/HTTP checks pass after cleanup. Source accessibility/responsive/theme review and remaining upstream development-dependency findings are documented in `docs/migration-phase-5.md`.

- Run production build, TypeScript check, and lint. Run/check the production output using the intended hosting mode.
- Review responsive utilities, theme coverage, asset paths, keyboard/focus handling, menu semantics, reduced motion, theme persistence/system behavior, and hydration-safe rendering in source.
- Check direct project requests, legacy URLs, and unknown routes through non-browser HTTP checks where supported by the hosting mode.
- Calculate contrast from theme tokens against WCAG AA targets (4.5:1 normal text; 3:1 large text and applicable controls); review heading structure and image alternatives.
- Add focused non-browser tests for extracted theme/menu/routing logic when practical; avoid snapshot-only or implementation-mirroring tests. Do not claim visual or browser-runtime validation.
- Remove Vite, legacy HTML/JavaScript/styles, generated CSS, unused assets/dependencies, and the redundant lockfile after source migration and applicable checks pass. Re-run checks after cleanup.
- Update README commands and `docs/design-system.md`; record remaining limitations and validation results.
- Exit: acceptance checklist passes; migration is reviewable before any production switch.

## Acceptance checklist

- [x] Next.js App Router + TypeScript; reproducible npm install/build.
- [x] All portfolio pages/content/assets migrated; legacy URLs and section links preserved in static output. Local static HTTP checks pass; remote hosting remains unspecified.
- [x] Light/dark/system theme persistence and initial-theme handling implemented; source/non-browser checks recorded.
- [x] Component styling uses Tailwind; tokens and reusable patterns follow the design-system contract.
- [x] Cream light theme and warm dark theme follow the approved calm visual direction; counters/long stagger sequences removed.
- [x] Responsive rules, keyboard access, reduced motion, contrast, and interactions reviewed from source; browser/visual behavior explicitly unverified.
- [x] Production build, typecheck, lint, and relevant behavioral checks pass.
- [x] Legacy build/style system removed; setup and design-system documentation complete.

## LLM execution protocol

- Complete phases in order; report concrete outcomes and blockers. Do not interpret this plan as authorization to publish/deploy.
- Inspect narrowly: start with file lists/searches, then relevant ranges. Avoid reading generated CSS, build output, lockfiles, or full assets into context.
- Batch independent reads; keep dependent edits/checks sequential. Reuse recorded findings; do not repeat successful checks without a relevant change.
- Keep changes scoped and reviewable. Update phase status/checklists only when verified; never mark untested behavior complete.
- Before ending a work session, update the compact handoff below. Record decisions once; reference paths instead of pasting source or logs.

## Handoff

- Post-migration refinement (2026-10-16): applied native system sans-serif throughout, removed unused font dependencies and hero Download CV action, restyled theme selector with icons/custom chevron and compact mobile treatment. Existing localStorage persistence retained; returning-visit regression added. Build, typecheck, zero-warning lint, 17 tests and export checks pass (10 HTML files, 286 local references). No browser opened or deployment performed.
- Active phase: none; all five migration phases complete. Branch: `codex/nextjs-migration`; changes remain uncommitted, with no deployment or production switch.
- Final evidence: `docs/migration-phase-5.md`. Clean npm install, Webpack production export, strict typecheck, zero-warning lint, 16 theme/navigation/contrast tests, export checks and loopback HTTP smoke checks pass after cleanup. Ten HTML files and 300 local references/fragments resolve; all 480 original text segments and normalized link expectations remain in `tests/fixtures/legacy-content.json`. HTTP: 38 known paths return 200, three legacy bodies match canonical pages and five unknown paths return 404.
- Cleanup: Vite/dependency subtree, old HTML/JS/CSS/generated CSS, unused assets, generated dist and Yarn lockfile removed. Pre-existing Vite edit retained as `docs/legacy-vite-entry.patch`; phase 1 archive checksum confirmed. Build scripts included in typecheck. Fixed mobile disclosure resize scroll restoration; documented design system/setup/static hosting.
- Decisions: Next.js 16.4.2 / React 19.3.1 / Tailwind 4.3.3 / TypeScript 5.9.3 / Node >=24 / npm; static directory export with full legacy HTML copies. Final host/domain remains unspecified. Review before switching production; the host needs directory indexes and a real 404 error-document configuration, without SPA fallback.
- Remaining limits: five high development-only audit findings in the upstream lint chain; production audit has zero findings. Install emits existing upstream ESLint peer warnings and an environment postinstall-policy notice, while all checks pass. Browser appearance/interactions/hydration/theme flashes remain unverified by instruction; external destination availability is unverified. Minimum Node 24 was not separately exercised (checks used Node 26.5.0). No migration implementation blocker remains.
