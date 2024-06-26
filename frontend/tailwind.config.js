/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ['dark', 'fantasy', 'coffee', 'cupcake', 'dracula', 'halloween', 'pastel',
        { 
          pastel: {
            ...require("daisyui/src/theming/themes")["pastel"],
            // primary: "blue",
          },
        }
      ],
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

