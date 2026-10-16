# Portfolio design system

Phases 2–5 establish these conventions for the Next.js application. The homepage and all three case studies are converted. Legacy styles/tooling are removed; historical decisions remain in the migration reports.

## Tokens and themes

`src/app/globals.css` is the canonical source. Tailwind 4 exposes semantic utilities through `@theme inline`; components must use these utilities instead of raw colors. The default Tailwind color palette is disabled. Paired light/dark definitions appear once; the no-JavaScript system fallback repeats only aliases, not palette values.

| Utility name | Role |
| --- | --- |
| `background` | Cream light page / warm charcoal dark page |
| `surface` | Ivory light surface / gently lifted charcoal dark surface |
| `elevated` | Subtle inset or interactive surface |
| `foreground` | Deep charcoal / soft ivory primary text |
| `secondary`, `muted` | Supporting text; both remain suitable for normal-size text |
| `accent`, `accent-foreground` | Restrained bronze in light mode / original cream in dark mode, with contrasting button text |
| `border` | Decorative card separators; do not rely on it to identify controls |
| `border-strong` | Visible control boundaries |
| `focus-ring` | Keyboard focus outline, 2px with a 4px offset |

Case-study readiness labels use semantic reading colors and explicit wording. No separate status palette is required. Any future status colors must be defined centrally and accompanied by text.

Contrast tests read actual CSS tokens. Across background/surface/elevated, minimum normal-text contrast is **4.80:1 light** and **6.63:1 dark**; minimum control/focus contrast is **3.85:1 light** and **3.80:1 dark**. Accent-button text is **7.13:1 light** and **14.13:1 dark**. Tests also cover the composited 95% hover and 90% pressed primary-button opacity. These calculations do not replace browser/visual review, which the migration plan prohibits.

## Typography and layout

- Body and headings: one native system sans-serif stack, defined once as `--font-system`. Apple platforms use their native system typography; other platforms use Segoe UI/Roboto/Helvetica/Arial fallbacks. No downloaded or self-hosted font is required. This supersedes the original serif/sans pairing.
- `font-body` and `font-display` both alias the shared stack. Body line height remains 1.7; headings retain centralized scale, tracking, weights, and balanced wrapping.
- Use Tailwind's standard type/spacing scales for normal text, gaps, padding, and control sizes. Intentional exceptions are centralized: `text-hero` (60–104px, 1.05 line height), `text-heading` (40–64px, 1.15), and their tracking values. The new hero is smaller than the old 132px maximum.
- `max-w-content` is 80rem; `max-w-reading` is 44rem. `Container` owns horizontal gutters (24/40/64px). Sections use `py-section-small` (72px) and `py-section` (96px). Body minimum width is 320px.
- Navigation height tokens are `nav-mobile` (60px) and `nav` (80px). The fixed header uses these heights; the compact theme selector and mobile disclosure fit its row. Scroll padding follows the corresponding height plus a 1rem reading gap. The logo subtitle is hidden at the narrowest breakpoint.
- Mobile-first breakpoints preserve the source boundaries: `sm` starts at 521px, `md` at 801px, and `desktop` at 1101px (defined in rem). Do not use Tailwind's former default `sm`/`md` meanings in new components.
- `rounded-control` is 8px and `rounded-card` is 14px. Use standard `rounded-full` for badges. `shadow-surface` uses a soft, theme-specific shadow; avoid glows and unnecessary shadows.
- Stacking tokens: `--z-navigation` 40, `--z-menu` 50, `--z-skip-link` 60. Use literal utilities such as `z-(--z-navigation)`. Motion tokens: `--duration-micro` 150ms, `--duration-reveal` 240ms, `ease-calm`. No reveals, stagger sequences or animated counters are used.
- Homepage grid exceptions are centralized as `grid-cols-about` (source 1.35/0.65 proportions with a 300px evidence minimum), `grid-cols-skill` (80px term plus flexible definition), and `grid-cols-timeline` (160px year plus flexible card). The disclosure uses `max-w-menu` (360px) and `max-h-menu-height` (viewport minus mobile navigation). Keep height/width token names distinct: Tailwind spacing values can take precedence over container tokens for sizing utilities.
- Reading content is visible by default. Smooth scrolling runs only without a reduced-motion preference; the global reduced-motion rule disables transitions and animations. No background-color transition runs during initial theme resolution.

## Shared primitives

Import directly from the relevant file; no component library is required.

| Primitive | Contract |
| --- | --- |
| `layout/Container` | Shared content width and responsive gutters; accepts normal div attributes |
| `ui/SectionHeading` | Optional eyebrow and explicit heading level (default h2); keep one h1 per page |
| `ui/Button` | Native button, default `type="button"`, typed primary/secondary/quiet variants; native disabled behavior |
| `ui/ActionLink` | Next Link with the same action variants; navigation remains a link; no simulated disabled-link state |
| `ui/IconButton` | Native button with required accessible `label`; decorative icon is hidden from assistive technology |
| `ui/Card` | Surface/flat/elevated tones, subtle border, spacing and radius; div or semantic article; a static container rather than an interactive element |
| `ui/Badge` | Small supporting label; a static span |

Action and icon controls have a minimum 44px height, visible keyboard outlines, hover/pressed states, and disabled states where applicable. Card/badge text uses semantic colors; static surfaces do not mimic buttons. Variant maps contain complete literal utility strings, never concatenated fragments such as `bg-${color}`. `className` accepts deliberate layout extensions; avoid conflicting classes that silently change primitive semantics.

`layout/Section` provides shared section spacing, a focusable fragment target, and a required heading relationship via `<id>-heading`. `ui/SectionNextLink` replaces clickable arrow images with named links and hides through 800px. Homepage cards use the flat tone; the current career role has a stronger border. Keep noninteractive cards still, and avoid adding motion to reveal reading content.

Header navigation uses native details/summary on mobile and ordinary anchors in both modes. The disclosure exposes its own expanded state and remains operable without JavaScript. The enhancement handles Escape/focus return, outside clicks, Tab leaving the disclosure, native link closure, resize, and body-scroll restoration; it does not act as a modal dialog. `aria-current="location"` marks the active section using a restrained underline/tint. Native anchors own hash scrolling/history, with CSS scroll padding and reduced-motion support.

## Theme behavior and hydration

- `theme/theme.ts` owns the preference contract: `light`, `dark`, or `system`. Storage key: `evans-portfolio-theme-v1`. Missing/invalid values use system; choosing system removes the explicit saved value. localStorage retains light/dark choices across refreshes and browser restarts on the same origin/profile until site data is cleared; blocked storage allows a page-local choice only.
- A small synchronous inline script in the root document head sets `data-theme` and `data-theme-preference` before body paint. It catches unavailable storage. Without JavaScript, CSS follows system preference and the nonfunctional selector stays disabled.
- `ThemeControl` owns theme interactivity; the shared Header owns navigation interactivity. It uses a labeled native select with System/Light/Dark options, a custom chevron and mode icon, semantic surface/border colors, hover feedback and keyboard-only focus outline and `useSyncExternalStore`; server rendering and first hydration both show disabled System. It then reflects the saved preference with matching initial System markup. Decorative mode icons update after hydration.
- `suppressHydrationWarning` is confined to `<html>`, where the pre-paint script intentionally sets two data attributes. Other markup must remain hydration-stable.
- A system change updates the palette only in system mode. Same-tab changes notify the control, cross-tab storage events synchronize choices, and all media/storage/custom-event listeners are removed on unmount. If storage fails, an explicit choice still applies for the current page.
- One compact theme control is mounted in the header (icon-only below sm, icon/text/chevron above), with its label visually hidden but still associated with the select. A client provider around the whole app is unnecessary. Keep the rest of the tree as Server Components by default.
- A future Content Security Policy must permit this initialization script via a hash or nonce. This static foundation sets no CSP, cookies, or server-only headers.

## Verification

`npm test` covers the actual pre-paint script, preference persistence/system behavior, storage failure and synchronization, subscription cleanup, palette contrast, and the menu/viewport subscriptions. `npm run typecheck`, `npm run lint`, and `npm run build` cover the app. The production export is `out/`; browser rendering, interactions, theme flashes, and hydration at runtime remain unverified. See `migration-phase-5.md` for final cleanup, production HTTP evidence and remaining dependency/browser limitations. Earlier phase reports record implementation history.

## Case studies

`projects/CaseStudy` renders typed content through shared semantic sections, definition lists, ordered flows, articles and badges. `grid-cols-study-hero` retains 0.95/1.05 proportions with a 320px image minimum above the desktop breakpoint; `grid-cols-study-section` retains 0.34/0.66 proportions with a 180px heading minimum above md. Narrow layouts stack, and screenshot aspect ratios are preserved. `min-w-table` is 32rem: readiness tables scroll inside a named, focusable region and retain native table/header semantics. Status wording uses existing secondary/foreground colors, requiring no new palette.

Screenshot variants at 640/960/1600px use a native picture source with responsive sizes. Next Image's unoptimized fallback supplies alt text and intrinsic dimensions. Both themes share the same screenshot assets. Public filenames describe their contents; original unused/legacy assets were removed in phase 5.

Header/Footer project mode targets homepage fragments; Projects stays current, and homepage viewport subscriptions do not run on case studies. Project content and shared rendering remain Server Components. Legacy production HTML entries reuse the same output and root-relative assets/links; they need no extra client redirect.

## Final source and export review

Phase 5 reviewed theme coverage, responsive utilities, reading widths, heading/section relationships, native anchors, keyboard focus/skip links, disclosure semantics, listener cleanup, reduced motion, font/image sizing and hydration-stable initial markup. The disclosure resize handler checks the computed display of the **details element**, which desktop CSS hides; checking the summary would miss this ancestor-driven hiding and could leave scrolling locked. Event/geometry doubles cover that regression without claiming native browser validation.

`npm run verify:export` compares all 480 original text segments and original normalized anchor destinations with the exported pages, checks all local references/fragments and confirms responsive/theme CSS and initial control markup. `npm run verify:http` adds loopback production-file requests and unknown-route status checks. Frozen expectations remain in `tests/fixtures/legacy-content.json`, so retired HTML is unnecessary. Python preview returns standard error bodies; production hosts should serve `404.html` with a 404 status.

## Post-migration refinements

The hero no longer renders a Download CV button; the existing public PDF remains available at its URL. Typography now uses the system stack throughout. Theme persistence was already implemented; a returning-visit regression test now reinitializes a fresh document from saved storage for light, dark, and system choices. Browser review remains excluded.
