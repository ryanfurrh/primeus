// app/documentation/DocumentationClient.tsx
"use client"

import { useState, ReactNode } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Readout } from "@/components/data/Readout"
import { Badge } from "@/components/data/Badge"
import { CalibrationReadout } from "@/components/data/CalibrationReadout"
import { GridBackdrop } from "@/components/GridBackdrop"
import { SourceKey } from "./components/SourceKey"
import { RecordRow } from "./components/RecordRow"
import { BackKey } from "./components/BackKey"
import { DocumentSheet } from "./components/DocumentSheet"
import { groupDisclosures, type DisclosureFull, type DisclosureGroup } from "@/lib/disclosures"
import { ArtifactDatabaseIcon, FluxIcon, DocumentationIcon } from "@/public/icons"

const SOURCE_ICON: Record<string, ReactNode> = {
  Flux: <FluxIcon className="h-full w-full" />,
  Artifacts: <ArtifactDatabaseIcon className="h-full w-full" />,
  History: <DocumentationIcon className="h-full w-full" />,
}

const SOURCE_SUB: Record<string, string> = {
  Flux: "Flux research notes",
  Artifacts: "Artifact system documentation",
  History: "Origin & background notes",
}

/* Reads in three moves, and the sequencing is the design — no index next to
   an empty state. Ported from the design system's DocumentationScreen.jsx,
   adapted to real vault/disclosures content: real sources (folder names,
   not fictional institutions), real record counts, no fabricated
   "SEALED"/"PARTIAL" status since nothing here is actually incomplete. */
export function DocumentationClient({ records }: { records: DisclosureFull[] }) {
  const groups = groupDisclosures(records)
  const [group, setGroup] = useState<string | null>(null)
  const [sel, setSel] = useState<string | null>(null)
  const record = records.find((r) => r.slug === sel) ?? null

  const years = records.map((r) => (r.date ? r.date.slice(0, 4) : null)).filter(Boolean) as string[]
  const yearRange = years.length ? `${Math.min(...years.map(Number))}—${Math.max(...years.map(Number))}` : null

  return (
    <div className="relative flex flex-1 flex-col min-h-[600px]">
      <GridBackdrop variant="graph" />
      <PageHeader
        name="Archive"
        icon={<DocumentationIcon className="h-4 w-4" />}
        readout={`${String(records.length).padStart(2, "0")} RECORDS`}
      />
      <div className="relative flex flex-1 flex-col">
        {!group ? (
          <ChooseSource records={records} groups={groups} yearRange={yearRange} onPick={setGroup} />
        ) : !record ? (
          <ChooseRecord
            groups={groups}
            group={group}
            onBack={() => setGroup(null)}
            onPick={setSel}
          />
        ) : (
          <ReadRecord
            groups={groups}
            all={records}
            record={record}
            onPick={setSel}
            onBack={() => setSel(null)}
          />
        )}
      </div>
    </div>
  )
}

function ChooseSource({
  records,
  groups,
  yearRange,
  onPick,
}: {
  records: DisclosureFull[]
  groups: DisclosureGroup[]
  yearRange: string | null
  onPick: (source: string) => void
}) {
  return (
    <div className="mx-auto my-auto flex max-w-[780px] flex-col items-center px-10 text-center">
      <span className="font-mono text-[9px] tracking-[0.2em] text-neptune-600 dark:text-neptune-400">
        {String(records.length).padStart(2, "0")} RECORDS · {String(groups.length).padStart(2, "0")} SOURCES
        {yearRange ? ` · ${yearRange}` : ""}
      </span>
      <span className="mt-3.5 font-prose text-[46px] font-bold leading-[1.05] text-sand-900 dark:text-ink-50">
        The Disclosure Index
      </span>
      <p className="mt-4 max-w-[560px] font-instrument text-[15px] leading-[25px] text-sand-700/85 dark:text-pale-100/80">
        Every disclosed record concerning the world of Primeūs. Scans run at 600 DPI. Sealed
        passages are shown as they were found, not reconstructed.
      </p>
      <span className="mb-3 mt-[34px] font-instrument text-[12px] font-bold uppercase tracking-[0.10em] text-neptune-600 dark:text-neptune-400">
        Select a source
      </span>
      <div className="flex flex-row gap-3">
        {groups.map((g) => (
          <SourceKey
            key={g.source}
            group={g}
            icon={SOURCE_ICON[g.source] ?? <DocumentationIcon className="h-full w-full" />}
            sub={SOURCE_SUB[g.source] ?? "Disclosure records"}
            onPick={onPick}
          />
        ))}
      </div>
    </div>
  )
}

function ChooseRecord({
  groups,
  group,
  onBack,
  onPick,
}: {
  groups: DisclosureGroup[]
  group: string
  onBack: () => void
  onPick: (slug: string) => void
}) {
  const g = groups.find((x) => x.source === group)
  if (!g) return null
  return (
    <div className="mx-auto my-auto flex w-[560px] flex-col items-center px-10">
      <div className="flex w-full items-center gap-3 border-b border-sand-300 dark:border-ink-100/40 pb-3">
        <BackKey onClick={onBack} />
        <span className="mr-auto font-instrument text-[16px] font-bold text-sand-900 dark:text-ink-50">
          {g.source}
        </span>
        <Readout fields={[`${String(g.records.length).padStart(2, "0")} RECORDS`]} />
      </div>
      <span className="self-start pb-2 pt-3 font-instrument text-[12px] font-bold uppercase tracking-[0.10em] text-neptune-600 dark:text-neptune-400">
        Select a record to examine
      </span>
      <div className="flex w-full flex-col border border-sand-300 dark:border-ink-100/40">
        {g.records.map((r) => (
          <RecordRow key={r.slug} record={r} onClick={() => onPick(r.slug)} />
        ))}
      </div>
    </div>
  )
}

function ReadRecord({
  groups,
  all,
  record,
  onPick,
  onBack,
}: {
  groups: DisclosureGroup[]
  all: DisclosureFull[]
  record: DisclosureFull
  onPick: (slug: string) => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-1 flex-row gap-6 p-6">
      <div className="flex w-[296px] flex-shrink-0 flex-col overflow-auto border border-sand-300 dark:border-ink-100/40 bg-[rgba(38,38,38,0.08)] dark:bg-[rgba(38,38,38,0.62)]">
        <div className="flex h-10 flex-shrink-0 items-center justify-between border-b border-sand-300 dark:border-ink-100/40 px-4">
          <span className="font-instrument text-[12px] font-bold uppercase tracking-[0.10em] text-sand-900 dark:text-ink-50">
            Disclosure Index
          </span>
          <Readout fields={[`${String(all.length).padStart(2, "0")} RECORDS`]} />
        </div>
        {groups.map((g) => (
          <div key={g.source}>
            <div className="px-3 pb-1.5 pt-3.5 font-mono text-[9px] tracking-[0.14em] text-neptune-600 dark:text-neptune-400">
              {g.source}
            </div>
            {g.records.map((r) => (
              <RecordRow key={r.slug} record={r} selected={record.slug === r.slug} onClick={() => onPick(r.slug)} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center overflow-hidden">
        <div className="mb-4 flex flex-shrink-0 items-center gap-3">
          <BackKey onClick={onBack} />
          <Readout fields={[record.fileNo]} tone="full" />
          <span className="h-3 w-px bg-sand-300 dark:bg-ink-100/40" />
          <Readout fields={[`SCAN ${record.scan}`, "600 DPI"]} />
          <CalibrationReadout fidelity={record.fidelity} />
          <Badge signal>Light Table</Badge>
        </div>
        <div className="flex flex-1 min-h-0 justify-center overflow-hidden">
          <div style={{ transform: "scale(0.66)", transformOrigin: "top center" }}>
            <DocumentSheet record={record} />
          </div>
        </div>
      </div>
    </div>
  )
}
