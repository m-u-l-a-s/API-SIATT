/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    // Optional. We can tell Daisyui to load only the themes we need to reduce the bundle size.
    themes: ['dark', 'light', 'fantasy', 'coffee', 'cupcake', 'dracula', 'halloween'],
  },
  theme: {
    extend: {
      colors: {
        fonteAmarela: "#FFF000",
        fonteVermelha: "#FF3C2F",
        botaoVermelho: "#FF3C2F",
        transparent: 'transparent',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

