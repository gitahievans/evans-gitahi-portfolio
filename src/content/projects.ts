export type ProjectsContent = {
  eyebrow: string;
  heading: string;
  items: {
    slug: string; title: string; href: string; summary: string;
    technologies: string[]; features: string[]; repository: string; demo: string;
  }[];
};
export const projects = {
  "eyebrow": "Browse My Recent",
  "heading": "Projects",
  "items": [
    {
      "slug": "scorelearn",
      "title": "Scorelearn",
      "href": "/projects/scorelearn/",
      "summary": "A full-stack music intelligence workspace that turns score PDFs, images, and audio into structured analysis, interactive notation, playable MIDI, and beginner-friendly explanations.",
      "technologies": [
        "Next.js",
        "Django",
        "Music21"
      ],
      "features": [
        "✓ Multi-Format Transcription",
        "✓ Music Theory Analysis",
        "✓ Notation & Playback"
      ],
      "repository": "https://github.com/gitahievans/scoreanalyzr",
      "demo": "https://scorelearn.site"
    },
    {
      "slug": "ladyshelf",
      "title": "LadyShelf",
      "href": "/projects/ladyshelf/",
      "summary": "A fashion commerce platform with a polished storefront, customer accounts, wishlist and cart flows, checkout workflows, and a custom admin system for catalog and order management.",
      "technologies": [
        "Next.js",
        "Django",
        "Supabase"
      ],
      "features": [
        "✓ Product Catalog",
        "✓ Checkout & Orders",
        "✓ Admin Dashboard"
      ],
      "repository": "https://github.com/gitahievans/ladyshelf",
      "demo": "https://ladyshelf.site"
    },
    {
      "slug": "sceneit",
      "title": "SceneIt",
      "href": "/projects/sceneit/",
      "summary": "A movie discovery app with trending titles, genre browsing, protected auth flows, and personalized recommendations powered by TMDB, Supabase, and AI-assisted discovery.",
      "technologies": [
        "Next.js",
        "Supabase",
        "TMDB API"
      ],
      "features": [
        "✓ Personalized Recommendations",
        "✓ Supabase Authentication",
        "✓ AI Discovery"
      ],
      "repository": "https://github.com/gitahievans/SceneIt",
      "demo": "https://seen-it-aymo.vercel.app/"
    }
  ]
} satisfies ProjectsContent;
