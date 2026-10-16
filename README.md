# Evans Gitahi portfolio

Next.js App Router, TypeScript and Tailwind portfolio with light/dark/system themes, a homepage and three engineering case studies. The five-phase source migration is complete on `codex/nextjs-migration`; no production deployment has been performed. See [final verification](docs/migration-phase-5.md), [the migration plan](MIGRATION_PLAN.md) and [design-system conventions](docs/design-system.md).

## Development and checks

Use Node 24+ (`.nvmrc` selects 24) and npm. Python 3 is required for the static preview and export/HTTP checks. Build/fonts do not require a remote font provider.

```sh
npm ci
npm run dev           # Next development server
npm run build         # Static export to out/, including legacy HTML entries
npm run preview       # Serve out/ at http://127.0.0.1:3000
npm run typecheck
npm run lint
npm test
npm run verify:export # After building: files, content, fragments and markup
npm run verify:http   # Also checks production HTTP responses; needs loopback sockets
```

Production builds use Next's Webpack option because the migration environment restricted Turbopack build-worker sockets. All dependencies are pinned in `package-lock.json`; npm is the only package manager. The current lint dependency chain emits ESLint peer-range warnings during installation, but clean install and zero-warning lint pass. Five development-only audit findings remain upstream; the production dependency audit reports zero findings as of the recorded verification. See the Phase 5 report for details.

## Content and styling

- `src/app/` contains route composition, metadata, not-found output and the canonical CSS theme tokens.
- `src/content/` holds typed profile, career, skills, project summaries and full case studies. Update factual portfolio content here.
- `src/components/` contains shared primitives/layout, homepage sections, case-study rendering and scoped navigation/theme controls. Styles use semantic Tailwind utilities.
- `public/images/` contains responsive WebP screenshots and the portrait favicon. `public/fonts/` contains font licenses; pinned Fontsource packages supply self-hosted font files at build time.
- `public/Evans_Gitahi_Resume.pdf` remains the public resume download.
- `tests/fixtures/legacy-content.json` preserves original active text and normalized link expectations independently of the removed legacy HTML. Deliberate future copy/link changes should update the fixture as part of their review.

## Static hosting

Publish the contents of `out/` at the domain root. Canonical project routes are `/projects/scorelearn/`, `/projects/ladyshelf/` and `/projects/sceneit/`. The build also creates full `/projects/{slug}.html` compatibility files, with no JavaScript redirect or server rule required. `/index.html` and the original homepage section fragments remain usable. Legacy project files are generated only in the production build, so `next dev` uses the canonical routes.

The host must serve directory `index.html` files and return HTTP 404 for missing paths. Configure `404.html` as its error document while retaining the 404 status; do not enable an SPA fallback to the homepage. Python preview verifies status behavior but uses its own standard error body. No `next start`, image optimizer, API server, database or runtime secrets are needed. Vercel is configured in `vercel.json` to run `npm run build` and publish `out/`. The framework preset is explicitly Other (`framework: null`) because this Next.js app produces a complete static export, including postbuild legacy HTML copies. These file-based settings override the former Vite/dist build settings. Keep the app at the repository root and avoid an SPA fallback.

Local production HTTP checks pass. Visual rendering, native browser interactions, hydration and theme flashes remain unverified because browser review was explicitly excluded. Confirm the chosen host's routing/error-document behavior before switching production.

[Historical profile notes](docs/profile-notes-legacy.md) are retained separately; current website content comes from the typed modules above.
