// app/archive/components/SheetLoupe.tsx
"use client"

import { ReactNode } from "react"

/* The sheet's layout width at md and up — the fixed paper. The loupe only
   runs there (it's hover-driven), so this is a safe constant to measure the
   displayed scale against. */
export const SHEET_WIDTH = 604

const LOUPE = 224 // the magnified viewport, square
const MAG = 2.6 // magnification over the sheet as displayed
const TICKS = 5

export interface LoupeReading {
  /* Where the cursor is, in viewport space, for placing the loupe. */
  clientX: number
  clientY: number
  /* Where it is on the sheet, 0..1 on each axis. */
  fx: number
  fy: number
  /* The sheet as displayed, in CSS px. */
  rectW: number
  rectH: number
}

const fmt = (n: number) => String(Math.round(n)).padStart(3, "0")

/* A loupe over the light table: it magnifies the live sheet rather than an
   image of it, by rendering a second copy scaled up and offset so the point
   under the cursor lands at the reticle. `sheet` is passed in already built
   and memoised by the caller — rebuilding it on every mousemove would re-run
   CalibratedText's per-glyph work and make the whole thing crawl. */
export function SheetLoupe({ reading, sheet }: { reading: LoupeReading; sheet: ReactNode }) {
  const { clientX, clientY, fx, fy, rectW, rectH } = reading

  // The sheet's on-screen scale (0.66 from the .sheet-scale rule), derived
  // rather than hardcoded so it stays correct if that value changes.
  const displayScale = rectW / SHEET_WIDTH
  const total = displayScale * MAG

  // Document-space coordinates, i.e. position on the unscaled paper.
  const docW = SHEET_WIDTH
  const docH = rectH / displayScale
  const docX = fx * docW
  const docY = fy * docH

  // How much of the document the loupe can see, for the graduated scales.
  const spanX = LOUPE / (displayScale * MAG)
  const spanY = spanX
  const x0 = docX - spanX / 2
  const y0 = docY - spanY / 2

  // Keep it beside the cursor but inside the window.
  const pad = 20
  const left =
    clientX + pad + LOUPE + 34 > window.innerWidth ? clientX - pad - LOUPE - 34 : clientX + pad
  const top = Math.min(Math.max(clientY - LOUPE / 2, pad), window.innerHeight - LOUPE - 54)

  const tick = "bg-flux/50"
  const label = "font-mono text-[8px] leading-none tracking-[0.08em] text-flux/70"

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{ left, top }}
    >
      {/* Fixed dark glass, like the artifact viewport's floating chrome. The
          graduations are flux, which would vanish against the sheet's cream
          paper and against a light page — giving the whole assembly its own
          ground keeps them readable in either mode. */}
      <div className="flex rounded-[4px] border border-flux/30 bg-ink-900/90 p-2 backdrop-blur-[6px]">
        {/* Y scale — the vertical run of the document inside the loupe. */}
        <div className="mr-1 flex w-[26px] flex-col justify-between py-[2px] text-right">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span key={i} className={label}>
              {fmt(y0 + (spanY * i) / (TICKS - 1))}
            </span>
          ))}
        </div>

        <div>
          <div
            className="relative overflow-hidden rounded-[4px] border border-flux/60 bg-ink-900"
            style={{ width: LOUPE, height: LOUPE }}
          >
            <div
              style={{
                position: "absolute",
                width: SHEET_WIDTH,
                transform: `scale(${total})`,
                transformOrigin: "top left",
                left: LOUPE / 2 - fx * rectW * MAG,
                top: LOUPE / 2 - fy * rectH * MAG,
              }}
            >
              {sheet}
            </div>

            {/* Reticle. Crosshair with a gap at the centre so the thing
                you're actually reading isn't sitting under a line. */}
            <span className={`absolute left-0 right-0 top-1/2 h-px ${tick}`} style={{ clipPath: "polygon(0 0, 42% 0, 42% 100%, 0 100%, 0 0)" }} />
            <span className={`absolute left-0 right-0 top-1/2 h-px ${tick}`} style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 58% 100%)" }} />
            <span className={`absolute bottom-0 top-0 left-1/2 w-px ${tick}`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 42%, 0 42%)" }} />
            <span className={`absolute bottom-0 top-0 left-1/2 w-px ${tick}`} style={{ clipPath: "polygon(0 58%, 100% 58%, 100% 100%, 0 100%)" }} />
            <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-flux/80" />

            {/* Corner brackets. */}
            <span className="absolute left-1 top-1 h-2 w-2 border-l border-t border-flux/70" />
            <span className="absolute right-1 top-1 h-2 w-2 border-r border-t border-flux/70" />
            <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-flux/70" />
            <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-flux/70" />

            {/* The reading, inside the box as on the reference terminal. On
                its own dark chip so it stays legible over the paper. */}
            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-[2px] bg-ink-900/85 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-flux">
              X {fmt(docX)} · Y {fmt(docY)}
            </span>
          </div>

          {/* X scale, along the bottom. */}
          <div className="mt-1 flex justify-between" style={{ width: LOUPE }}>
            {Array.from({ length: TICKS }).map((_, i) => (
              <span key={i} className={label}>
                {fmt(x0 + (spanX * i) / (TICKS - 1))}
              </span>
            ))}
          </div>
        </div>

        {/* Mirrored rail on the right — graduation marks without the
            numbers, so the box reads as an instrument from both sides. */}
        <div className="ml-1 flex w-[6px] flex-col justify-between py-[2px]">
          {Array.from({ length: TICKS * 2 - 1 }).map((_, i) => (
            <span key={i} className={`h-px ${i % 2 ? "w-[3px]" : "w-[6px]"} ${tick}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
