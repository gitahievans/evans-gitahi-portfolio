import { navigation, type NavigationSection } from "../../content/navigation.ts";

export type NavigationState = { active: NavigationSection | null; scrolled: boolean };

export function findActiveSection(
  sections: readonly { id: NavigationSection; top: number }[],
  viewportHeight: number,
  atBottom: boolean,
): NavigationSection | null {
  if (atBottom && sections.length) return sections[sections.length - 1].id;
  let active: NavigationSection | null = null;
  for (const section of sections) {
    if (section.top <= viewportHeight * 0.35) active = section.id;
  }
  return active;
}

// Native anchors own scrolling and history, including initial fragments and
// back/forward restoration. This subscription only reflects the viewport.
export function subscribeToHomepageNavigation(onChange: (state: NavigationState) => void) {
  const sections = navigation.flatMap(({ id }) => {
    const element = document.getElementById(id);
    return element ? [{ id, element }] : [];
  });
  let frame = 0;
  const update = () => {
    frame = 0;
    onChange({
      scrolled: window.scrollY > 16,
      active: findActiveSection(
        sections.map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top })),
        window.innerHeight,
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1,
      ),
    });
  };
  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("hashchange", schedule);
  window.addEventListener("pageshow", schedule);
  schedule();
  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("hashchange", schedule);
    window.removeEventListener("pageshow", schedule);
    if (frame) window.cancelAnimationFrame(frame);
  };
}

// Enhance a native disclosure; its links remain usable without hydration.
// It is nonmodal: Tab can leave it, at which point it closes.
export function attachMenuBehavior(details: HTMLDetailsElement, summary: HTMLElement) {
  let previousOverflow: string | null = null;
  const restoreScroll = () => {
    if (previousOverflow !== null) {
      document.body.style.overflow = previousOverflow;
      previousOverflow = null;
    }
  };
  const close = (restoreFocus = false) => {
    details.open = false;
    restoreScroll();
    if (restoreFocus) summary.focus();
  };
  const onToggle = () => {
    if (details.open) {
      if (previousOverflow === null) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
    } else restoreScroll();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && details.open) {
      event.preventDefault();
      close(true);
    }
  };
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element).closest?.("a[href]");
    if (anchor && details.contains(anchor)) close();
  };
  const onPointerDown = (event: PointerEvent) => {
    if (details.open && !details.contains(event.target as Node)) close();
  };
  const onFocusOut = (event: FocusEvent) => {
    if (details.open && !details.contains(event.relatedTarget as Node | null)) close();
  };
  const onResize = () => {
    // Let responsive CSS own the breakpoint; do not duplicate it in JavaScript.
    if (getComputedStyle(details).display === "none") close();
  };
  const onHashChange = () => close();
  details.addEventListener("toggle", onToggle);
  details.addEventListener("click", onClick);
  details.addEventListener("focusout", onFocusOut);
  document.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
  window.addEventListener("hashchange", onHashChange);
  onResize();
  onToggle();
  return () => {
    details.removeEventListener("toggle", onToggle);
    details.removeEventListener("click", onClick);
    details.removeEventListener("focusout", onFocusOut);
    document.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("hashchange", onHashChange);
    close();
  };
}
