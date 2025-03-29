// components/layout/SidebarItem.tsx
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { type Item } from "@/app/NavIndex"
import clsx from "clsx"

export function SidebarItem({ item, collapsed }: { item: Item; collapsed: boolean }) {
  const segment = useSelectedLayoutSegment()
  const isActive = item.slug === segment

  return (
    <Link
      href={`/${item.slug}`}
      className={clsx(
        "group flex items-center px-3 py-2 rounded text-sm font-medium transition-all duration-500",
        collapsed ? "w-24" : "gap-2",
        isActive
          ? "bg-sand-300/90 text-sand-800 dark:bg-orange/20 dark:text-pale-100 transition-all ease-in-out"
          : "text-muted-foreground hover:bg-sand-300/70 hover:text-foreground dark:hover:bg-ink-800 dark:hover:text-pale-100"
      )}
    >
      <div className="w-5 h-5">{item.icon}</div>
      {!collapsed && <span>{item.name}</span>}
    </Link>
  )
}
