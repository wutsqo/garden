/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "magenta-cerise": "#DA1D7E",
        "yellow-beer": "#F8B725",
        "bluish-purple": "#885EDD",
        "green-carribean": "#23C8A0",
        "twitter-blue": "#1DA1F2",
        "instagram-pink": "#E1306C",
        "linkedin-blue": "#0077B5",
        "github-black": "#24292E",
      },
      boxShadow: {
        brutalist: "2px 2px #1a1a1a",
      },
      aspectRatio: {
        "21/9": "21 / 9",
        "21/3": "21 / 3",
        "2/3": "2 / 3",
      },
      transitionProperty: {
        height: "height",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        write: "write 1000ms ease-out 800ms",
        "fade-in": "fade-in 300ms ease-out forwards",
        "fade-in-up": "fade-in-up 300ms ease-out forwards",
        nudge: "nudge 400ms linear",
      },
      borderRadius: {
        cartoon: "2% 95% 1% 95%/95% 3% 92% 3%",
        cartoon2: "95% 1% 90% 1%/5% 90% 2% 93%",
      },
      keyframes: {
        write: {
          "0%": { "stroke-dashoffset": "2000" },
          "100%": { "stroke-dashoffset": "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        nudge: {
          "0%": {
            transform: "rotate(-7deg)",
          },
          "33%": {
            transform: "rotate(7deg)",
          },

          "66%": {
            transform: "rotate(-7deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
