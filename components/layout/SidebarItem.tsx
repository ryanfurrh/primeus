// components/layout/SidebarItem.tsx
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { type Item } from "@/app/NavIndex"
import clsx from "clsx"
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
        className={clsx(
          "group flex items-center h-4 px-3 py-2 rounded text-sm font-medium transition-all duration-500 gap-3",
          isActive
            ? "bg-sand-300/90 text-sand-800 dark:bg-orange/20 dark:text-pale-100 transition-all ease-in-out"
            : "text-muted-foreground hover:bg-sand-300/70 hover:text-foreground dark:hover:bg-ink-800 dark:hover:text-pale-100"
        )}
      >
        <div className="flex-shrink-0 w-4 h-4">{item.icon}</div>
        <div
          className={clsx(
            " transition-all ",
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
