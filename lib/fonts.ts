import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
})

export const jet = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
  display: "swap",
})

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const marvin = localFont({
  src: "../public/fonts/MarvinVisionsBig-Bold.woff2",
  variable: "--font-marvin",
  weight: "800",
})

export const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
})
