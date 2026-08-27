// app/archive/components/BackKey.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "@/public/icons"

export function BackKey({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "flex h-[22px] w-[22px] flex-shrink-0 cursor-pointer items-center justify-center border transition-colors",
        hover
          ? "border-sand-900 dark:border-pale-100 text-sand-900 dark:text-pale-100"
          : "border-sand-400/60 dark:border-pale-100/35 text-sand-500 dark:text-pale-100/50"
      )}
    >
      <ArrowLeft className="h-3 w-3" />
    </div>
  )
}
