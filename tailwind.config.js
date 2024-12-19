/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        cairo: 'Cairo Variable',
      },
      colors: {
        primary: {
          1000: "#0aad0a",
          50: "#ffffff",
          100: "#e7f7e7",
          200: "#ceefce",
          300: "#b6e6b6",
          400: "#9dde9d",
          500: "#85d685",
          600: "#6cce6c",
          700: "#54c654",
          800: "#3bbd3b",
          900: "#23b523",
          950: "#055705",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      keyframes: {
        fade: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "fade-reverse": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fade: "fade 1s ease-in-out",
        "fade-reverse": "fade-reverse 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
