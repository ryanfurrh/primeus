// components/data/Badge.tsx
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Tone = "resting" | "energized" | "failed"

interface BadgeProps {
  children: ReactNode
  signal?: boolean
  failed?: boolean
  dot?: boolean
  className?: string
}

/* A bordered chip. `signal` gives it the flux edge and a status dot — use it
   for the one thing in the view that is live. Ported from the design
   system's components/data/Badge.jsx. */
export function Badge({ children, signal = false, failed = false, dot = false, className }: BadgeProps) {
  const tone: Tone = failed ? "failed" : signal ? "energized" : "resting"
  const edge =
    tone === "failed"
      ? "border-alert text-alert"
      : tone === "energized"
        ? "border-flux text-flux"
        : "border-sand-700/35 text-sand-700/65 dark:border-pale-100/35 dark:text-pale-100/65"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
        edge,
        className
      )}
    >
      {dot || signal ? <StatusDot tone={tone} /> : null}
      {children}
    </span>
  )
}

/* The only round thing in the system. */
export function StatusDot({ tone = "energized", className }: { tone?: Tone; className?: string }) {
  const color =
    tone === "failed" ? "bg-alert" : tone === "energized" ? "bg-flux" : "bg-sand-700/55 dark:bg-pale-100/55"
  return <span className={cn("block h-1.5 w-1.5 flex-shrink-0 rounded-full", color, className)} />
}

/* A reading, drawn as filled segments out of a fixed count — never a
   percentage bar. Flux-filled by default; pass tone="reading" for a neutral
   bar where flux is already spoken for elsewhere in the view. */
export function IntegrityBar({
  value = 4,
  total = 6,
  tone = "energized",
  className,
}: {
  value?: number
  total?: number
  tone?: "energized" | "reading" | "failed"
  className?: string
}) {
  const on =
    tone === "failed" ? "bg-alert" : tone === "reading" ? "bg-sand-700/80 dark:bg-pale-100/80" : "bg-flux"
  return (
    <div className={cn("flex flex-row gap-[3px]", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-[10px] flex-1",
            i < value ? on : "border border-sand-700/30 bg-transparent dark:border-pale-100/30"
          )}
        />
      ))}
    </div>
  )
}
