/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true, 
    rtl: false, 
    prefix: "", 
    logs: true,
  },
}

