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
        ".md-card-grid-col": {
          "grid-template-columns": "repeat(13, 18px)"
        },
        ".sm-card-grid-col": {
          "grid-template-columns": "repeat(13, 10px)"
        },
        ".md-card-grid-row": {
          "grid-template-rows": "repeat(13, 18px)"
        },
        ".sm-card-grid-row": {
          "grid-template-rows": "repeat(13, 10px)"
        },
        ".md-trick-card-grid-col": {
          "grid-template-columns": "repeat(13, 10px)"
        },
        ".sm-trick-card-grid-col": {
          "grid-template-columns": "repeat(13, 6px)"
        },
        ".md-trick-card-grid-row": {
          "grid-template-rows": "repeat(13, 10px)"
        },
        ".sm-trick-card-grid-row": {
          "grid-template-rows": "repeat(13, 6px)"
        },
        ".sm-my-card-grid-col": {
          "grid-template-columns": "repeat(13, 16px)",
          "@screen xs": {
            "grid-template-columns": "repeat(13, 27px)",
          },
          "@screen sm": {
            "grid-template-columns": "repeat(13, 18px) !important",
          },
          "@screen md": {
            "grid-template-columns": "repeat(13, 18px) !important",
          },
          
          },
      });
    },

  ],
}