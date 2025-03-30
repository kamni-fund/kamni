/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "kamni-dark": "#2A2D34", // темно-серый фон
        "kamni-yellow": "#E8C547", // желтый для ссылок и заголовков
        "kamni-light": "#F5F5F5", // светлый фон для светлой темы
      },
      fontFamily: {
        mono: ["monospace"],
      },
    },
  },
  plugins: [],
};
