// components/fancy/ScrambleCombo.tsx
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import ScrambleIn, { ScrambleInHandle } from "@/fancy/components/text/scramble-in"
import ScrambleHover from "@/fancy/components/text/scramble-hover"

interface ScrambleComboProps {
  text: string
}

export const ScrambleCombo = forwardRef<ScrambleInHandle, ScrambleComboProps>(({ text }, ref) => {
  const scrambleInRef = useRef<ScrambleInHandle>(null)
  const [showHover, setShowHover] = useState(false)

  // Expose `.start()` to parent via the ref
  useImperativeHandle(ref, () => ({
    start: () => {
      setShowHover(false)
      scrambleInRef.current?.start()
      setTimeout(() => setShowHover(true), 1200)
    },
    reset: () => {
      setShowHover(false)
      scrambleInRef.current?.reset?.()
    },
  }))

  // On mount, run ScrambleIn and then show ScrambleHover
  useEffect(() => {
    scrambleInRef.current?.start()
    const timeout = setTimeout(() => {
      setShowHover(true)
    }, 1200)

    return () => clearTimeout(timeout)
  }, [])

  return showHover ? (
    <ScrambleHover
      text={text}
      scrambleSpeed={50}
      maxIterations={8}
      useOriginalCharsOnly={false}
      characters="čüỳĦØ↋⒬¢⏧⏛⏄⎄*¿"
      scrambledClassName="cursor-pointer truncate"
    />
  ) : (
    <ScrambleIn
      ref={scrambleInRef}
      text={text}
      autoStart={false}
      scrambleSpeed={25}
      scrambledLetterCount={4}
      scrambledClassName="truncate"
    />
  )
})

ScrambleCombo.displayName = "ScrambleCombo"
