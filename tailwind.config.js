/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "class", // Ensures dark mode works using class
  
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#1784ac",
          secondary: "#176baa",
          neutral: "#191D24",
          "base-100": "#ffffff", // White background for light mode
          info: "#3ABFF8",
          success: "#15B06F",
          warning: "#E99516",
          error: "#BB1313",
          grey: "#494949",
        },
      },
      {
        darkTheme: {
          primary: "#86C1B9", // Soft teal
          secondary: "#4E8098", // Muted blue-green
          neutral: "#252836", // Dark gray-blue
          "base-100": "#1E1E2E", // Dark purple-blue (soothing)
          info: "#64A6BD", // Gentle blue
          success: "#A7C957", // Soft green
          warning: "#E9B44C", // Warm muted orange
          error: "#E07A5F", // Calm reddish-orange
          grey: "#6C757D", // Balanced neutral gray
        },
      },
    ],
  },
};
