"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Dark, Light } from "@/public/icons"

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

  // const flexDirection = {
  //   initial: {},
  // }

  return (
    <div className="relative flex text-xs uppercase select-none text-muted-foreground">
      <div
        className={cn(
          "flex select-none items-center relative justify-center pt-4 text-[12px] font-mono tracking-[0.12em] uppercase text-muted-foreground transition-all",
          collapsed ? "gap-1.5" : "gap-2"
        )}
      >
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="light-icon"
              initial={{ width: "auto", opacity: 0, y: -4 }}
              animate={{ width: "auto", opacity: 1, y: 0 }}
              exit={{ width: 36, opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              className="flex items-end h-full"
            >
              <Light />
            </motion.div>
          ) : (
            <motion.span
              key="light-label"
              initial={{ width: "auto", x: -8, opacity: 0 }}
              animate={{ width: "auto", x: 0, opacity: !isDark ? 1 : 0.4 }}
              exit={{ width: 12, x: -4, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex self-end h-full"
            >
              Light
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex h-full">
          <Switch
            checked={isDark}
            onCheckedChange={toggleTheme}
            collapsed={collapsed}
            className={cn(
              "border rounded-none dark:border-tan self-end w-12 h-3 light:border-blue bg-background transition-all duration-300 ease-in-out",
              collapsed ? "w-3 h-12 " : ""
            )}
          />
        </div>
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="dark-icon"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 bottom-9"
            >
              <Dark />
            </motion.div>
          ) : (
            <motion.span
              key="dark-label"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 4, opacity: isDark ? 1 : 0.4 }}
              exit={{ x: 4, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex self-end h-full"
            >
              Dark
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
