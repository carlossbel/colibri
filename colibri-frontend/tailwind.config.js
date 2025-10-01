import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'colibri-verde': '#28A745',
        'colibri-turquesa': '#00BFA6',
        'colibri-azul': '#007BFF',
        'colibri-amarillo': '#FFC107',
        'colibri-grisClaro': '#F5F5F5',
        'colibri-grisOscuro': '#343A40',
        'colibri-rojo': '#DC3545',
      },
    },
  },
  plugins: [],
})
