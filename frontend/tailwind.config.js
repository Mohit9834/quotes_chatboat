/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark mode using class strategy

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },

        secondary: {
          600: "#9333ea",
          700: "#7e22ce",
        },

        background: {
          light: "#ffffff",
          dark: "#0f172a",
        },

        text: {
          light: "#0f172a",
          dark: "#f8fafc",
        },
      },

      animation: {
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },

  plugins: [],
};