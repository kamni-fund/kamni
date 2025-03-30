/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "kamni-dark": "#2A2D34", // темно-серый фон
        "kamni-yellow": "#E8C547", // желтый для ссылок и заголовков
      },
      fontFamily: {
        mono: ["monospace"],
      },
    },
  },
  plugins: [],
};
