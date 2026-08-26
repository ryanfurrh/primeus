/**
 * Primeus — next/font declarations replacing the Marvin / Archivo / JetBrains set.
 *
 * Instrument Sans and Overpass Mono come from Google. Redaction is self-hosted —
 * it is not on Google Fonts.
 *
 * Each localFont() call is inlined at its own const — next/font's compiler
 * requires the font loader to be called directly in a top-level declaration,
 * not routed through a helper function.
 */
import localFont from "next/font/local"
import { Instrument_Sans, Overpass_Mono } from "next/font/google"

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-overpass-mono",
  display: "swap",
})

// Uncut. Kept for reference; never used for display type.
export const redaction = localFont({
  src: [
    { path: "../public/fonts/Redaction-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Redaction-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Redaction-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction",
  display: "swap",
})

export const redaction100 = localFont({
  src: [
    { path: "../public/fonts/Redaction_100-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Redaction_100-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Redaction_100-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction-100",
  display: "swap",
})

// No roman cut supplied — roman falls back to the italic.
export const redaction70 = localFont({
  src: [
    { path: "../public/fonts/Redaction_70-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Redaction_70-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction-70",
  display: "swap",
})

export const redaction50 = localFont({
  src: [
    { path: "../public/fonts/Redaction_50-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Redaction_50-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction-50",
  display: "swap",
})

// The body-prose ceiling.
export const redaction35 = localFont({
  src: [
    { path: "../public/fonts/Redaction_35-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Redaction_35-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction-35",
  display: "swap",
})

// The display face.
export const redaction20 = localFont({
  src: [
    { path: "../public/fonts/Redaction_20-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Redaction_20-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-redaction-20",
  display: "swap",
})

// Below the legibility floor. Calibration 0.00-0.20 only.
export const redaction10 = localFont({
  src: [{ path: "../public/fonts/Redaction_10-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-redaction-10",
  display: "swap",
})

export const fontVars = [
  instrumentSans.variable,
  overpassMono.variable,
  redaction.variable,
  redaction100.variable,
  redaction70.variable,
  redaction50.variable,
  redaction35.variable,
  redaction20.variable,
  redaction10.variable,
].join(" ")
