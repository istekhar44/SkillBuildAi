/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      "premium-black": "#050505", // Deep matte black
      "premium-dark": "#121212",   // Charcoal gray secondary
      "premium-gray": "#1A1A1A",   // Lighter gray for cards
      "premium-accents": "#E0E0E0", // Off-white/Silver accents
      "premium-text": "#B0B0B0",   // Soft gray body text
      animation: {
        blob: "blob 7s infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
