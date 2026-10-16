"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, type NavigationSection } from "@/content/navigation";
import { ThemeControl } from "@/components/theme/theme-control";
import { Container } from "./container";
import { attachMenuBehavior, subscribeToHomepageNavigation, type NavigationState } from "./navigation-behavior";

function NavigationLinks({ active, mobile = false, projectPage = false }: { active: NavigationSection | null; mobile?: boolean; projectPage?: boolean }) {
  return (
    <ul className={mobile ? "divide-y divide-border" : "flex items-center gap-5"}>
      {navigation.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`${projectPage ? "/" : ""}#${id}`}
            aria-current={active === id ? "location" : undefined}
            className={mobile
              ? "block min-h-11 rounded-control px-3 py-3 font-display text-2xl text-secondary transition-colors duration-(--duration-micro) ease-calm hover:bg-elevated hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring aria-[current=location]:bg-elevated aria-[current=location]:text-accent"
              : "inline-flex min-h-11 items-center border-b border-transparent text-sm text-secondary transition-colors duration-(--duration-micro) ease-calm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring aria-[current=location]:border-accent aria-[current=location]:text-accent"}
          >{label}</a>
        </li>
      ))}
    </ul>
  );
}

export function Header({ name, subtitle, projectPage = false }: { name: string; subtitle: string; projectPage?: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const [state, setState] = useState<NavigationState>({ active: null, scrolled: false });
  useEffect(() => {
    if (projectPage) return;
    return subscribeToHomepageNavigation((next) => {
      setState((current) => current.active === next.active && current.scrolled === next.scrolled ? current : next);
    });
  }, [projectPage]);
  useEffect(() => {
    if (!details.current || !summary.current) return;
    return attachMenuBehavior(details.current, summary.current);
  }, []);
  return (
    <header data-scrolled={state.scrolled} className="fixed inset-x-0 top-0 z-(--z-navigation) border-b border-border bg-surface/95 backdrop-blur-sm transition-shadow duration-(--duration-micro) ease-calm data-[scrolled=true]:shadow-surface">
      <Container className="flex h-nav-mobile items-center justify-between gap-3 desktop:h-nav">
        <a href={projectPage ? "/#profile" : "#profile"} className="shrink-0 rounded-control leading-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring">
          <span className="block font-display text-xl font-medium sm:text-2xl">{name}</span>
          <span className="hidden text-xs text-muted sm:block">{subtitle}</span>
        </a>
        <div className="flex items-center gap-3 desktop:gap-6">
          <nav id="desktop-nav" aria-label="Primary navigation" className="hidden desktop:block"><NavigationLinks projectPage={projectPage} active={projectPage ? "projects" : state.active} /></nav>
          <ThemeControl compact />
          <details ref={details} id="hamburger-nav" className="group desktop:hidden">
            <summary ref={summary} aria-controls="mobile-menu-links" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-control border border-border-strong bg-surface text-foreground transition-colors duration-(--duration-micro) ease-calm hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Navigation menu</span>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" className="group-open:hidden" />
                <path d="m6 6 12 12M6 18 18 6" className="hidden group-open:block" />
              </svg>
            </summary>
            <nav id="mobile-menu-links" aria-label="Mobile navigation" className="absolute top-full right-0 z-(--z-menu) max-h-menu-height w-full max-w-menu overflow-y-auto border-b border-l border-border bg-surface p-6 shadow-surface"><NavigationLinks projectPage={projectPage} active={projectPage ? "projects" : state.active} mobile /></nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
