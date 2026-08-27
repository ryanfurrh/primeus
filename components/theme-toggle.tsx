"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Dark, Light } from "@/public/icons"

/* Always horizontal — the rail used to rotate this to a vertical switch when
   collapsed. Expanded it reads `Light [switch] Dark` with the words centred
   on the switch's own centre line; collapsed the words drop out and the moon
   and sun take their place on a row beneath it, pushed to either end.

   The framer-motion label swap this used to run is gone: it animated width
   and x together on mount/unmount, which is what made the rail jitter
   sideways mid-collapse. Plain opacity transitions here; the rail's own
   duration-500 collapse and the switch's duration-300 throw are untouched. */
export function ThemeToggle({ collapsed }: { collapsed?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked)
    setTheme(checked ? "dark" : "light")
  }

  const label = "font-mono text-[12px] leading-none tracking-[0.08em] transition-opacity duration-300"

  return (
    <div className="flex select-none flex-col gap-2 text-muted-foreground">
      <div className="flex items-center gap-2">
        {collapsed ? null : (
          <span className={cn(label, isDark ? "opacity-40" : "opacity-100")}>Light</span>
        )}
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="h-3 w-10 rounded-none border bg-background transition-all duration-300 ease-in-out dark:border-tan light:border-blue"
        />
        {collapsed ? null : (
          <span className={cn(label, isDark ? "opacity-100" : "opacity-40")}>Dark</span>
        )}
      </div>

      {collapsed ? (
        <div className="flex items-center justify-between">
          <Light
            className={cn("h-3 w-3 transition-opacity duration-300", isDark ? "opacity-40" : "opacity-100")}
          />
          <Dark
            className={cn("h-3 w-3 transition-opacity duration-300", isDark ? "opacity-100" : "opacity-40")}
          />
        </div>
      ) : null}
    </div>
  )
}
