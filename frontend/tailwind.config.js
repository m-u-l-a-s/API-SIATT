/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fonteAmarela: "#FCBE04",
        fonteVermelha: "#FF3C2F",
        botaoVermelho: "#FF3C2F"
      }
    },
  },
  plugins: [],
}

