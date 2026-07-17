document.addEventListener("DOMContentLoaded", () => {
  const desktopNav = document.querySelector("#desktop-nav");
  const mobileNav = document.querySelector("#hamburger-nav");
  const hamburgerButton = document.querySelector(".hamburger-icon");
  const mobileMenu = document.querySelector(".menu-links");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReducedMotion = reducedMotionQuery.matches;

  function setNavigationState() {
    const isScrolled = window.scrollY > 16;
    desktopNav?.classList.toggle("scrolled", isScrolled);
    mobileNav?.classList.toggle("scrolled", isScrolled);
  }

  function setMenuOpen(isOpen) {
    hamburgerButton?.classList.toggle("open", isOpen);
    mobileMenu?.classList.toggle("open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    hamburgerButton?.setAttribute("aria-expanded", String(isOpen));
    hamburgerButton?.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  }

  hamburgerButton?.addEventListener("click", () => {
    setMenuOpen(!mobileMenu?.classList.contains("open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
      setMenuOpen(false);
      hamburgerButton?.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();
      setMenuOpen(false);
      targetSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      if (window.location.hash !== targetId) history.pushState(null, "", targetId);
    });
  });

  function setMotionItems(selector, kind, startAt = 0) {
    const staggerSteps = {
      "about-card": 90,
      "skill-group": 100,
      "skill-item": 28,
      stat: 90,
      "timeline-year": 120,
      "timeline-card": 120,
      project: 90,
      "contact-option": 90,
    };
    document.querySelectorAll(selector).forEach((item, index) => {
      item.dataset.motionItem = kind;
      item.style.setProperty("--motion-order", String(startAt + index));
      item.style.setProperty(
        "--motion-stagger",
        `${(startAt + index) * (staggerSteps[kind] ?? 0)}ms`,
      );
    });
  }

  function prepareMotion() {
    setMotionItems("#about [data-motion-group='about-cards'] > div", "about-card");
    setMotionItems("#experience [data-motion-group='skills'] > .details-container", "skill-group");
    setMotionItems("#experience article", "skill-item");
    setMotionItems("#career .stat-item", "stat");
    setMotionItems("#career .timeline-year", "timeline-year");
    setMotionItems("#career .timeline-card", "timeline-card");
    setMotionItems("#projects .color-container", "project");
    setMotionItems("#contact .contact-info-container", "contact-option");

    document.querySelectorAll("#projects .color-container").forEach((project) => {
      [
        [".article-container-project", "image"],
        [".project-title", "title"],
        [".project-description", "description"],
        [".key-features", "tags"],
        [":scope > .btn-container", "actions"],
      ].forEach(([selector, part], index) => {
        const element = project.querySelector(selector);
        if (!element) return;
        element.dataset.projectPart = part;
        element.style.setProperty("--part-order", String(index));
        element.style.setProperty("--part-stagger", `${index * 65}ms`);
      });
    });
  }

  function animateStatistic(element) {
    if (element.dataset.counted === "true") return;
    const number = element.querySelector(".stat-number");
    if (!number) return;

    const label = number.textContent.trim();
    const target = Number.parseInt(label, 10);
    if (!Number.isFinite(target)) return;

    const suffix = label.replace(String(target), "");
    const duration = 900;
    const startedAt = performance.now();
    element.dataset.counted = "true";

    function update(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    }

    number.textContent = `0${suffix}`;
    requestAnimationFrame(update);
  }

  function revealSection(section) {
    if (section.classList.contains("is-visible")) return;
    section.classList.add("is-visible");
    if (section.id === "career" && !prefersReducedMotion) {
      section.querySelectorAll(".stat-item").forEach(animateStatistic);
    }
  }

  function initializeMotion() {
    const hero = document.querySelector('[data-motion="hero"]');
    const sections = [...document.querySelectorAll('[data-motion="section"]')];
    prepareMotion();

    if (prefersReducedMotion) {
      document.documentElement.classList.add("motion-reduced");
      hero?.classList.add("is-visible");
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      hero?.classList.add("is-visible");
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    requestAnimationFrame(() => requestAnimationFrame(() => hero?.classList.add("is-visible")));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealSection(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10%" },
    );

    sections.forEach((section) => revealObserver.observe(section));
  }

  try {
    initializeMotion();
  } catch (error) {
    document.documentElement.classList.remove("motion-ready");
    console.warn("Motion enhancement was skipped.", error);
  }

  const pageSections = document.querySelectorAll(
    "#about, #experience, #career, #projects, #contact",
  );
  const navigationLinks = document.querySelectorAll(
    '.nav-container a[href^="#"], #hamburger-nav a[href^="#"]',
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const currentId = `#${entry.target.id}`;
          navigationLinks.forEach((link) => {
            if (link.getAttribute("href") === currentId) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );

    pageSections.forEach((section) => sectionObserver.observe(section));
  }

  setNavigationState();
  window.addEventListener("popstate", () => {
    const target = window.location.hash
      ? document.querySelector(window.location.hash)
      : document.querySelector("#profile");
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  });
  window.addEventListener("scroll", setNavigationState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) setMenuOpen(false);
  });
});
