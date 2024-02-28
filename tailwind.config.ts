import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f8f8f8",
          200: "#e7e7e7",
          300: "#d6d6d6",
          400: "#c4c4c4",
          500: "#b3b3b3",
          600: "#8f8f8f",
          700: "#6b6b6b",
          800: "#474747",
          900: "#232323",
        },
        white: "#ffffff",
        black: "#010103",
        orange: "#ff4d30",
        btnBlack: "#161616",
        fg: "#171717",
        bg: "white",
        myProfile: "#f9f9f9",
        title: "#2d2e32",
        hover: "#eaeaea",
        blueHover: "#147efb",
        green:"#4CAF50",
      },
      fontFamily: {
        titlesFont: ["Poppins", "sans-serif"],
        textFont: ["Mulish", "sans-serif"],
      },
      maxWidth: {
        '50': '50rem',
      },
      // fontSize: {
      //   "10": "1rem", // Correspond à 10px avec un font-size de 62.5%
      //   "h1": "62px",
      //   "h2": "54px",
      //   "h3": "24px",
      //   "h4": "16px",
      //   "p": "16px",
      //   "input": "22px",
      // },
    },
  },
  plugins: [],
};
export default config;
