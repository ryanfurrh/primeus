// components/layout/Sidebar.tsx
"use client"

import { SidebarItem } from "./SidebarItem"
import { NavIndex } from "@/app/NavIndex"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, PrimaeLogo } from "@/public/icons"
import Link from "next/link"
import { useState } from "react"
import clsx from "clsx"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={clsx("flex w-48 pt-96 pb-12")}>
      <div
        className={clsx(
          "flex flex-col justify-between w-full h-full bg-background text-foreground transition-all ease-in-out overflow-visible",
          collapsed ? "w-24" : "md:w-48"
        )}
      >
        {/* Logo */}
        <div className="relative z-0 flex pt-6 pb-2 pl-4">
          <Link
            href="/"
            className="inline-flex justify-end h-6 gap-2 text-xl font-semibold tracking-tight font-archivo"
          >
            <PrimaeLogo className="text-teal" />
            {!collapsed && <span>Primordeūs</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-0 transition-all text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              className={`w-4 h-4 transform transition-all duration-500 ${
                collapsed ? "-rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Nav Box */}
        <div
          className={clsx(
            "flex flex-col justify-between flex-1 h-full bg-card transition-all",
            collapsed ? "w-24" : "md:w-48"
          )}
        >
          <div className="flex w-full h-4 border-t border-r border-tan" />
          <div className="z-10 flex flex-col h-full gap-1 py-4 bg-background">
            <nav className="flex flex-col">
              {NavIndex.map((section) =>
                section.items.map((item) => (
                  <SidebarItem key={item.slug} item={item} collapsed={collapsed} />
                ))
              )}
            </nav>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-start p-4">
            <ThemeToggle />
          </div>
          <div className="flex w-full h-4 border-b border-r border-tan" />
        </div>
      </div>
    </aside>
  )
}
