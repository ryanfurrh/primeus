// components/data/CalibratedText.tsx
import { CSSProperties, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { calibrationStep, CALIBRATION_LIGATURES } from "@/lib/calibration"

const CAL_FONT_CLASS: Record<number, string> = {
  20: "font-cal20",
  35: "font-cal35",
  50: "font-cal50",
  70: "font-cal70",
  100: "font-cal100",
}

interface CalibratedTextProps {
  children: ReactNode
  fidelity?: number
  prose?: boolean
  tag?: ElementType
  className?: string
  style?: CSSProperties
}

/* A page renders at the fidelity it has earned — never authored. One glyph
   at a time; notated terms ([[wikilinks]]) pull their neighbours up (+0.42
   at the edge, easing back over 22 characters); prose caps at Redaction 35;
   structure never decays. Ported from the design system's
   components/data/CalibratedText.jsx — same algorithm, Tailwind cal10-100
   classes (from Stage 1's tailwind.config.js) instead of --font-cal-* vars. */
export function CalibratedText({ children, fidelity = 1, prose = true, tag = "p", className, style }: CalibratedTextProps) {
  const text = typeof children === "string" ? children : String(children ?? "")
  const terms: [number, number][] = []
  let removed = 0
  const plain = text.replace(/\[\[(.+?)\]\]/g, (_m, t: string, i: number) => {
    const start = i - removed
    terms.push([start, start + t.length])
    removed += 4
    return t
  })

  const runs: { cut: number; notated: boolean; text: string }[] = []
  for (let i = 0; i < plain.length; i++) {
    let lift = 0
    let notated = false
    for (const [a, b] of terms) {
      if (i >= a && i < b) {
        notated = true
        break
      }
      const d = i < a ? a - i : i - b + 1
      if (d <= 22) lift = Math.max(lift, 0.42 * (1 - d / 22))
    }
    const f = notated ? 1 : Math.min(1, fidelity + lift)
    const step = calibrationStep(f)
    const cut = notated ? 20 : prose ? Math.max(step.cut, 35) : step.cut
    const lig = step.ligature && !notated && /[a-z]/i.test(plain[i])
    const ch = lig ? CALIBRATION_LIGATURES[i % CALIBRATION_LIGATURES.length] : plain[i]
    const last = runs[runs.length - 1]
    if (last && last.cut === cut && last.notated === notated) last.text += ch
    else runs.push({ cut, notated, text: ch })
  }

  const Tag = tag
  const baseCut = calibrationStep(fidelity).cut

  return (
    <Tag
      className={cn(
        CAL_FONT_CLASS[baseCut],
        "m-0 text-[16px] leading-[24px] text-sand-700 dark:text-pale-100",
        className
      )}
      style={style}
    >
      {runs.map((r, i) => (
        <span
          key={i}
          className={cn(CAL_FONT_CLASS[r.cut], r.notated && "text-sand-900 dark:text-ink-50")}
        >
          {r.text}
        </span>
      ))}
    </Tag>
  )
}
