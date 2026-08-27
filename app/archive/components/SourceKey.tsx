// app/archive/components/SourceKey.tsx
"use client"

import { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Readout } from "@/components/data/Readout"
import type { DisclosureGroup } from "@/lib/disclosures"

export function SourceKey({
  group,
  icon,
  sub,
  onPick,
}: {
  group: DisclosureGroup
  icon: ReactNode
  sub: string
  onPick: (source: string) => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={() => onPick(group.source)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex w-52 flex-col items-start gap-3 border p-4 text-left cursor-pointer transition-colors",
        hover
          ? "border-sand-900 dark:border-pale-100 bg-sand-900/[0.06] dark:bg-pale-100/[0.06]"
          : "border-sand-300 dark:border-ink-100/40 bg-sand-100 dark:bg-ink-800"
      )}
    >
      <span className={cn("h-6 w-6", hover ? "text-sand-900 dark:text-ink-50" : "text-neptune-600 dark:text-neptune-400")}>
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-instrument text-[14px] font-bold leading-[18px] text-sand-900 dark:text-ink-50">
          {group.source}
        </span>
        <span className="font-mono text-[9px] leading-[15px] tracking-[0.04em] text-sand-700/70 dark:text-pale-100/45">
          {sub}
        </span>
      </div>
      <span className="h-px w-full bg-sand-300 dark:bg-ink-100/40" />
      <Readout fields={[`${String(group.records.length).padStart(2, "0")} RECORDS`, "OPEN"]} />
    </div>
  )
}
