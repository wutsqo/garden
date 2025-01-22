const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      DEFAULT: "0.5rem",
      full: "9999px",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "2rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-figtree)"],
        mono: ["var(--font-space-mono)"],
      },
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
        write: "write 1000ms ease-out 800ms",
        "fade-in": "fade-in 300ms ease-out forwards",
        "fade-in-up": "fade-in-up 300ms ease-out forwards",
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
        },
      );
    }),
  ],
};
