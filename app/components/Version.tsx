import getConfig from "next/config"

const { version } = require("/package.json")

/* Energized (flux, #1BE4B4) rather than neptune, held back to a low alpha so
   it reads as a live-but-quiet instrument reading rather than something
   drawing attention. Signals never tint or shade, so the colour stays flux at
   full value and only the alpha moves. */
export default function Version() {
  return (
    <div className="flex w-fit whitespace-nowrap border border-flux/40 bg-flux/[0.08] px-2 py-1 font-mono text-xs text-flux/70">
      <h3>version: {version}</h3>
    </div>
  )
}
