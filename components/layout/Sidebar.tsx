// components/layout/Sidebar.tsx
"use client"

import { SidebarItem } from "./SidebarItem"
import { NavIndex } from "@/app/NavIndex"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, PrimaeLogo } from "@/public/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import type { ScrambleInHandle } from "@/fancy/components/text/scramble-in"
import Version from "@/app/components/Version"
import { useSidebar } from "./SidebarContext"

export function Sidebar() {
  // Shared, not local — a page can collapse the rail (see SidebarContext).
  const { collapsed, setCollapsed } = useSidebar()

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
        // No pt-96 any more — that arbitrary 384px top padding is what pushed
        // the rail's contents into the lower third. Vertically centred now
        // (see justify-center below), which is what the kit's GlobalNav does.
        "fixed inset-y-0 left-0 z-30 flex transition-all duration-500 ease-in-out",
        collapsed ? "w-18" : "w-44"
      )}
    >
      <div
        className={cn(
          // No background here any more — the translucent ground belongs to
          // the chrome frame (the bordered nav box) only, so the wordmark and
          // version chip sit directly on the page.
          "flex flex-col justify-center gap-5 w-full h-full text-foreground transition-all duration-500 ease-in-out overflow-visible",
          collapsed ? "w-18" : "md:w-44"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            // pb-6 (was pb-2) lifts the wordmark clear of the chrome frame.
            "relative z-0 flex pt-6 pb-6 transition-all duration-500 ease-in-out",
            collapsed ? "justify-center pl-0" : "pl-5"
          )}
        >
          <Link
            href="/"
            className="inline-flex justify-start h-6 gap-2 text-[22px] font-bold tracking-[-0.02em] font-instrument"
          >
            <PrimaeLogo className="flex-shrink-0 text-neptune-600" />
            {/* max-width, not w-full -> w-0. A percentage width resolving
                against a rail that is itself animating is what made the
                wordmark jerk sideways mid-collapse; a fixed px max-width
                interpolates linearly and stays put. */}
            <div
              className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out",
                collapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"
              )}
            >
              Primeūs
            </div>
          </Link>
          {/* No box around it any more — just the glyph. And it mirrors
              rather than rotating: scale-x flips the arrow in place, where
              -rotate-180 swung it through a half-turn. */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-0 flex items-center justify-center w-[18px] h-[18px] transition-all text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft
              className={cn(
                "w-3 h-3 transform transition-transform duration-500 ease-in-out",
                collapsed ? "scale-x-[-1]" : "scale-x-100"
              )}
            />
          </button>
        </div>

        {/* Nav Box */}
        <div
          className={cn(
            // No flex-1/h-full — those made the nav box fill the rail, which
            // would defeat the parent's justify-center. Content-height now, so
            // the whole stack centres as one block.
            // This is the chrome frame, so it carries the rail's translucent
            // ground (replacing the dead bg-card, which resolved to nothing).
            "flex flex-col justify-between bg-background/60 backdrop-blur-[6px] transition-all duration-500 ease-in-out",
            collapsed ? "w-18" : "md:w-44"
          )}
        >
          <div className="flex w-full h-4 border-t border-r border-tan" />
          <div className="z-10 flex flex-col gap-1 py-4">
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
          <div
            className={cn(
              "flex items-center p-4 transition-all duration-500 ease-in-out",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <ThemeToggle collapsed={collapsed} />
          </div>
          <div className="flex w-full h-4 border-b border-r border-tan" />
        </div>
      </div>

      {/* Pinned to the viewport's bottom-left rather than riding the bottom
          of the centred stack, so it stays put as the rail collapses. */}
      <div className="fixed bottom-4 left-4 z-30">
        <Version />
      </div>
    </aside>
  )
}
