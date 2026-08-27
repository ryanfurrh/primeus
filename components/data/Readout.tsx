// components/data/Readout.tsx
import { cn } from "@/lib/utils"

interface ReadoutProps {
  fields: string[]
  tone?: "resting" | "loading" | "full"
  className?: string
}

const TONE_OPACITY: Record<NonNullable<ReadoutProps["tone"]>, string> = {
  resting: "opacity-65",
  loading: "opacity-40",
  full: "opacity-100",
}

/* A readout is a row of fields separated by the middot — the only decorative
   character in the system. Ported from the design system's
   components/panels/FieldRow.jsx. */
export function Readout({ fields, tone = "resting", className }: ReadoutProps) {
  return (
    <span
      className={cn(
        "font-mono text-[12px] tracking-[0.06em] whitespace-nowrap text-sand-700 dark:text-pale-100",
        TONE_OPACITY[tone],
        className
      )}
    >
      {fields.join(" · ")}
    </span>
  )
}
