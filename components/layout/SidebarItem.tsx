// components/layout/SidebarItem.tsx
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { type Item } from "@/app/NavIndex"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { ScrambleInHandle } from "@/fancy/components/text/scramble-in"
import { ScrambleCombo } from "./ScrambleCombo"

interface SidebarItemProps {
  item: Item
  collapsed: boolean
}

export const SidebarItem = forwardRef<ScrambleInHandle, SidebarItemProps>(
  ({ item, collapsed }, ref) => {
    const segment = useSelectedLayoutSegment()
    const isActive = item.slug === segment

    return (
      <Link
        href={`/${item.slug}`}
        className={cn(
          "group flex items-center h-4 pr-3 pl-5 py-4 text-sm font-medium transition-all gap-3",
          isActive
            ? "bg-sand-300/90 text-sand-800 dark:bg-orange/20 dark:text-pale-100 transition-all"
            : "text-muted-foreground hover:bg-sand-300/70 hover:text-foreground dark:hover:bg-ink-800 dark:hover:text-pale-100"
        )}
      >
        <div className="flex-shrink-0 w-4 h-4">{item.icon}</div>
        <div
          className={cn(
            "transition-all",
            collapsed ? "opacity-0 w-0 truncate" : "opacity-100 w-full"
          )}
        >
          <ScrambleCombo ref={ref} text={item.name} />
        </div>
      </Link>
    )
  }
)

SidebarItem.displayName = "SidebarItem"
