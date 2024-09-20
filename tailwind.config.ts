import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "custom-header": "calc(100vh - 88px)",
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "800px",
        1000: "1000px",
      },
      zIndex: {
        1: "1",
        5: "5",
        100: "100",
        1000: "1000",
        10000: "10000",
      },
      // minWidth: {
      //   xxs: "288px",
      //   xs: "320px",
      //   sm: "384px",
      //   md: "448px",
      //   lg: "512px",
      //   xl: "576px",
      // },
      // maxWidth: {
      //   100: "100px",
      //   200: "200px",
      //   300: "300px",
      //   "container-1": "1120px",
      //   "container-2": "992px",
      // },
      colors: {
        primary: "#0E2D65",
        secondary: "#B91C1C",
        "dark-gray": "#374151",
        "light-gray": "#F3F4F6",
        "dark-blue": "#1D2939",
        gray: "#6B7280",
        light: "#FFFFFF",
        dark: "#181C14",
      },
    },
  },
  plugins: [],
};
export default config;
