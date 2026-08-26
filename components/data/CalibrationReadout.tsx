// components/data/CalibrationReadout.tsx
import { cn } from "@/lib/utils"
import { calibrationStep } from "@/lib/calibration"

interface CalibrationReadoutProps {
  fidelity: number
  className?: string
}

/* States the fidelity a page earned — always padded to three decimals,
   0.881 not 88%. Ported from the design system's
   components/data/CalibratedText.jsx (CalibrationReadout export). */
export function CalibrationReadout({ fidelity, className }: CalibrationReadoutProps) {
  const cut = calibrationStep(fidelity).cut
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-mono text-[12px] tracking-[0.06em] text-neptune-600 dark:text-neptune-400",
        className
      )}
    >
      <span>CALIBRATION</span>
      <span className="text-sand-900 dark:text-ink-50">{fidelity.toFixed(3)}</span>
      <span className="text-sand-700/60 dark:text-pale-100/55">· RED {cut}</span>
    </span>
  )
}
