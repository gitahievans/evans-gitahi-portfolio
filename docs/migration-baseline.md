# Phase 1: baseline and source inventory

Completed 2026-10-16. Scope: inventory and non-browser validation only. The application and dependencies are unchanged in this phase.

## Recovery and working tree

- Migration branch: `codex/nextjs-migration`, created from `main` at `4822f0c54f1c1c2f524c7567bfda4e50084345ca`.
- On entry: `vite.config.js` already had the Scorelearn build entry added; `MIGRATION_PLAN.md` was untracked. Both were preserved. No applicable `AGENTS.md` was found in the repository or its ancestor directories.
- A source archive captured all tracked and non-ignored untracked files before phase documentation was added, including both pre-existing changes. It excludes `.git`, dependencies, ignored files, and build output. No unrelated work was committed.
- Local archive: `/private/tmp/evans-portfolio-phase-1-baseline-2026-10-16.tar.gz`.
- Archive SHA-256: `7d56ac5c5e172e7b147c2c262e06180b4014e97d212d4e23f6eb9f66f579d38b`.
- Recovery: extract the archive into a separate empty directory with `tar -xzf <archive> -C <empty-directory>`; compare or copy files deliberately. The commit supplies history; the archive additionally preserves the uncommitted starting state. The archive is temporary local storage, so retain a copy before system cleanup if needed.

## Build and deployment evidence

- Environment: Node `v26.5.0`, npm `11.17.0`; installed Vite `6.0.7`.
- `npm run build` passed: 9 modules transformed, all four HTML entries emitted. No existing build failures or warnings were reported.
- Confirmed `dist/index.html`, all three `dist/projects/*.html`, and `dist/Evans_Gitahi_Resume.pdf` exist. All production HTML stylesheet, script, favicon, and image references resolve locally.
- Source check: 53 distinct per-page local references resolve, including cross-page fragment targets. HTML comments were excluded. All image dimensions were read from file metadata, without opening images.
- Existing scripts: `dev` = `vite`, `build` = `vite build`, `preview` = `vite preview`. No lint, typecheck, test, or CSS-regeneration script exists. Tailwind's generated `src/output.css` is checked in; Vite does not regenerate it.
- Both `package-lock.json` and `yarn.lock` exist; phase 2 will use npm as specified in the plan. No clean install or dependency upgrade was attempted in phase 1.
- No deployment adapter, hosting configuration, CI workflow, domain configuration, or server was found in repository files. README provides no hosting instructions. Current build is a static `dist` directory with root-relative bundled asset URLs; subdirectory hosting is not configured.
- Foundation constraint: preserve the ability to deploy as static files until hosting is established. Prefer static export for this content-only portfolio if no further hosting evidence emerges. Do not assume a Next.js server or implement server redirects yet; phase 4 must supply compatible `.html` entries when static hosting is used. Project demo hosting described in case studies is not evidence about this portfolio's host.
- Next.js/React/Tailwind versions and Node compatibility remain phase 2 decisions, to be checked against official setup documentation before installation.

## Routes and content

| Legacy entry | Target canonical route | Content source |
| --- | --- | --- |
| `/`, `/index.html` | `/` | `index.html` |
| `/projects/scorelearn.html` | `/projects/scorelearn` | `projects/scorelearn.html` |
| `/projects/ladyshelf.html` | `/projects/ladyshelf` | `projects/ladyshelf.html` |
| `/projects/sceneit.html` | `/projects/sceneit` | `projects/sceneit.html` |
| `/Evans_Gitahi_Resume.pdf` | Same path | `public/Evans_Gitahi_Resume.pdf` |

Preserve home fragments `#profile`, `#about`, `#experience`, `#career`, `#projects`, and `#contact`. “Skills” maps to `#experience`; “Experience” maps to `#career`. Project headers link to `../index.html#…`; preserve these legacy requests as well as the new canonical links. Other DOM IDs are captured in the machine-readable inventory for scoped behavior migration.

- Homepage: full-stack/DevOps hero; engineering statement; education at Moringa School and Multimedia University of Kenya; KCNA and LFS158 credentials; frontend/backend/infrastructure skill groups; Techridian (Jan 2024–Present), Cognativ (2025–Jul 2026), and YAKWETU (Aug 2023–Nov 2025); three project summaries; email/LinkedIn contact; footer. Preserve the factual copy in HTML rather than replacing it with older README copy.
- Career statistics: `3+` years, `85%` less manual deployment effort, `50%` faster shipping cycles. Retain as static text in phase 3.
- Scorelearn: full-stack music intelligence workspace, not a generic score digitization dashboard. PDF/images use Audiveris OMR; audio uses Basic Pitch; both converge on MusicXML. Django/Celery/Redis manage asynchronous work; Music21 derives theory facts; Gemini explains those facts. The UI offers job progress, OpenSheetMusicDisplay notation, Tone.js MIDI playback, and downloads. Preserve draft/accuracy limitations and unfinished hardening statements. Frontend repository is `scoreanalyzr`; backend repository is `nota_db`.
- LadyShelf: transactional fashion commerce with storefront, REST API, staff portal, payment state, stock consistency, identity, and operations; preserve the documented launch/recovery gaps.
- SceneIt: movie discovery, typed provider boundaries, deterministic recommendation planning, grounded explanations, caching, and protected personalization; preserve its prototype maturity and hardening gaps.
- Case studies share hero/metadata/actions/image, engineering brief/facts, system flow, decisions, three detail panels, readiness table, competencies, and project navigation. Scorelearn links to LadyShelf; LadyShelf links to SceneIt; SceneIt links back to LadyShelf. Preserve destinations rather than inventing a new navigation sequence.
- Each page has its own title/description and uses `me.jpg` as favicon. Resume download, hero portrait, and about-principles markup are commented out; do not mistake them for rendered content. Phase 3 should make the existing resume accessible as required by the plan.

## Links and assets

[`migration-source-inventory.json`](migration-source-inventory.json) records every active page's headings, IDs, distinct HTML references, image attributes, and every asset's byte size, image dimensions, and active referring pages. This is a baseline snapshot, not a manifest to maintain during conversion.

External destinations to preserve (recorded only; availability not checked):

- Profile: `https://www.linkedin.com/in/evans-gitahi/`, `https://github.com/gitahievans`, `mailto:evanygk@gmail.com`.
- Scorelearn: `https://scorelearn.site`, `https://github.com/gitahievans/scoreanalyzr`, `https://github.com/gitahievans/nota_db`.
- LadyShelf: `https://ladyshelf.site`, `https://github.com/gitahievans/ladyshelf`.
- SceneIt: `https://seen-it-aymo.vercel.app/`, `https://github.com/gitahievans/SceneIt` (preserve capitalization).

| Active image | Dimensions | Purpose |
| --- | --- | --- |
| `src/assets/me.jpg` | 1280 × 953 | Favicon; hero portrait is commented out |
| `src/assets/arrow.png` | 1000 × 1000 | Homepage section navigation |
| `src/assets/score.png` | 1705 × 923 | Scorelearn case-study image |
| `src/assets/ladyshelf.png` | 2936 × 1522 | LadyShelf case-study image |
| `src/assets/sceneit.png` | 1896 × 1033 | SceneIt case-study image |

Remaining images have no active HTML references: `azure-skyline.png`, `checkmark.png`, `education.png`, `email.png`, `experience.png`, `github.png`, `home shot.png`, `linkedin.png`, `renters-hub.png`, `soundleaf.png`, `transcargo.png`. `src/javascript.svg` and `public/vite.svg` are also unused by active HTML. No active CSS image URLs were found. Keep assets until phase 5 cleanup; case-study images are large (approximately 0.83/4.74/2.32 MB for Scorelearn/LadyShelf/SceneIt).

## Styling and responsive inventory

- Cascade order on all pages: generated Tailwind `output.css`, then `style.css`, then `mediaqueries.css`. Existing component rules live primarily in vanilla CSS. Canonicalization must replace overlapping CSS variables/Tailwind colors, hard-coded white/black/cream values, and opacity-based text colors.
- Current theme: near-black backgrounds (`#0d0d0d`, `#141414`, `#1e1e1e`, `#181818`), white foreground, cream `#FDFBD4`, translucent borders/shadows. No light theme, preference storage, or theme toggle exists. These are inventory values, not approved final tokens.
- Display stack: Cormorant Garamond/Georgia/serif; body: DM Sans/system sans. Google Fonts import is commented out and no font files or active loading were found, so the requested families currently fall back when absent locally.
- Shared container 1280px; fixed navigation 80px; section spacing 96px with `clamp(24px, 5vw, 80px)` horizontal padding; body minimum width 320px, line height 1.6. Large fluid serif headings, tracked uppercase eyebrows, two button styles, outlined cards/tags, timeline, project summaries, contact surface. Focus-visible outline: 2px cream with 4px offset.
- Desktop: three-column skills/projects, two-column about, three statistic columns, 160px timeline year column plus card. Case-study hero has text/image columns; narrative has heading/content columns; facts and detail panels have three columns; architecture has four.

| Source breakpoint | Behavior to translate to responsive utilities |
| --- | --- |
| `max-width: 1100px` | Mobile navigation replaces desktop; nav becomes 60px; skills/projects use two columns with last card spanning both |
| `max-width: 800px` | Sections tighten to 72–76px/24px; about/skills/projects, timeline, case hero/narrative/facts/detail panels stack; architecture uses two columns; section arrows hide; decision content shifts below its heading |
| `max-width: 520px` | Buttons fill available width; smaller typography/padding; statistics, case metadata, architecture, decisions, and readiness rows stack; readiness header hides; footer links wrap |
| `prefers-reduced-motion: reduce` | Disable smooth scrolling and effectively suppress animation/transitions; reveal content without transforms/clipping/filter |

The portrait's responsive overlays are defined but its markup is commented out. Avoid reintroducing that surface solely because rules exist. The case-study hero currently sets background and main heading color to the same `--text-primary`; this source-level readability concern should be resolved with the approved semantic theme tokens, not copied literally.

## Interaction inventory and migration requirements

`src/main.js` initializes globally on DOMContentLoaded:

- Adds scrolled header styling after 16px of scrolling.
- Mobile menu updates open classes, body scroll lock, `aria-expanded`, and button label. Escape closes and returns focus to the menu button; resize above 1100px closes it.
- Same-page hash anchors close the menu, scroll (smooth unless reduced motion), and push history; popstate restores the fragment or `#profile`. Active-section observation covers about/skills/career/projects/contact with root margin `-35% 0px -55%`, setting `aria-current`.
- Caveat: project-page menu links point to another HTML page and bypass the same-page hash handler. Carry the intended close-on-link behavior into the shared React navigation rather than preserving that limitation.
- Reveal observer: threshold 0.08, bottom root margin -10%, one-time reveal. It prepares per-group and per-project stagger delays, with progressive fallback for reduced motion, missing IntersectionObserver, or initialization failure.
- Counters use 900ms requestAnimationFrame easing. Existing motion durations are 180/320/720/1100ms; long stagger sequences and counters must be replaced under the approved calm direction.
- Inline handlers exist on the contact button and section-arrow images. Use semantic links/buttons during conversion. Social SVG links lack accessible names; heading hierarchy repeats h1 on home sections; readiness table roles need semantic review. These are source findings for phases 3–5, not fixes in this phase.
- React boundaries must clean up observers/listeners/animation frames, keep reading content visible without enhancement, retain keyboard/focus/hash behavior, and follow reduced-motion changes appropriately.

## Exit and next phase

Phase 1 exit criteria met: source inventory, route mapping, successful current build, recoverable baseline, and known deployment constraints recorded. No browser was launched, no screenshots captured, and visual/browser-runtime behavior remains unverified. External link availability and deployed host behavior remain unverified.

Next: phase 2 foundation, beginning with official dependency/Node compatibility checks and selection of a static-compatible build configuration. No production switch or deployment is authorized by this work.
