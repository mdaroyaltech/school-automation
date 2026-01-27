/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* THEME TOKENS */
        navbar: "var(--bg-navbar)",
        sidebar: "var(--bg-sidebar)",
        page: "var(--bg-page)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        card: "var(--bg-card)",
        borderColor: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
