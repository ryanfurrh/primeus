const { mauve, violet } = require("@radix-ui/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */

/**
 * Primeus — tailwind.config.js, brought in line with the design system
 * (see design-system handoff/README.md).
 *
 * Diff from the pre-Primeus repo file:
 *   fontFamily  five families (ibm, marvin, plexSans, archivo, jet) replaced by
 *               three voices + the seven Redaction calibration cuts.
 *   colors.ink  extended from {800,900} to a full 50-900 cold ramp.
 *   colors.bone removed — its one alias (bone-50 -> ink-50) has been migrated
 *               at the call sites (text-bone-50 -> text-ink-50).
 *   colors      accent family (6 + light counterparts) and the two signals added.
 *   transition  140ms linear registered as the default duration/easing.
 *   borderWidth.1 / width.18 added — used throughout (border-1, w-18) but were
 *               previously unconfigured, so those utilities generated no CSS.
 *
 * Unchanged: sand (incl. 1000), neptune, pale, imageRendering, screens.xs,
 * typography smoothing, darkMode: "class", and everything not covered by the
 * design system (HSL semantic colors, radix mauve/violet, sidebar tokens,
 * container, accordion keyframes/animation, tailwindcss-animate) — none of
 * that is part of the design-system spec, so it stays as-is rather than being
 * dropped by a literal file replace.
 */
module.exports = {
  darkMode: ["class"],
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
        tan: "hsl(var(--tan))",
        peach: "hsl(var(--peach))",
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
          50: "#E4E5E4",
          100: "#D9D9D9",
          200: "#BFBFBF",
          300: "#A3A3A3",
          400: "#858585",
          500: "#6B6B6B",
          600: "#4F4F4F",
          700: "#3A3A3A",
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
        pale: {
          100: "#D6C3BA",
        },
        // Faded-tech accents. Data, zones and imagery only — never chrome.
        // Nothing passes C 0.085; that ceiling keeps the family faded.
        rose: { DEFAULT: "#DCB4B0", light: "#734C49" },
        mauve: { DEFAULT: "#D2AAC3", light: "#714963" },
        clay: { DEFAULT: "#D3B09C", light: "#724F3A" },
        sage: { DEFAULT: "#93A095", light: "#4F5C51" },
        ice: { DEFAULT: "#AED0D5", light: "#3B5F64" },
        steel: { DEFAULT: "#6A8AA8", light: "#385B7C" },
        // Signals — no ramps. They mean a state, so they never tint or shade.
        flux: "#1BE4B4",
        alert: "#EE8495",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        // Display — the voice of the record. Redaction 20 is the ceiling (finest cut in use).
        redaction: ["var(--font-redaction-20)", ...defaultTheme.fontFamily.serif],
        // Body prose ceiling.
        prose: ["var(--font-redaction-35)", ...defaultTheme.fontFamily.serif],
        // Nameplate — stamped on hardware.
        instrument: ["var(--font-instrument-sans)", ...defaultTheme.fontFamily.sans],
        // Instrument — everything else.
        mono: ["var(--font-overpass-mono)", ...defaultTheme.fontFamily.mono],
        // Calibration cuts. Higher number = coarser dot; 100 is the floor, 20 the ceiling.
        cal10: ["var(--font-redaction-10)", ...defaultTheme.fontFamily.serif],
        cal20: ["var(--font-redaction-20)", ...defaultTheme.fontFamily.serif],
        cal35: ["var(--font-redaction-35)", ...defaultTheme.fontFamily.serif],
        cal50: ["var(--font-redaction-50)", ...defaultTheme.fontFamily.serif],
        cal70: ["var(--font-redaction-70)", ...defaultTheme.fontFamily.serif],
        cal100: ["var(--font-redaction-100)", ...defaultTheme.fontFamily.serif],
        calUncut: ["var(--font-redaction)", ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            WebkitFontSmoothing: "none",
          },
        },
      },
      width: {
        18: "72px",
      },
      borderWidth: {
        1: "1px",
      },
      transitionDuration: {
        DEFAULT: "140ms",
      },
      transitionTimingFunction: {
        // Instruments switch, they do not settle.
        DEFAULT: "linear",
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
      imageRendering: {
        pixelated: {
          "-webkit-optimize-contrast": "none",
          "-webkit-interpolation-mode": "nearest-neighbor",
          "image-rendering": "pixelated",
        },
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
