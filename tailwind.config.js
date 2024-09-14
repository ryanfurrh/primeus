const { fontFamily } = require("tailwindcss/defaultTheme")
const { mauve, violet } = require("@radix-ui/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondaryforeground: "hsl(var(--secondary-foreground))",
        card: "hsl(var(--card))",
        teal: "hsl(var(--teal))",
        gray: "hsl(var(--gray))",
        grayLight: "hsl(var(--gray-light))",
        foreground: "hsl(var(--foreground))",
        foregroundDark: "hsl(var(--foreground-dark))",
        tan: "hsl(var(--tan))",
        peach: "hsl(var(--peach))",
        teal: "hsl(var(--teal))",
        tealLight: "hsl(var(--teal-light))",
        tealDark: "hsl(var(--teal-dark))",
        orange: "hsl(var(--orange))",
        orangeLight: "hsl(var(--orange-light))",
        orangeDark: "hsl(var(--orange-dark))",
        red: "hsl(var(--red))",
        redLight: "hsl(var(--red-light))",
        redDark: "hsl(var(--red-dark))",
        purple: "hsl(var(--purple))",
        purpleLight: "hsl(var(--purple-light))",
        purpleDark: "hsl(var(--purple-dark))",
        green: "hsl(var(--green))",
        greenLight: "hsl(var(--green-light))",
        greenDark: "hsl(var(--green-dark))",
        blue: "hsl(var(--blue))",
        blueLight: "hsl(var(--blue-light))",
        blueDark: "hsl(var(--blue-dark))",
        navy: "hsl(var(--navy))",
        navyLight: "hsl(var(--navy-light))",
        navyDark: "hsl(var(--navy-dark))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ...mauve,
        ...violet,
        // other colors...
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
      },
      fontFamily: {
        ibm: ["var(--font-ibm)", ...fontFamily.mono],
        marvin: ["var(--font-marvin)", ...fontFamily.sans],
        plexSans: ["var(--font-plex-sans)", ...fontFamily.sans],
        archivo: ["var(--font-archivo)", ...fontFamily.sans],
        jet: ["var(--font-jet)", ...fontFamily.mono],
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
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
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
