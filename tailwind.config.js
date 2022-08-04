/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    screens: {
      xs: "370px",
      sm: "730px",
      md: "920px",
      lg: "1024px",
      xl: "1440px"
    },
    extend: {
      colors: {
        'game-panel': '#00a000',
        'tip': '#edf35a'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".spade-container": {
          maxWidth: "100%",
          minHeight: "700px",
          "@screen sm": {
            maxWidth: "700px",
            minHeight: "600px"
          },
        },        
      });
    },

  ],
}