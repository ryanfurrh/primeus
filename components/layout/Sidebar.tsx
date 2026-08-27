// components/layout/Sidebar.tsx
"use client"

import { SidebarItem } from "./SidebarItem"
import { NavIndex } from "@/app/NavIndex"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, PrimaeLogo } from "@/public/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import type { ScrambleInHandle } from "@/fancy/components/text/scramble-in"
import Version from "@/app/components/Version"

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

  /* Floats over the page rather than taking a column from it, so every
     surface can centre in the full viewport (see app/layout.tsx's symmetric
     gutter). This is the rail model the design spec describes: absolute,
     full height, "the page area does not lose a column to it". */
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex pt-96 transition-all duration-500 ease-in-out",
        collapsed ? "w-[110px]" : "w-[280px]"
      )}
    >
      <div
        className={cn(
          // Translucent + blurred so the page reads through the rail. bg-card
          // on the nav box below is a dead class (no `card` colour in
          // tailwind.config.js), so this is the rail's only background layer.
          "flex flex-col justify-between w-full h-full bg-background/60 backdrop-blur-[6px] text-foreground transition-all duration-500 ease-in-out overflow-visible",
          collapsed ? "w-[110px]" : "md:w-[280px]"
        )}
      >
        {/* Logo */}
        <div className="relative z-0 flex pt-6 pb-2 pl-5">
          <Link
            href="/"
            className="inline-flex justify-start h-6 gap-2 text-[22px] font-bold tracking-[-0.02em] font-instrument"
          >
            <PrimaeLogo className="flex-shrink-0 text-neptune-600" />
            <div
              className={cn(
                "transition-all duration-500 ease-in-out",
                collapsed ? "opacity-0 w-0 truncate" : "opacity-100 w-full"
              )}
            >
              Primordeūs
            </div>
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-0 flex items-center justify-center w-[18px] h-[18px] border border-ink-400/40 dark:border-pale-100/30 transition-all text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              className={`w-3 h-3 transform transition-all duration-500 ${
                collapsed ? "-rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Nav Box */}
        <div
          className={cn(
            "flex flex-col justify-between flex-1 h-full bg-card transition-all duration-500 ease-in-out",
            collapsed ? "w-[110px]" : "md:w-[280px]"
          )}
        >
          <div className="flex w-full h-4 border-t border-r border-tan" />
          <div className="z-10 flex flex-col h-full gap-1 py-4">
            <nav className="flex flex-col gap-2">
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
            <ThemeToggle collapsed={collapsed} />
          </div>
          <div className="flex w-full h-4 border-b border-r border-tan" />
        </div>
        <Version />
      </div>
    </aside>
  )
}
