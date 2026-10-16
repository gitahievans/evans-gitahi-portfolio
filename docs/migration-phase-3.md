# Phase 3: homepage

Completed on `codex/nextjs-migration`, 2026-10-16. Scope: full homepage conversion, shared homepage layout, typed content, and scoped navigation behavior. Case-study routes/assets and legacy URL compatibility remain phase 4; this intermediate build is not ready for production.

## Implementation

- `src/app/page.tsx` composes Server Components for hero, about, skills, career, projects, contact, and footer. Four typed modules in `src/content/` hold the source profile, skills, career, and project summaries; `navigation.ts` defines section IDs and labels once.
- All six section IDs remain: profile, about, experience, career, projects, contact. Header/footer links, section arrows, and hero contact action use native hash anchors. Sections have accessible headings and `tabIndex=-1` for fragment/keyboard focus. The resume is available at its original public path.
- Homepage text was extracted from active HTML, excluding comments. The inactive portrait and principles were not reintroduced. Education, credentials, all three jobs and their achievements/technologies, all three project summaries/features, external destinations, statistics, and original copyright text are preserved.
- Root-level homepage headings are h1 for the name and h2 for the five following sections; skills, employers, and project titles are h3. Social links have visible names; repeated project actions have project-specific accessible names; new-tab links include `noopener noreferrer`.
- `Header` is a small Client Component; the theme selector remains the only other explicit client boundary. Sections/content stay outside the navigation boundary. Header rendering starts in the same state on server/client, and one compact labeled theme control appears in its row.
- Mobile navigation uses native details/summary, preserving access without JavaScript. Its scoped enhancement restores focus on Escape, closes on link activation, outside pointer, focus leaving the disclosure, hash changes, and desktop resize, and saves/restores the prior body overflow style. It is a nonmodal disclosure; focus is not trapped. Native expanded semantics come from summary/details rather than a second ARIA state machine.
- Native anchors own scrolling, fragment history, and browser back/forward restoration. No global anchor interception, manual history mutation, arbitrary hash selector, or competing smooth-scroll handler is installed. CSS supplies navigation offsets and follows reduced-motion changes directly.
- Active-section tracking reads the known section positions at most once per animation frame, using the source's 35% reading line. It marks the final section at document bottom even when that section is short; the hero leaves section links unmarked. Header scrolled styling starts above 16px. Subscriptions handle scroll, resize, hash changes, and pageshow; cleanup removes listeners and cancels pending frames.
- No hidden reveals, stagger sequences, number-counter animation, or reveal observer is added. Statistics are static and reading content is always present. Feedback comes from the shared short control transitions and restrained active indicators; reduced motion disables transitions/smooth scrolling.
- About remains a two-column layout above 800px. Skills/projects retain one/two/three columns, including the final card's two-column span at intermediate widths. Statistics stack through 520px; the timeline stacks through 800px; section arrows hide through 800px. Buttons stack at small widths. Layout exceptions are centralized CSS tokens, not per-section raw dimensions.
- Shared Card now supports semantic articles and a flat surface tone; homepage cards use it without hover glows/lift. About and career statistics sit directly in their sections. Semantic light/dark palettes and contrast requirements remain unchanged.

## Validation

- `npm run build`: passed; homepage and not-found remain static exports.
- `npm run lint`: passed with zero warnings. `npm run typecheck`: passed.
- `npm test`: **16 passed**. Eight new navigation cases exercise reading-line/bottom selection, frame batching/cleanup, Escape/focus return, native link defaults, focus-out behavior, outside/hash/resize/toggle closure, unmount restoration, and a disclosure already open when enhancement attaches. The original eight theme/contrast tests also pass. Navigation uses event/geometry doubles; these are not browser tests.
- Export/source comparison: **all 166 active legacy body text segments** appear in the generated homepage; every legacy anchor destination is preserved (relative paths normalized only for comparison).
- Markup checks: six labeled focusable sections; one h1, five h2, nine h3; **19 unique IDs**, **22 valid fragment links**, exactly one theme selector, and one closed native disclosure in initial HTML.
- Generated CSS includes responsive columns, about/skill/timeline templates, active states, and reduced-motion rules. Review caught a Tailwind namespace collision: a spacing token named menu took precedence over container-menu for max-width. Renaming the height token to menu-height fixed it; final output uses `max-width: var(--container-menu)` (22.5rem) independently of the viewport-based height.
- Non-browser HTTP checks: `/`, `/index.html`, resume, and **12 homepage asset URLs** return 200; unknown route returns 404. **43 asset references** across exported HTML resolve locally. The temporary loopback server was shut down afterward.
- New app output imports no legacy styles or main.js. Legacy HTML/JavaScript/styles, dependencies, lockfiles, and the initial Vite change are retained. No dependency installation or deployment occurred in this phase. Phase 2's documented development-tooling audit findings remain outstanding; no relevant dependency change justified another audit.

## Remaining scope and handoff

- The three preserved `/projects/{scorelearn,ladyshelf,sceneit}.html` destinations still return 404 in the Next export; they remain available in the retained Vite source/build. Phase 4 must create the case-study routes and static `.html` compatibility entries, then update summary links to canonical routes as appropriate. Do not treat the current homepage export as a complete site.
- When reusing Header/Footer for case studies, adapt their fragment destinations to the homepage and keep Projects current without subscribing to nonexistent homepage sections on the case-study page.
- Project screenshots, favicon, descriptive asset migration, responsive images, page metadata, and unknown project-slug behavior remain phase 4. Source cleanup and full acceptance verification remain phase 5.
- Browser rendering, native keyboard/focus behavior, smooth-scroll/history behavior, responsiveness, hydration, and theme flashes remain **unverified in a browser**, as required by the no-browser-review constraint. External destinations were preserved but not requested.

Phase 3 exit criteria are satisfied through source review, export inspection, builds, and non-browser checks. Stop at this phase boundary; next action is phase 4.
