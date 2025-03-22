// components/layout/SidebarItem.tsx
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import clsx from "clsx"
import { type Item } from "@/app/NavIndex"

export function SidebarItem({ item, collapsed }: { item: Item; collapsed: boolean }) {
  const segment = useSelectedLayoutSegment()
  const isActive = item.slug === segment

  return (
    <Link
      href={`/${item.slug}`}
      className={clsx(
        "flex items-center px-3 py-2 rounded text-sm transition-all font-medium",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        collapsed ? "justify-center" : "gap-2"
      )}
    >
      <div className="w-5 h-5">{item.icon}</div>
      {!collapsed && <span>{item.name}</span>}
    </Link>
  )
}
