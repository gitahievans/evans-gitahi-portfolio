window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-container");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.querySelector(".hamburger-icon").addEventListener("click", toggleMenu);

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.querySelectorAll(".hamburger-icon").forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log("clicked");

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault();

      toggleMenu();

      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
