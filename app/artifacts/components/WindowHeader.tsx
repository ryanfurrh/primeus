"use client"

import { useArtifact } from "./ArtifactContext"
import { ArtifactDatabaseIcon } from "@/public/icons"

export default function WindowHeader() {
  const { selectedArtifact } = useArtifact()

  return (
    <div className="absolute top-6 left-1/2 z-20 flex h-10 -translate-x-1/2 items-center gap-3 rounded-[4px] border border-pale-100/40 bg-ink-900/85 px-4 backdrop-blur-[6px]">
      <ArtifactDatabaseIcon className="h-4 w-4 flex-shrink-0 text-pale-100" />
      <span className="whitespace-nowrap font-instrument text-[12px] font-bold uppercase tracking-[0.10em] text-pale-100">
        Artifact Database
      </span>
      <span className="self-stretch w-px bg-pale-100/50" />
      {/* The dropdown that used to sit here moved out to the selector button
          in the top-right; this is now purely a readout of what's loaded. */}
      <span className="whitespace-nowrap font-mono text-[16px] font-bold text-pale-100">
        {selectedArtifact}
      </span>
    </div>
  )
}
