// components/PageHeader.tsx
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  name: string
  icon?: ReactNode
  readout?: string
  className?: string
}

/* The section nameplate: a tab hanging off the top edge of the screen,
   hairline on three sides, tracked uppercase. Square — the chassis has no
   radius. Ported from the design system's components/chrome/PageHeader.jsx. */
export function PageHeader({ name, icon, readout, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-stretch justify-center", className)}>
      <div className="flex items-center h-10 gap-3 px-6 border-b border-l border-r border-sand-400 bg-sand-100 dark:border-ink-100 dark:bg-ink-800">
        {icon}
        <span className="font-instrument text-[12px] font-bold uppercase tracking-[0.10em] whitespace-nowrap text-sand-900 dark:text-ink-50">
          {name}
        </span>
        {readout ? (
          <>
            <span className="self-stretch w-px bg-sand-300 dark:bg-pale-100/40" />
            <span className="font-mono text-[12px] whitespace-nowrap text-sand-700 dark:text-pale-100">
              {readout}
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}
