// components/layout/Sidebar.tsx
"use client"

import { SidebarItem } from "./SidebarItem"
import { NavIndex } from "@/app/NavIndex"
import { ThemeToggle } from "@/components/theme-toggle"
import { PrimaeLogo, PrimaeLogoMinimal, ArrowLeft } from "@/public/icons"
import Link from "next/link"
import { useState } from "react"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className="h-full bg-card text-foreground border-r border-border flex flex-col justify-between w-full md:w-[112px] md:min-w-[112px] transition-all">
      <div className="flex flex-col gap-4 p-4">
        {/* Logo + Collapse Toggle */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-semibold tracking-tight font-archivo"
          >
            <PrimaeLogo className="w-5 h-5" />
            {collapsed ? "" : "Primordeūs"}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="transition text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className={`w-4 h-4 transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 mt-4">
          {NavIndex.map((section) =>
            section.items.map((item) => (
              <SidebarItem key={item.slug} item={item} collapsed={collapsed} />
            ))
          )}
        </nav>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-center p-4 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  )
}
