"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked)
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-4 text-xs uppercase text-muted-foreground">
      <span className={`${!isDark ? "opacity-100" : "opacity-40"} transition-opacity`}>Light</span>
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="w-12 h-4 border rounded-none dark:border-tan light:border-blue bg-background"
      />
      <span className={`${isDark ? "opacity-100" : "opacity-40"} transition-opacity`}>Dark</span>
    </div>
  )
}
