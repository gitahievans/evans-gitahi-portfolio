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
      <select
        id={id}
        value={preference ?? "system"}
        disabled={preference === null}
        onChange={(event) => setThemePreference(parseThemePreference(event.target.value))}
        className="min-h-11 w-24 rounded-control border border-border-strong bg-surface px-2 py-2 text-sm text-foreground transition-colors duration-(--duration-micro) ease-calm hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
