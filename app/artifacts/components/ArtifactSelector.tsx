// app/artifacts/components/ArtifactSelector.tsx
"use client"

import * as Select from "@radix-ui/react-select"
import { useArtifact } from "./ArtifactContext"
import { ArtifactIndex } from "./ArtifactIndex"
import { ArrowY } from "@/public/icons"

/* The artifact viewport's single selector — it loads an artifact into the
   stage via ArtifactContext. This used to sit inside WindowHeader as a small
   in-title-bar dropdown alongside a separate "Select a model" button; it now
   takes that button's position and is the only selector on the page.

   Not the same thing as ModelSelect, which is still used by
   app/artifacts/[model]/page.tsx and genuinely navigates between per-model
   detail routes — that one is left alone. */
export function ArtifactSelector() {
  const { selectedArtifact, setSelectedArtifact } = useArtifact()

  return (
    <Select.Root value={selectedArtifact} onValueChange={setSelectedArtifact}>
      <Select.Trigger
        aria-label="Artifact"
        className="flex w-48 flex-row items-center justify-between gap-4 rounded-[4px] border border-pale-100/50 bg-ink-900/85 px-4 py-2 font-mono text-[12px] text-pale-100 outline-none backdrop-blur-[6px]"
      >
        <Select.Value placeholder="Select a model" />
        <ArrowY />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 rounded-[4px] border border-pale-100/40 bg-ink-900/95 backdrop-blur-[6px]"
        >
          <Select.Viewport className="flex flex-col p-1">
            {ArtifactIndex.map((artifact) => (
              <Select.Item
                key={artifact.name}
                value={artifact.name}
                className="cursor-pointer px-3 py-1.5 font-mono text-[12px] text-pale-100 outline-none data-[highlighted]:bg-pale-100/10"
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
