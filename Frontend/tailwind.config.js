/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      bgred: "#E43A05",
      bggreen: "#20AB47",
      bgorange: "#FEA529",
      bglight: "#FFFFFF",
      bglightgrey: "#22222A",
      bgmedgrey: "#1e1d23",
      bgdarkgrey: "#dcdde5",
      lightblue: "#c2dffb",
      darkblue: "#4292f1",
      bggray: "#eff3f6",
      bggold: "#ffd28e",
    },
    fontFamily: {},
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "&::-webkit-scrollbar": {
            display: "none",
          },

          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
