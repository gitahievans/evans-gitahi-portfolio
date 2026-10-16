export type CaseStudy = {
  slug: string; title: string; description: string; eyebrow: string; lede: string;
  meta: { label: string; value: string }[];
  actions: { label: string; href: string }[];
  image: { src: string; alt: string; width: number; height: number };
  brief: string; facts: { label: string; value: string }[];
  boundary: string; flowLabel: string;
  flow: { number: string; title: string; body: string }[];
  decisions: { kicker: string; title: string; body: string; impactLabel: string; impact: string }[];
  panelsHeading: string; panels: { number: string; title: string; body: string }[];
  readinessHeading: string; readinessLabel: string; readinessHeaders: string[];
  readiness: { concern: string; evidence: string; boundary: string }[];
  note: string; demonstrates: string[]; tags: string[];
  related: { label: string; slug: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    "slug": "scorelearn",
    "title": "Scorelearn",
    "description": "Scorelearn engineering case study by Evans Gitahi: multi-format music transcription, asynchronous processing, symbolic score normalization, music theory analysis, notation, and MIDI playback.",
    "eyebrow": "Music intelligence pipeline case study",
    "lede": "I built a full-stack workflow that turns sheet-music PDFs, score images, and recorded audio into one analyzable score model, then makes the result visible, playable, downloadable, and easier to understand.",
    "meta": [
      {
        "label": "Role",
        "value": "System design, full-stack implementation, and deployment"
      },
      {
        "label": "Stack",
        "value": "Next.js, TypeScript, Django REST, Celery, PostgreSQL, Redis, Music21"
      },
      {
        "label": "Core constraint",
        "value": "Unify noisy visual and audio inputs without hiding transcription uncertainty"
      },
      {
        "label": "Delivery state",
        "value": "Live product with active transcription-quality and hardening work"
      }
    ],
    "actions": [
      {
        "label": "Live Demo",
        "href": "https://scorelearn.site"
      },
      {
        "label": "Frontend Repo",
        "href": "https://github.com/gitahievans/scoreanalyzr"
      },
      {
        "label": "Backend Repo",
        "href": "https://github.com/gitahievans/nota_db"
      }
    ],
    "image": {
      "src": "/images/scorelearn-interface.webp",
      "alt": "Scorelearn score upload and analysis interface",
      "width": 1600,
      "height": 866
    },
    "brief": "Scorelearn treats score analysis as a pipeline, not a single AI request. It first converts different media into symbolic music, repairs that intermediate representation, derives inspectable music-theory facts, and only then uses generation to explain those facts to a learner.",
    "facts": [
      {
        "label": "Inputs",
        "value": "PDF, JPEG, PNG, TIFF, WebP, MP3, WAV, and M4A"
      },
      {
        "label": "Outputs",
        "value": "Structured analysis, MusicXML, MIDI, notation, playback, summary"
      },
      {
        "label": "Surfaces",
        "value": "Upload, live job progress, results, score viewer, player"
      }
    ],
    "boundary": "The browser owns interaction and visualization, while Django owns validation and the score record. Heavy recognition and analysis leave the request cycle entirely: Celery workers branch by source type, converge on MusicXML, and persist both structured results and artifact endpoints for the frontend.",
    "flowLabel": "Scorelearn processing flow",
    "flow": [
      {
        "number": "01",
        "title": "Next.js workspace",
        "body": "Upload, task polling, results, notation, playback"
      },
      {
        "number": "02",
        "title": "Django REST API",
        "body": "File validation, records, task dispatch, artifact delivery"
      },
      {
        "number": "03",
        "title": "Celery pipeline",
        "body": "Audiveris OMR or Basic Pitch audio transcription"
      },
      {
        "number": "04",
        "title": "Symbolic core",
        "body": "Normalization, Music21 analysis, MusicXML and MIDI"
      }
    ],
    "decisions": [
      {
        "kicker": "Decision 01 / Architecture",
        "title": "Converge every source on a symbolic score",
        "body": "PDFs and images pass through Audiveris optical music recognition; audio passes through Basic Pitch to produce MIDI. Both branches become MusicXML before the rest of the product analyzes or presents them.",
        "impactLabel": "Why it matters:",
        "impact": "analysis, notation, playback, and downloads share one downstream contract instead of duplicating logic for every input type."
      },
      {
        "kicker": "Decision 02 / Responsiveness",
        "title": "Model long-running work as an observable job",
        "body": "Uploads dispatch a Celery task through Redis. The worker publishes named stages and progress percentages, while React Query polls the score endpoint and stops only at a terminal state.",
        "impactLabel": "Why it matters:",
        "impact": "expensive recognition never holds an HTTP request open, and a failed validation, transcription, cleanup, or analysis stage remains visible to the user."
      },
      {
        "kicker": "Decision 03 / Data quality",
        "title": "Repair the transcription before trusting its analysis",
        "body": "The normalization pass quantizes timing and duration, removes duplicate or overlapping note events, limits implausibly dense onsets, selects a clef, and can split piano-range material into two staves.",
        "impactLabel": "Tradeoff:",
        "impact": "cleanup can simplify nuance, but it produces a more stable draft for theory analysis and playback. The interface labels audio transcriptions as drafts rather than polished engraving."
      },
      {
        "kicker": "Decision 04 / AI boundary",
        "title": "Derive musical facts before generating an explanation",
        "body": "Music21 detects key, meter, tempo, parts, instrumentation, chords, measures, dynamics, accidentals, and articulations. Gemini receives those results afterward to create a concise, beginner-focused explanation.",
        "impactLabel": "Why it matters:",
        "impact": "generative text explains an inspectable analysis payload; it is not asked to infer the score directly from an opaque upload."
      }
    ],
    "panelsHeading": "Learning workspace",
    "panels": [
      {
        "number": "01",
        "title": "Inspect the score",
        "body": "OpenSheetMusicDisplay renders the generated MusicXML with responsive zoom and pan, and users can download the symbolic score for work in other notation tools."
      },
      {
        "number": "02",
        "title": "Hear the result",
        "body": "A Tone.js MIDI player exposes transport, progress, tempo, volume, and instrument controls. Audio uploads keep the source recording available beside the generated score playback."
      },
      {
        "number": "03",
        "title": "Understand the theory",
        "body": "Results separate primary signatures from structure and performance details, then add an on-demand explanation aimed at learners who may not yet know the terminology."
      }
    ],
    "readinessHeading": "Production lens",
    "readinessLabel": "Scorelearn production readiness",
    "readinessHeaders": [
      "Concern",
      "Current evidence",
      "Boundary"
    ],
    "readiness": [
      {
        "concern": "Frontend",
        "evidence": "Next.js deployed through OpenNext on Cloudflare with a custom domain",
        "boundary": "Live"
      },
      {
        "concern": "Runtime",
        "evidence": "Containerized Django, Celery, PostgreSQL, Redis, and Caddy services with health checks",
        "boundary": "Operational topology"
      },
      {
        "concern": "Input safety",
        "evidence": "Extension and MIME allow-lists, explicit source types, file-size checks, isolated job workspaces",
        "boundary": "Implemented"
      },
      {
        "concern": "Lifecycle",
        "evidence": "Per-job temporary artifacts and delayed cleanup after processing",
        "boundary": "Retention depends on artifact access needs"
      },
      {
        "concern": "Accuracy",
        "evidence": "Cleanup metadata, draft labels, stage-specific failures, guidance for unsuitable audio",
        "boundary": "Benchmark against a representative score corpus"
      },
      {
        "concern": "Operations",
        "evidence": "Structured worker stages and progress are exposed to the client",
        "boundary": "Add service metrics, tracing, and queue alerts"
      }
    ],
    "note": "Music transcription is probabilistic: clean solo recordings and high-quality scans work better than dense mixes or damaged scores. The product communicates that boundary and presents generated notation as an editable draft, while the next hardening step is measuring accuracy across a representative test corpus.",
    "demonstrates": [
      "Designing a heterogeneous media pipeline around a stable symbolic intermediate representation.",
      "Moving CPU-heavy recognition into asynchronous workers with explicit progress, failure, and cleanup states.",
      "Combining deterministic music analysis with a deliberately narrow generative explanation layer.",
      "Building one responsive workspace across upload, analysis, score rendering, audio, MIDI, and downloadable artifacts."
    ],
    "tags": [
      "Next.js",
      "TypeScript",
      "Django REST Framework",
      "Celery",
      "PostgreSQL",
      "Redis",
      "Audiveris",
      "Basic Pitch",
      "Music21",
      "MusicXML",
      "OpenSheetMusicDisplay",
      "Tone.js",
      "Cloudflare",
      "Docker"
    ],
    "related": [
      {
        "label": "Next Case Study: LadyShelf",
        "slug": "ladyshelf"
      }
    ]
  },
  {
    "slug": "ladyshelf",
    "title": "LadyShelf",
    "description": "LadyShelf engineering case study by Evans Gitahi: transactional commerce, payment reliability, authorization, production deployment, and operational design.",
    "eyebrow": "Production commerce case study",
    "lede": "I designed a commerce system that treats inventory, money, identity, and operations as correctness problems, not just screens to build.",
    "meta": [
      {
        "label": "Role",
        "value": "System design, full-stack delivery, and production operations"
      },
      {
        "label": "Stack",
        "value": "Next.js, TypeScript, Django REST Framework, Supabase, PostgreSQL"
      },
      {
        "label": "Core constraint",
        "value": "Never trust browser prices, stock, identity, or payment state"
      },
      {
        "label": "Delivery state",
        "value": "Live backend; final auth and owner workflow verification tracked openly"
      }
    ],
    "actions": [
      {
        "label": "Live Demo",
        "href": "https://ladyshelf.site"
      },
      {
        "label": "Github",
        "href": "https://github.com/gitahievans/ladyshelf"
      }
    ],
    "image": {
      "src": "/images/ladyshelf-interface.webp",
      "alt": "LadyShelf fashion commerce storefront interface",
      "width": 1600,
      "height": 829
    },
    "brief": "The goal was not merely to complete a checkout. It was to preserve business invariants when two customers want the last item, a payment callback arrives twice, an external provider fails, or an operator needs to understand and recover the system.",
    "facts": [
      {
        "label": "Ownership",
        "value": "Product architecture through deployment"
      },
      {
        "label": "Surfaces",
        "value": "Customer storefront, REST API, staff portal, operations"
      },
      {
        "label": "Evidence",
        "value": "111 backend test methods, migrations, runbooks, health checks"
      }
    ],
    "boundary": "I split the product by responsibility. Next.js owns presentation and interaction; Django owns commerce rules; PostgreSQL owns durable state; Supabase supplies identity; payment and image providers remain replaceable external dependencies. That boundary prevents client state from becoming business truth.",
    "flowLabel": "LadyShelf request flow",
    "flow": [
      {
        "number": "01",
        "title": "Next.js storefront",
        "body": "Browse, cart, account, checkout, staff UI"
      },
      {
        "number": "02",
        "title": "Django REST API",
        "body": "Authorization, validation, orchestration"
      },
      {
        "number": "03",
        "title": "PostgreSQL",
        "body": "Catalog, stock, orders, payments, audit state"
      },
      {
        "number": "04",
        "title": "External services",
        "body": "Supabase identity, SasaPay, email, image generation"
      }
    ],
    "decisions": [
      {
        "kicker": "Decision 01 / Consistency",
        "title": "Re-price and reserve stock inside one database transaction",
        "body": "The API rebuilds every quote from current product and delivery data. During order creation it locks variants, checks availability again, creates the order snapshot, and decrements stock atomically.",
        "impactLabel": "Why it matters:",
        "impact": "browser prices cannot be forged, and concurrent checkouts cannot silently oversell the same variant."
      },
      {
        "kicker": "Decision 02 / Payments",
        "title": "Treat payment as a state machine, not a redirect",
        "body": "Checkout initiation reuses an existing pending transaction. Callbacks lock the payment record, verify successful transactions with the provider, tolerate duplicate delivery, and flag late payment after an order has expired.",
        "impactLabel": "Tradeoff:",
        "impact": "more domain state and tests, in exchange for traceable outcomes when networks retry or reorder events."
      },
      {
        "kicker": "Decision 03 / Identity",
        "title": "Separate authentication from the commerce profile",
        "body": "Supabase owns sessions and identity. Django validates signed tokens and hydrates a local customer keyed by the stable subject claim, while retaining ownership of addresses, orders, permissions, and business history.",
        "impactLabel": "Why it matters:",
        "impact": "the identity provider can evolve without pushing commerce rules into authentication metadata."
      },
      {
        "kicker": "Decision 04 / Operations",
        "title": "Model staff work as a first-class product surface",
        "body": "Owner and attendant roles have explicit permissions. The custom portal covers orders, manual payments, inventory, customers, staff, settings, and image review instead of making operators manipulate raw records.",
        "impactLabel": "Why it matters:",
        "impact": "operational usability and least privilege are part of system correctness."
      }
    ],
    "panelsHeading": "Failure design",
    "panels": [
      {
        "number": "01",
        "title": "Commit before side effects",
        "body": "Emails and receipts run after a successful database commit, so a notification failure cannot roll back a valid order or announce one that never persisted."
      },
      {
        "number": "02",
        "title": "Recover abandoned inventory",
        "body": "A scheduled command locks expired unpaid orders, cancels them, restores stock, and records the transition for operators."
      },
      {
        "number": "03",
        "title": "Make AI work reviewable",
        "body": "Image jobs use explicit states, row-level claiming, bounded exponential backoff, quota-aware retry timing, human approval, and rollback of partially copied assets."
      }
    ],
    "readinessHeading": "Production posture",
    "readinessLabel": "LadyShelf production readiness",
    "readinessHeaders": [
      "Concern",
      "Implemented evidence",
      "Boundary"
    ],
    "readiness": [
      {
        "concern": "Runtime",
        "evidence": "Gunicorn container, read-only filesystem, dropped capabilities, CPU and memory limits",
        "boundary": "Deployed"
      },
      {
        "concern": "Network",
        "evidence": "Cloudflare to Nginx to loopback-only API; database has no host port",
        "boundary": "Deployed"
      },
      {
        "concern": "Release",
        "evidence": "Immutable image reference, explicit migrations and roles, health-checked release script",
        "boundary": "Repeatable"
      },
      {
        "concern": "Recovery",
        "evidence": "Restricted PostgreSQL backups, retention, timers, structured logs, error email",
        "boundary": "Off-site restore drill pending"
      },
      {
        "concern": "Launch",
        "evidence": "Deployment handoff records revision, image digest, infrastructure, evidence, and risks",
        "boundary": "Auth and owner-flow verification open"
      }
    ],
    "note": "Senior engineering includes naming incomplete work. The deployment is real, but I do not describe it as fully launch-ready while Supabase token verification, owner-facing browser checks, and off-site recovery evidence remain tracked.",
    "demonstrates": [
      "Translating product flows into explicit domain invariants and transactional boundaries.",
      "Designing for concurrency, retries, partial failure, authorization, and operational recovery.",
      "Making deployment state reproducible and reviewable through scripts, health checks, environment contracts, and handoff documentation.",
      "Balancing a personal-project budget with production-minded controls, while documenting the risks that remain."
    ],
    "tags": [
      "System design",
      "Transactional commerce",
      "Django REST Framework",
      "Next.js",
      "PostgreSQL",
      "Payment workflows",
      "RBAC",
      "Docker hardening",
      "Observability",
      "Operational runbooks"
    ],
    "related": [
      {
        "label": "Next Case Study: SceneIt",
        "slug": "sceneit"
      }
    ]
  },
  {
    "slug": "sceneit",
    "title": "SceneIt",
    "description": "SceneIt engineering case study by Evans Gitahi: server-side API boundaries, deterministic recommendation planning, caching, authentication, and a production-hardening roadmap.",
    "eyebrow": "Product architecture case study",
    "lede": "I turned several volatile external services into one coherent discovery experience, with explicit boundaries for secrets, caching, personalization, and AI-generated answers.",
    "meta": [
      {
        "label": "Role",
        "value": "Product architecture and full-stack implementation"
      },
      {
        "label": "Stack",
        "value": "Next.js, React, TypeScript, Supabase, TMDB, TanStack Query"
      },
      {
        "label": "Core constraint",
        "value": "Useful public discovery without exposing provider credentials"
      },
      {
        "label": "Maturity",
        "value": "Working product prototype with a defined hardening path"
      }
    ],
    "actions": [
      {
        "label": "Live Demo",
        "href": "https://seen-it-aymo.vercel.app/"
      },
      {
        "label": "Github",
        "href": "https://github.com/gitahievans/SceneIt"
      }
    ],
    "image": {
      "src": "/images/sceneit-interface.webp",
      "alt": "SceneIt movie recommendation app interface",
      "width": 1600,
      "height": 872
    },
    "brief": "SceneIt explores a practical architecture question: how should a product combine public catalog data, authenticated preferences, natural-language discovery, and generative explanations without coupling the UI directly to every provider?",
    "facts": [
      {
        "label": "Ownership",
        "value": "Architecture, interface, integrations, and testing"
      },
      {
        "label": "Surfaces",
        "value": "Public discovery, protected personalization, AI assistant"
      },
      {
        "label": "Quality focus",
        "value": "Typed boundaries, cache policy, loading and failure states"
      }
    ],
    "boundary": "The browser talks to a stable application API rather than TMDB or Gemini directly. Next.js route handlers keep credentials server-side, allow-list upstream query parameters, normalize errors, and apply a 30-minute revalidation policy. Supabase is isolated behind SSR-aware clients and session middleware.",
    "flowLabel": "SceneIt request flow",
    "flow": [
      {
        "number": "01",
        "title": "React experience",
        "body": "Browse, search, filters, favorites, assistant"
      },
      {
        "number": "02",
        "title": "Next.js boundary",
        "body": "Validation, planning, normalization, secret custody"
      },
      {
        "number": "03",
        "title": "TMDB and Gemini",
        "body": "Catalog metadata and grounded synthesis"
      },
      {
        "number": "04",
        "title": "Supabase",
        "body": "Sessions, interests, and interaction history"
      }
    ],
    "decisions": [
      {
        "kicker": "Decision 01 / Integration",
        "title": "Build an anti-corruption layer around TMDB",
        "body": "All catalog calls pass through typed server utilities and application-owned routes. Discover requests forward only known filters, and upstream failures become consistent API responses.",
        "impactLabel": "Why it matters:",
        "impact": "credentials stay private, provider details do not leak across UI components, and the integration can evolve in one place."
      },
      {
        "kicker": "Decision 02 / Recommendation quality",
        "title": "Use a deterministic plan before generative output",
        "body": "Natural language is parsed into explicit genres, years, rating, runtime, provider, region, and mood constraints. Results are fetched, enriched, filtered again, and returned with the applied plan visible to the user.",
        "impactLabel": "Tradeoff:",
        "impact": "narrower language coverage than an unconstrained agent, but predictable recommendations that can be debugged and tested."
      },
      {
        "kicker": "Decision 03 / AI safety",
        "title": "Ground explanations in retrieved metadata and degrade gracefully",
        "body": "Recap requests first resolve the title and build context from TMDB. Gemini receives that source text with an instruction not to invent missing detail. If the model or key is unavailable, the route returns the source summary.",
        "impactLabel": "Why it matters:",
        "impact": "the useful path survives a model outage, and generated answers have an explicit evidence boundary."
      },
      {
        "kicker": "Decision 04 / Product access",
        "title": "Keep discovery public and personalization authenticated",
        "body": "Core browsing and detail routes work without an account. Middleware refreshes sessions and protects profile, favorites, and onboarding surfaces, preserving a low-friction evaluation path.",
        "impactLabel": "Why it matters:",
        "impact": "authentication supports the product instead of becoming a gate in front of its primary value."
      }
    ],
    "panelsHeading": "Performance reasoning",
    "panels": [
      {
        "number": "01",
        "title": "Layered caching",
        "body": "Next.js revalidates TMDB responses every 30 minutes, while TanStack Query deduplicates client requests and manages loading, error, and stale states."
      },
      {
        "number": "02",
        "title": "Adaptive query cost",
        "body": "Broad discovery reads one result page. Narrow prompts search deeper, then enforce constraints locally. The extra calls are spent only where precision needs them."
      },
      {
        "number": "03",
        "title": "Concurrent enrichment",
        "body": "Runtime and provider lookups run concurrently where possible, and optional enrichment failures degrade individual results rather than failing the complete response."
      }
    ],
    "readinessHeading": "Production lens",
    "readinessLabel": "SceneIt production readiness",
    "readinessHeaders": [
      "Concern",
      "Current evidence",
      "Next production step"
    ],
    "readiness": [
      {
        "concern": "Secrets",
        "evidence": "TMDB and Gemini calls are server-side",
        "boundary": "Sound boundary"
      },
      {
        "concern": "Resilience",
        "evidence": "Cache policy, normalized failures, partial enrichment, AI fallback",
        "boundary": "Add timeouts and retry budgets"
      },
      {
        "concern": "Authorization",
        "evidence": "Session middleware protects account pages; interests write verifies identity",
        "boundary": "Derive identity on every interaction API"
      },
      {
        "concern": "Data integrity",
        "evidence": "Supabase persists preferences and interactions",
        "boundary": "Enforce RLS, unique constraints, atomic upserts"
      },
      {
        "concern": "Quality",
        "evidence": "Focused UI tests cover loading, failure, pagination, and favorite behavior",
        "boundary": "Add route contracts and planner tests"
      },
      {
        "concern": "Operations",
        "evidence": "Deployable Next.js application",
        "boundary": "Add telemetry, rate limits, SLOs, and runbooks"
      }
    ],
    "note": "I intentionally present SceneIt as a product prototype, not a production system. The senior-level work is visible in the boundaries already chosen and in identifying the controls required before serving real users at scale.",
    "demonstrates": [
      "Containing third-party volatility behind typed, application-owned interfaces.",
      "Choosing deterministic, inspectable planning for recommendation correctness and using generation only where it adds value.",
      "Reasoning about cache freshness, fan-out cost, graceful degradation, and public versus authenticated product surfaces.",
      "Auditing a working prototype honestly and turning gaps into a prioritized production-hardening plan."
    ],
    "tags": [
      "Next.js App Router",
      "TypeScript",
      "API design",
      "Supabase SSR",
      "TanStack Query",
      "TMDB",
      "Grounded AI",
      "Cache strategy",
      "Testing Library",
      "Production assessment"
    ],
    "related": [
      {
        "label": "Previous Case Study: LadyShelf",
        "slug": "ladyshelf"
      }
    ]
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((project) => project.slug === slug);
}
