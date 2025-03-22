const { mauve, violet } = require("@radix-ui/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  // darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
    "./App.jsx",
  ],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gray: "hsl(var(--gray))",
        "gray-light": "hsl(var(--gray-light))",
        teal: "hsl(var(--teal))",
        "teal-light": "hsl(var(--teal-light))",
        "teal-dark": "hsl(var(--teal-dark))",
        orange: "hsl(var(--orange))",
        "orange-light": "hsl(var(--orange-light))",
        "orange-dark": "hsl(var(--orange-dark))",
        green: "hsl(var(--green))",
        "green-light": "hsl(var(--green-light))",
        "green-dark": "hsl(var(--green-dark))",
        red: "hsl(var(--red))",
        "red-light": "hsl(var(--red-light))",
        "red-dark": "hsl(var(--red-dark))",
        blue: "hsl(var(--blue))",
        "blue-light": "hsl(var(--blue-light))",
        "blue-dark": "hsl(var(--blue-dark))",
        navy: "hsl(var(--navy))",
        "navy-light": "hsl(var(--navy-light))",
        "navy-dark": "hsl(var(--navy-dark))",
        purple: "hsl(var(--purple))",
        "purple-light": "hsl(var(--purple-light))",
        "purple-dark": "hsl(var(--purple-dark))",
        ...mauve,
        ...violet,
        sand: {
          50: "#f7f5f3",
          100: "#efece7",
          200: "#dfd9cf",
          300: "#cfc5b8",
          400: "#bfb2a0",
          500: "#af9f88",
          600: "#8c7f6d",
          700: "#695f52",
          800: "#454037",
          900: "#353029",
          1000: "#23201b",
        },
        ink: {
          800: "#262626",
          900: "#101010",
        },
        neptune: {
          50: "#DBEDEA",
          100: "#CDE6E2",
          200: "#B2D8D2",
          300: "#97CBC3",
          400: "#7CBDB3",
          500: "#57AA9D",
          600: "#43867B",
          700: "#306059",
          800: "#1E3B36",
          900: "#0B1614",
        },
        bone: {
          50: "#E4E5E4",
        },
        pale: {
          100: "#D6C3BA",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        },
      },
      fontFamily: {
        mono: ["var(--font-ibm)", ...defaultTheme.fontFamily.mono],
        archivo: ["var(--font-archivo)", ...defaultTheme.fontFamily.sans],
        jet: ["var(--font-jet)", ...defaultTheme.fontFamily.mono],
        plexSans: ["var(--font-plex-sans)", ...defaultTheme.fontFamily.sans],
        marvin: ["var(--font-marvin)", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "450px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    imageRendering: ["responsive"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".image-rendering-auto": {
          "image-rendering": "auto",
        },
        ".image-rendering-crisp-edges": {
          "image-rendering": "crisp-edges",
        },
        ".image-rendering-pixelated": {
          "image-rendering": "pixelated",
        },
        ".image-rendering-optimized-quality": {
          "image-rendering": "optimizeQuality",
        },
      }

      addUtilities(newUtilities, ["responsive"])
    },
  ],
  corePlugins: {
    imageRendering: false,
  },
}
