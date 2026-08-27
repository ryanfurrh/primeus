// app/archive/components/RecordRow.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Disclosure } from "@/lib/disclosures"

/* An index row: title, then its metadata readout. Selected takes the label
   wash and a 2px energized leading edge — inset, so it doesn't reflow the
   row. Ported from the design system's components/data/Badge.jsx
   (RecordRow export). */
export function RecordRow({
  record,
  selected = false,
  onClick,
}: {
  record: Disclosure
  selected?: boolean
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex cursor-pointer flex-col gap-1 py-2.5 px-3 transition-colors",
        selected
          ? "shadow-[inset_2px_0_0_0_#1BE4B4] bg-[rgba(48,96,89,0.28)] dark:bg-[rgba(48,96,89,0.4)]"
          : hover
            ? "bg-[rgba(48,96,89,0.18)]"
            : ""
      )}
    >
      <span className="font-instrument text-[13px] font-semibold leading-[17px] text-sand-900 dark:text-pale-100">
        {record.title}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-sand-700/70 dark:text-pale-100/45">
        {record.empty ? "EMPTY" : record.subtitle?.toUpperCase() || "DISCLOSURE"} · {record.date ?? "undated"}
      </span>
    </div>
  )
}
