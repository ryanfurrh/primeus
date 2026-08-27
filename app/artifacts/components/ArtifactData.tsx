"use client"

import { ReactNode } from "react"
import { useArtifact } from "./ArtifactContext"
import { ArtifactIndex } from "./ArtifactIndex"
import { IntegrityBar } from "@/components/data/Badge"

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Floating chrome is fixed dark glass regardless of page mode — spec:
          "on rgba(16,16,16,0.85)", not a token that reflows with data-mode.
          So wash-rgb/field-label/text-body stay at their dark values always,
          same as WindowHeader's fixed text-pale-100 — not dark: variants. */}
      <span className="w-fit p-1 font-mono text-[12px] font-semibold tracking-[0.06em] text-neptune-400 bg-[rgba(48,96,89,0.5)]">
        {label}
      </span>
      {typeof children === "string" ? (
        <p className="m-0 font-mono text-[12px] leading-4 text-pale-100">{children}</p>
      ) : (
        children
      )}
    </div>
  )
}

/* The data panel — real ArtifactContext/ArtifactIndex data through the kit's
   Disclosure Date / Usage / Integrity treatment. Welcome has no Usage and is
   the landing artifact, so it's skipped here, matching the kit's own
   hasData = a.name !== "Welcome" gate. */
export default function ArtifactData() {
  const { selectedArtifact } = useArtifact()
  const data = ArtifactIndex.find((artifact) => artifact.name === selectedArtifact)

  if (!data || data.name === "Welcome") return null

  return (
    <div className="flex flex-col gap-3 rounded-[4px] border border-pale-100/40 bg-ink-900/85 p-4 backdrop-blur-[6px]">
      <h1 className="m-0 font-instrument text-[28px] font-bold uppercase leading-none text-neptune-400/70">
        {data.name}
      </h1>
      <Field label="Disclosure Date:">{data.date ?? "—"}</Field>
      {data.use ? <Field label="Usage:">{data.use}</Field> : null}
      <Field label="Integrity:">
        <IntegrityBar value={data.integrity ?? 0} total={6} />
      </Field>
    </div>
  )
}
