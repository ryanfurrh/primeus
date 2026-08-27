// components/layout/SidebarContext.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

/* The rail's collapsed state was local to Sidebar, which meant no page could
   ask the rail to get out of the way. Lifted here so a surface can collapse
   it when it needs the room — the archive does this when you open a record
   onto the light table. */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  /* Below md the rail floats over a screen it would otherwise cover half
     of, so it starts collapsed there and re-collapses if the viewport
     crosses back under the breakpoint. Done in an effect rather than during
     render so the server and client agree on the first paint; expanding it
     by hand on a small screen still works, it just isn't the default. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const apply = () => {
      if (mq.matches) setCollapsed(true)
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle: () => setCollapsed(!collapsed) }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}
