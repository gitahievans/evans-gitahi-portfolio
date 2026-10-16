export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const THEME_STORAGE_KEY = "evans-portfolio-theme-v1";
const THEME_CHANGE_EVENT = "portfolio-theme-change";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

export function parseThemePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function resolveTheme(
  preference: ThemePreference,
  systemIsDark: boolean,
): ResolvedTheme {
  return preference === "system" ? (systemIsDark ? "dark" : "light") : preference;
}

// Kept synchronous in <head> so CSS sees the resolved preference before paint.
// No user content is interpolated. Tests execute this exact script as emitted.
export const THEME_INIT_SCRIPT = `(() => {
  let preference = "system";
  try {
    const stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (stored === "light" || stored === "dark") preference = stored;
  } catch {}
  const dark = window.matchMedia(${JSON.stringify(SYSTEM_QUERY)}).matches;
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = preference === "system" ? (dark ? "dark" : "light") : preference;
})();`;

function applyPreference(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = resolveTheme(preference, window.matchMedia(SYSTEM_QUERY).matches);
}

export function getThemeSnapshot(): ThemePreference {
  return parseThemePreference(document.documentElement.dataset.themePreference ?? null);
}

// The server and first hydration pass render the same disabled System control.
export function getServerThemeSnapshot(): null {
  return null;
}

export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Still apply the explicit choice for this page if storage is unavailable.
  }
  applyPreference(preference);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia(SYSTEM_QUERY);
  const onSystemChange = () => {
    if (getThemeSnapshot() === "system") applyPreference("system");
  };
  const onStorage = (event: StorageEvent) => {
    try {
      if (event.storageArea !== localStorage) return;
    } catch {
      return;
    }
    if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
    applyPreference(parseThemePreference(event.newValue));
    onChange();
  };

  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  // Covers a system change between the head script and hydration.
  onSystemChange();

  return () => {
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}
