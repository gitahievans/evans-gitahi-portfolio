import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { test, type TestContext } from "node:test";
import {
  THEME_INIT_SCRIPT,
  THEME_STORAGE_KEY,
  getServerThemeSnapshot,
  getThemeSnapshot,
  setThemePreference,
  subscribeToTheme,
} from "../src/components/theme/theme.ts";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

function environment(t: TestContext, stored: string | null, systemIsDark = false) {
  const restores: (() => void)[] = [];
  const cleanups: (() => void)[] = [];
  t.after(() => {
    for (const cleanup of cleanups) cleanup();
    for (const restore of restores) restore();
  });
  const storage = new MemoryStorage();
  if (stored !== null) storage.setItem(THEME_STORAGE_KEY, stored);
  const media = Object.assign(new EventTarget(), { matches: systemIsDark });
  const window = Object.assign(new EventTarget(), { matchMedia: () => media });
  const document = { documentElement: { dataset: {} as Record<string, string> } };
  let blocked = false;
  const context = { window, document };
  const storageDescriptor = {
    configurable: true,
    get() {
      if (blocked) throw new Error("Storage unavailable");
      return storage;
    },
  };
  Object.defineProperty(context, "localStorage", storageDescriptor);

  for (const [key, value] of Object.entries({ window, document })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    restores.push(() => {
      if (previous) Object.defineProperty(globalThis, key, previous);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", storageDescriptor);
  restores.push(() => {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else Reflect.deleteProperty(globalThis, "localStorage");
  });

  return {
    storage,
    cleanup(callback: () => void) { cleanups.push(callback); },
    root: document.documentElement,
    bootstrap() { runInNewContext(THEME_INIT_SCRIPT, context); },
    blockStorage() { blocked = true; },
    systemChange(dark: boolean) {
      media.matches = dark;
      media.dispatchEvent(new Event("change"));
    },
    storageChange(value: string | null, key: string | null = THEME_STORAGE_KEY, area: Storage = storage) {
      window.dispatchEvent(Object.assign(new Event("storage"), {
        key, newValue: value, storageArea: area,
      }));
    },
  };
}

test("initial theme applies stored choices before hydration and defaults invalid/missing choices to system", (t) => {
  const env = environment(t, null);
  for (const stored of [null, "system", "light", "dark", "broken", "<script>"]) {
    for (const dark of [false, true]) {
      if (stored === null) env.storage.clear();
      else env.storage.setItem(THEME_STORAGE_KEY, stored);
      env.systemChange(dark);
      env.bootstrap();
      const preference = stored === "light" || stored === "dark" ? stored : "system";
      assert.equal(env.root.dataset.themePreference, preference);
      assert.equal(env.root.dataset.theme, preference === "system" ? (dark ? "dark" : "light") : preference);
    }
  }
  assert.equal(getServerThemeSnapshot(), null);
});

test("system changes follow system mode; explicit choices persist and ignore system changes", (t) => {
  const env = environment(t, null);
  env.bootstrap();
  let notifications = 0;
  const unsubscribe = subscribeToTheme(() => { notifications += 1; });
  env.cleanup(unsubscribe);
  env.systemChange(true);
  assert.equal(env.root.dataset.theme, "dark");
  setThemePreference("light");
  assert.equal(env.storage.getItem(THEME_STORAGE_KEY), "light");
  assert.equal(getThemeSnapshot(), "light");
  env.systemChange(false);
  env.systemChange(true);
  assert.equal(env.root.dataset.theme, "light");
  setThemePreference("dark");
  assert.equal(env.storage.getItem(THEME_STORAGE_KEY), "dark");
  env.systemChange(false);
  assert.equal(env.root.dataset.theme, "dark");
  setThemePreference("system");
  assert.equal(env.storage.getItem(THEME_STORAGE_KEY), null);
  assert.equal(env.root.dataset.theme, "light");
  assert.equal(getThemeSnapshot(), "system");
  assert.equal(notifications, 3);
});

test("returning visits restore the last choice from durable storage before hydration", (t) => {
  const env = environment(t, null);
  env.bootstrap();
  for (const preference of ["dark", "light", "system"] as const) {
    setThemePreference(preference);
    env.systemChange(true);
    // A fresh document discards page state but retains the origin's saved storage.
    delete env.root.dataset.theme;
    delete env.root.dataset.themePreference;
    env.bootstrap();
    assert.equal(getThemeSnapshot(), preference);
    assert.equal(env.root.dataset.theme, preference === "light" ? "light" : "dark");
  }
});

test("system changes between the head script and subscription are reconciled", (t) => {
  const env = environment(t, null);
  env.bootstrap();
  env.systemChange(true);
  assert.equal(env.root.dataset.theme, "light");
  const unsubscribe = subscribeToTheme(() => {});
  env.cleanup(unsubscribe);
  assert.equal(env.root.dataset.theme, "dark");
});

test("storage changes synchronize tabs, including clear and invalid values; unrelated storage is ignored", (t) => {
  const env = environment(t, "light", true);
  env.bootstrap();
  let notifications = 0;
  const unsubscribe = subscribeToTheme(() => { notifications += 1; });
  env.cleanup(unsubscribe);
  env.storageChange("dark");
  assert.equal(getThemeSnapshot(), "dark");
  env.storageChange("light", "another-key");
  env.storageChange("light", THEME_STORAGE_KEY, new MemoryStorage());
  assert.equal(getThemeSnapshot(), "dark");
  assert.equal(notifications, 1);
  env.storageChange("invalid");
  assert.equal(getThemeSnapshot(), "system");
  env.storageChange("light");
  assert.equal(env.root.dataset.theme, "light");
  env.storageChange(null, null);
  assert.equal(getThemeSnapshot(), "system");
  assert.equal(env.root.dataset.theme, "dark");
});

test("blocked storage keeps system initialization and in-memory explicit choices usable", (t) => {
  const env = environment(t, null, true);
  env.blockStorage();
  env.bootstrap();
  assert.equal(env.root.dataset.theme, "dark");
  const unsubscribe = subscribeToTheme(() => {});
  env.cleanup(unsubscribe);
  setThemePreference("light");
  assert.equal(env.root.dataset.theme, "light");
  assert.equal(getThemeSnapshot(), "light");
  env.storageChange("dark");
  assert.equal(env.root.dataset.theme, "light");
  setThemePreference("system");
  assert.equal(env.root.dataset.theme, "dark");
});

test("unsubscribe removes media, storage, and same-tab subscriptions", (t) => {
  const env = environment(t, null);
  env.bootstrap();
  let notifications = 0;
  const unsubscribe = subscribeToTheme(() => { notifications += 1; });
  unsubscribe();
  env.systemChange(true);
  assert.equal(env.root.dataset.theme, "light");
  env.storageChange("dark");
  assert.equal(getThemeSnapshot(), "system");
  setThemePreference("dark");
  assert.equal(notifications, 0);
});
