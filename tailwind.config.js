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
        /* SURFACES */
        navbar: "var(--bg-navbar)",
        sidebar: "var(--bg-sidebar)",
        page: "var(--bg-page)",
        card: "var(--bg-card)",

        /* BORDERS */
        cardBorder: "var(--border-card)",
        borderDefault: "var(--border-default)",

        /* TEXT */
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",

        /* BRAND / ACTION */
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",

        /* STATUS */
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};
