import type { Metadata } from "next";
import localFont from "next/font/local";
import { THEME_INIT_SCRIPT } from "@/components/theme/theme";
import "./globals.css";

const bodyFont = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 1000",
  fallback: ["Arial", "sans-serif"],
});

const displayFont = localFont({
  src: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
  variable: "--font-cormorant",
  display: "swap",
  weight: "300 700",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  icons: { icon: { url: "/images/evans-gitahi.jpg", type: "image/jpeg" } },
  title: {
    default: "Evans Gitahi | Full-Stack Developer & DevOps Engineer",
    template: "%s | Evans Gitahi",
  },
  description: "Full-Stack Developer & DevOps Engineer building production-ready applications, delivery pipelines, and reliable containerised infrastructure.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a href="#main-content" className="fixed top-4 left-4 z-(--z-skip-link) -translate-y-32 rounded-control bg-accent px-4 py-2 text-accent-foreground focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
