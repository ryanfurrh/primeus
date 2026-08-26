// app/artifacts/components/ArtifactSelector.tsx
"use client"

import * as Select from "@radix-ui/react-select"
import { useArtifact } from "./ArtifactContext"
import { ArtifactIndex } from "./ArtifactIndex"
import { ArrowY } from "@/public/icons"

/* WindowHeader's selector — real, wired to ArtifactContext. Replaces a
   reference to a component named ArtifactSelector that never existed in the
   repo (a pre-existing TS2307 in the Stage 1 baseline). Modeled on
   ModelSelect.tsx's existing Radix pattern, but switches ArtifactContext's
   local selection state instead of navigating. */
export function ArtifactSelector() {
  const { selectedArtifact, setSelectedArtifact } = useArtifact()

  return (
    <Select.Root value={selectedArtifact} onValueChange={setSelectedArtifact}>
      <Select.Trigger
        aria-label="Artifact"
        className="flex flex-row items-center justify-between gap-2 px-3 py-1 font-mono text-[12px] text-pale-100 border outline-none border-pale-100/40"
      >
        <Select.Value />
        <ArrowY />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 border bg-ink-900 border-pale-100/40">
          <Select.Viewport className="flex flex-col p-1">
            {ArtifactIndex.map((artifact) => (
              <Select.Item
                key={artifact.name}
                value={artifact.name}
                className="px-3 py-1.5 font-mono text-[12px] text-pale-100 outline-none cursor-pointer hover:bg-pale-100/10"
              >
                <Select.ItemText>{artifact.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
