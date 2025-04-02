// components/layout/Sidebar.tsx
"use client"

import { SidebarItem } from "./SidebarItem"
import { NavIndex } from "@/app/NavIndex"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, PrimaeLogo } from "@/public/icons"
import Link from "next/link"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import type { ScrambleInHandle } from "@/fancy/components/text/scramble-in"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  // Flatten the list of items
  const items = NavIndex.flatMap((section) => section.items)

  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([])

  useEffect(() => {
    if (collapsed) {
      scrambleRefs.current.forEach((ref) => ref?.reset?.()) // hypothetical method
      return
    }
    items.forEach((_, index) => {
      setTimeout(() => {
        scrambleRefs.current[index]?.start()
      }, index * 150) // Adjust timing here
    })
  }, [items])

  return (
    <aside className={clsx("flex w-48 pt-96 pb-12")}>
      <div
        className={clsx(
          "flex flex-col justify-between w-full h-full bg-background text-foreground transition-all ease-in-out overflow-visible",
          collapsed ? "w-24" : "md:w-48"
        )}
      >
        {/* Logo */}
        <div className="relative z-0 flex pt-6 pb-2 pl-5">
          <Link
            href="/"
            className="inline-flex justify-start h-6 gap-2 text-xl font-semibold tracking-tight font-archivo"
          >
            <PrimaeLogo className="flex-shrink-0 text-teal" />
            <div
              className={clsx(
                "transition-all",
                collapsed ? "opacity-0 w-0 truncate" : "opacity-100 w-full"
              )}
            >
              Primordeūs
            </div>
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
            collapsed ? "w-16" : "md:w-48"
          )}
        >
          <div className="flex w-full h-4 border-t border-r border-tan" />
          <div className="z-10 flex flex-col h-full gap-1 py-4 bg-background">
            <nav className="flex flex-col gap-4 pl-2">
              {items.map((item, index) => (
                <SidebarItem
                  key={item.slug}
                  item={item}
                  collapsed={collapsed}
                  ref={(el) => (scrambleRefs.current[index] = el)}
                />
              ))}
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
