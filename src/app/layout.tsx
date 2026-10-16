import type { Metadata } from "next";
import { THEME_INIT_SCRIPT } from "@/components/theme/theme";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
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
