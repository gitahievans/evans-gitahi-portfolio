document.addEventListener("DOMContentLoaded", () => {
  // Attach the click event listener to the hamburger icon
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", toggleMenu);
  } else {
    console.error("Hamburger icon not found in the DOM!");
  }

  // Attach event listeners to menu links for smooth scrolling
  document.querySelectorAll(".menu-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      console.log("Menu link clicked:", link.getAttribute("href"));
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();
        toggleMenu(); // Close the menu after clicking a link
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    console.log("Menu toggled. Open state:", menu.classList.contains("open"));
  } else {
    console.error("Menu or icon not found during toggle!");
  }
}