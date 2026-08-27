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
          "group flex items-center h-4 py-4 text-xs font-medium transition-all duration-500 ease-in-out",
          // Collapsed there's no label, so the icon centres in the rail rather
          // than staying pinned to the old asymmetric pl-5/pr-3 inset.
          collapsed ? "justify-center px-0 gap-0" : "pl-5 pr-3 gap-3",
          isActive
            ? "bg-nav-current text-sand-900 dark:bg-nav-current-dark dark:text-ink-50 shadow-[inset_2px_0_0_0_theme(colors.sand.700)] dark:shadow-[inset_2px_0_0_0_theme(colors.pale.100)] transition-all ease-in-out"
            : "text-muted-foreground hover:bg-nav-hover dark:hover:bg-nav-hover-dark hover:text-foreground dark:hover:text-pale-100"
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
