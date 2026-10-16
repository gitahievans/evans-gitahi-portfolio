import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import {
  attachMenuBehavior,
  findActiveSection,
  subscribeToHomepageNavigation,
  type NavigationState,
} from "../src/components/layout/navigation-behavior.ts";
import { navigation } from "../src/content/navigation.ts";

function event(type: string, properties: Record<string, unknown> = {}) {
  const value = new Event(type, { cancelable: true });
  for (const [key, property] of Object.entries(properties)) {
    Object.defineProperty(value, key, { value: property });
  }
  return value;
}

// Small event/geometry doubles exercise the production subscriptions without
// launching a browser or claiming native rendering/focus validation.
function environment(t: TestContext) {
  const restores: (() => void)[] = [];
  const cleanups: (() => void)[] = [];
  t.after(() => {
    for (const cleanup of cleanups) cleanup();
    for (const restore of restores) restore();
  });
  const frames = new Map<number, FrameRequestCallback>();
  let sequence = 0;
  let hidden = false;
  let focusCount = 0;
  const window = Object.assign(new EventTarget(), {
    scrollY: 0,
    innerHeight: 1000,
    requestAnimationFrame(callback: FrameRequestCallback) {
      const id = ++sequence;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id: number) { frames.delete(id); },
  });
  const document = Object.assign(new EventTarget(), {
    body: { style: { overflow: "clip" } },
    documentElement: { scrollHeight: 6000 },
    getElementById(id: string) {
      const index = navigation.findIndex((section) => section.id === id);
      return index === -1 ? null : {
        getBoundingClientRect: () => ({ top: 1200 + index * 1000 - window.scrollY }),
      };
    },
  });
  const summary = { focus() { focusCount += 1; } };
  const link = { closest: () => link };
  const details = Object.assign(new EventTarget(), {
    open: false,
    contains: (value: unknown) => value === summary || value === link || value === details,
    closest: () => null,
  });
  for (const [key, value] of Object.entries({ window, document, getComputedStyle: (element: unknown) => ({ display: element === details && hidden ? "none" : "flex" }) })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    restores.push(() => {
      if (previous) Object.defineProperty(globalThis, key, previous);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
  return {
    window, document, details, summary, link, frames,
    cleanup(callback: () => void) { cleanups.push(callback); },
    attachMenu() {
      const cleanup = attachMenuBehavior(details as unknown as HTMLDetailsElement, summary as unknown as HTMLElement);
      cleanups.push(cleanup);
      return cleanup;
    },
    open() { details.open = true; details.dispatchEvent(event("toggle")); },
    hideDisclosure() { hidden = true; },
    get focusCount() { return focusCount; },
    flush() {
      const callbacks = [...frames.values()];
      frames.clear();
      for (const callback of callbacks) callback(0);
    },
  };
}

test("active sections follow the reading line, leave the hero unmarked, and include a short final section", () => {
  assert.equal(findActiveSection([{ id: "about", top: 351 }], 1000, false), null);
  assert.equal(findActiveSection([{ id: "about", top: 350 }], 1000, false), "about");
  assert.equal(findActiveSection([
    { id: "about", top: -500 }, { id: "experience", top: 100 }, { id: "career", top: 400 },
  ], 1000, false), "experience");
  assert.equal(findActiveSection([{ id: "projects", top: -100 }, { id: "contact", top: 600 }], 1000, true), "contact");
  assert.equal(findActiveSection([], 1000, true), null);
});

test("scroll tracking batches events, reflects hash/resize/restoration changes, and cleans up pending work", (t) => {
  const env = environment(t);
  const states: NavigationState[] = [];
  const unsubscribe = subscribeToHomepageNavigation((state) => states.push(state));
  env.cleanup(unsubscribe);
  assert.equal(env.frames.size, 1);
  env.window.dispatchEvent(event("scroll"));
  env.window.dispatchEvent(event("scroll"));
  assert.equal(env.frames.size, 1);
  env.flush();
  assert.deepEqual(states.at(-1), { active: null, scrolled: false });
  env.window.scrollY = 1000;
  env.window.dispatchEvent(event("scroll"));
  env.flush();
  assert.deepEqual(states.at(-1), { active: "about", scrolled: true });
  env.window.scrollY = 2000;
  env.window.dispatchEvent(event("hashchange"));
  env.flush();
  assert.equal(states.at(-1)?.active, "experience");
  env.window.scrollY = 5000;
  env.window.dispatchEvent(event("resize"));
  env.flush();
  assert.equal(states.at(-1)?.active, "contact");
  env.window.scrollY = 0;
  env.window.dispatchEvent(event("pageshow"));
  env.flush();
  assert.deepEqual(states.at(-1), { active: null, scrolled: false });
  env.window.dispatchEvent(event("scroll"));
  unsubscribe();
  assert.equal(env.frames.size, 0);
  env.window.dispatchEvent(event("scroll"));
  env.window.dispatchEvent(event("resize"));
  env.window.dispatchEvent(event("hashchange"));
  env.window.dispatchEvent(event("pageshow"));
  assert.equal(env.frames.size, 0);
});

test("Escape closes the open menu, restores its prior scroll style and returns focus; closed Escape is ignored", (t) => {
  const env = environment(t);
  env.attachMenu();
  env.open();
  assert.equal(env.document.body.style.overflow, "hidden");
  const escape = event("keydown", { key: "Escape" });
  env.window.dispatchEvent(escape);
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  assert.equal(env.focusCount, 1);
  assert.equal(escape.defaultPrevented, true);
  const closedEscape = event("keydown", { key: "Escape" });
  env.window.dispatchEvent(closedEscape);
  assert.equal(closedEscape.defaultPrevented, false);
  assert.equal(env.focusCount, 1);
});

test("link activation closes the menu before native navigation and does not cancel the link", (t) => {
  const env = environment(t);
  env.attachMenu();
  env.open();
  const click = event("click", { target: env.link });
  env.details.dispatchEvent(click);
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  assert.equal(click.defaultPrevented, false);
  assert.equal(env.focusCount, 0);
});

test("focus can move within the disclosure; leaving it closes without stealing focus", (t) => {
  const env = environment(t);
  env.attachMenu();
  env.open();
  env.details.dispatchEvent(event("focusout", { relatedTarget: env.link }));
  assert.equal(env.details.open, true);
  env.details.dispatchEvent(event("focusout", { relatedTarget: {} }));
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  assert.equal(env.focusCount, 0);
});

test("outside pointer, hash navigation, desktop resize, and native toggle each close and restore scroll", (t) => {
  const env = environment(t);
  env.attachMenu();
  env.open();
  env.document.dispatchEvent(event("pointerdown", { target: env.link }));
  assert.equal(env.details.open, true);
  env.document.dispatchEvent(event("pointerdown", { target: {} }));
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  env.open();
  env.window.dispatchEvent(event("hashchange"));
  assert.equal(env.details.open, false);
  env.open();
  env.hideDisclosure();
  env.window.dispatchEvent(event("resize"));
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  env.open();
  env.details.open = false;
  env.details.dispatchEvent(event("toggle"));
  assert.equal(env.document.body.style.overflow, "clip");
});

test("unmount closes the menu, restores scrolling, and removes all disclosure listeners", (t) => {
  const env = environment(t);
  const detach = env.attachMenu();
  env.open();
  detach();
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
  env.open();
  env.window.dispatchEvent(event("keydown", { key: "Escape" }));
  env.window.dispatchEvent(event("hashchange"));
  env.hideDisclosure();
  env.window.dispatchEvent(event("resize"));
  env.document.dispatchEvent(event("pointerdown", { target: {} }));
  env.details.dispatchEvent(event("focusout", { relatedTarget: null }));
  env.details.dispatchEvent(event("click", { target: env.link }));
  assert.equal(env.details.open, true);
  assert.equal(env.document.body.style.overflow, "clip");
  assert.equal(env.focusCount, 0);
});

test("a disclosure opened before hydration is enhanced; a disclosure hidden by desktop CSS is closed immediately", (t) => {
  const env = environment(t);
  env.details.open = true;
  const detach = env.attachMenu();
  assert.equal(env.details.open, true);
  assert.equal(env.document.body.style.overflow, "hidden");
  detach();
  env.details.open = true;
  env.hideDisclosure();
  env.attachMenu();
  assert.equal(env.details.open, false);
  assert.equal(env.document.body.style.overflow, "clip");
});
