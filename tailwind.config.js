/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui:{
    themes: [
      {
        lightTheme: {
          primary: "#1784ac",
          secondary: "#176baa",
          neutral: "#191D24",
          "base-100": "#fff",
          info: "#3ABFF8",
          success: "#15B06F",
          warning: "#E99516",
          error: "#BB1313",
          grey: "#494949",
        },
      },
    ],
  }
}

