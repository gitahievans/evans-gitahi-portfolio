/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html", "./projects/**/*.html"],
  theme: {
    extend: {
      colors: {
        /* ── Centralized design tokens matching style.css ── */
        "bg-primary":   "#0d0d0d",
        "bg-surface":   "#141414",
        "bg-elevated":  "#1e1e1e",
        "bg-card":      "#181818",
        "cream":        "#FDFBD4",
        "cream-muted":  "rgba(253, 251, 212, 0.75)",
        "cream-dim":    "rgba(253, 251, 212, 0.35)",
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.78)",
        "text-muted":   "rgba(255, 255, 255, 0.52)",
      },
    },
  },
  plugins: [],
};
