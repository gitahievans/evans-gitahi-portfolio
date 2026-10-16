"use client";

import { useId, useSyncExternalStore } from "react";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  parseThemePreference,
  setThemePreference,
  subscribeToTheme,
} from "./theme";

export function ThemeControl({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className={compact ? "sr-only" : "text-sm text-secondary"}>Theme</label>
      <div className="group relative shrink-0">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-secondary transition-colors duration-(--duration-micro) group-hover:text-accent">
          {preference === "light" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : preference === "dark" ? <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" /> : <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 21h8m-4-5v5" /></>}
        </svg>
        <select
          id={id}
          value={preference ?? "system"}
          disabled={preference === null}
          onChange={(event) => setThemePreference(parseThemePreference(event.target.value))}
          title="Color theme"
          className={`min-h-11 cursor-pointer appearance-none rounded-control border border-border-strong bg-surface py-2.5 text-sm font-medium transition-colors duration-(--duration-micro) ease-calm hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-60 ${compact ? "w-11 text-transparent sm:w-32 sm:pr-8 sm:pl-10 sm:text-foreground" : "w-32 pr-8 pl-10 text-foreground"}`}
        >
          <option value="system" className="bg-surface text-foreground">System</option>
          <option value="light" className="bg-surface text-foreground">Light</option>
          <option value="dark" className="bg-surface text-foreground">Dark</option>
        </select>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted ${compact ? "hidden sm:block" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </div>
    </div>
  );
}
