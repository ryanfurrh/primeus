"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  collapsed?: boolean
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, collapsed, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        // "peer inline-flex h-6w w-11 shrink-0 cursor-pointer items-center rounded-full border-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block bg-tan ring-0 transition-all",
          collapsed
            ? "h-3 w-1 translate-x-[3px] data-[state=checked]:-translate-y-3.5 data-[state=unchecked]:translate-y-3.5"
            : "h-1 w-3 data-[state=checked]:translate-x-[30px] data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
