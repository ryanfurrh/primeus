// components/layout/SidebarContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

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
