/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "primary/base": "#FBBE28",
      "primary/darker": "#C99820",
      "primary/darker-2": "#7E5F14",
      "primary/lighter": "#FCD269",
      "primary/lighter-2": "#FDE5A9",
      "secondary/base": "#2D7B63",
      "secondary/darker": "#24624F",
      "secondary/darker-2": "#173E32",
      "secondary/lighter": "#6CA392",
      "secondary/lighter-2": "#ABCAC1",
      "neutral/base": "#0A0A0A",
      "state/error": "#C52421",
      "state/success": "#0ABC5D",
      "state/info": "#FFAB05",
      "state/blue": "#3C5BFF",
      "state/purple": "#9747FF",
      "state/gray": "#C2C2C2",
    },
  },
  plugins: [],
};
