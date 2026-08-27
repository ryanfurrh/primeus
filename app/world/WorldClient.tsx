// app/world/WorldClient.tsx
"use client"

import { useState, Fragment } from "react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/PageHeader"
import { Readout } from "@/components/data/Readout"
import { CalibratedText } from "@/components/data/CalibratedText"
import { CalibrationReadout } from "@/components/data/CalibrationReadout"
import { WorldIcon } from "@/public/icons"
import type { WorldFrame } from "@/lib/getWorldFrames"

/* The one surface that computes rather than states. Ported from the design
   system's WorldScreen.jsx (FrameIndex / FrameBody / CrossReference /
   Absent) against real vault/world content instead of the kit's embedded
   vault.js array — same parser (lib/parseVaultPage.ts), same Calibration
   mechanic already built for the Archive (lib/calibration.ts,
   components/data/CalibratedText.tsx), real linksOut/citedBy resolved from
   actual [[wikilinks]] in the vault, not fabricated. */
export function WorldClient({ frames }: { frames: WorldFrame[] }) {
  const [no, setNo] = useState(frames[0]?.no ?? "001")
  const frame = frames.find((x) => x.no === no) ?? frames[0]
  const folders = Array.from(new Set(frames.map((p) => p.folder)))
  const mean = frames.reduce((a, p) => a + p.fidelity, 0) / frames.length

  if (!frame) return null

  return (
    /* h-full, not flex-1 — <main> isn't a flex container, so flex-1 was inert
       here and the frame grew to its content, scrolling the whole page. With
       a definite height the frame fits the window (less the m-6 padding) and
       the three columns inside carry their own overflow-auto. */
    <div className="flex h-full flex-col min-h-0">
      <PageHeader
        icon={<WorldIcon className="h-4 w-4" />}
        name="World"
        readout={`REEL 01 · ${String(frames.length).padStart(2, "0")} FRAMES`}
      />
      <div className="m-6 flex flex-1 flex-col min-h-0 overflow-hidden border border-sand-400 dark:border-ink-100 bg-sand-50/90 dark:bg-ink-900/90">
        {/* Reel head. text-body-rgb isn't a token this repo imports as a CSS
            custom property (same reasoning as GridBackdrop/ArtifactData) —
            hardcoded to its real light/dark values: sand-700 105,95,82
            light, pale-100 214,195,186 dark. */}
        <div className="relative flex h-[34px] flex-shrink-0 items-stretch border-b border-sand-300 dark:border-ink-100/40">
          <div
            className="flex-1 dark:hidden"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(105,95,82,0.22) 0 1px, transparent 1px 9px)",
              backgroundPosition: "0 50%",
              backgroundSize: "100% 5px",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="hidden flex-1 dark:block"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(214,195,186,0.22) 0 1px, transparent 1px 9px)",
              backgroundPosition: "0 50%",
              backgroundSize: "100% 5px",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="flex items-center border-l border-sand-300 dark:border-ink-100/40 px-6">
            <span className="font-mono text-[12px] tracking-[0.14em] text-neptune-600 dark:text-neptune-400">
              PRIMEUS.WORLD.VAULT_OS
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex h-6 flex-shrink-0 items-center justify-between border-b border-sand-300 dark:border-ink-100/40 px-6">
          <span className="font-mono text-[9px] tracking-[0.16em] text-neptune-600 dark:text-neptune-400">
            WORLD / {frame.folder} / {frame.title.toUpperCase()}
          </span>
          <Readout fields={["PRIMEUS-VAULT", `CAL. REF ${frame.caps.words}W`, `MEAN ${mean.toFixed(3)}`]} />
        </div>

        <div className="flex flex-1 flex-row min-h-0">
          <FrameIndex frames={frames} folders={folders} current={frame.no} onPick={setNo} />
          <FrameBody frame={frame} />
          <CrossReference frame={frame} frames={frames} onPick={setNo} />
        </div>
      </div>
    </div>
  )
}

function FrameIndex({
  frames,
  folders,
  current,
  onPick,
}: {
  frames: WorldFrame[]
  folders: string[]
  current: string
  onPick: (no: string) => void
}) {
  return (
    <div className="flex w-[232px] flex-shrink-0 flex-col border-r border-sand-300 dark:border-ink-100/40">
      <div className="flex items-center justify-between border-b border-sand-300 dark:border-ink-100/40 px-3 pb-2 pt-2.5">
        <span className="font-mono text-[9px] tracking-[0.18em] text-neptune-600 dark:text-neptune-400">
          FRAME INDEX
        </span>
        <span className="font-mono text-[9px] text-sand-700/50 dark:text-pale-100/40">
          {String(frames.length).padStart(2, "0")}
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto pb-3">
        {folders.map((g) => (
          <div key={g}>
            <div className="flex items-center gap-2 px-3 pb-1.5 pt-3.5">
              <span className="h-[5px] w-[5px] bg-sand-700/50 dark:bg-pale-100/50" />
              <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.18em] text-neptune-600 dark:text-neptune-400">
                {g}
              </span>
              <span className="h-px flex-1 bg-sand-300 dark:bg-ink-100/40" />
            </div>
            {frames
              .filter((p) => p.folder === g)
              .map((it) => {
                const on = it.no === current
                return (
                  <div
                    key={it.no}
                    onClick={() => onPick(it.no)}
                    className={cn(
                      "flex cursor-pointer items-baseline gap-2 py-1 pl-[18px] pr-2.5 transition-colors",
                      on
                        ? "bg-[rgba(48,96,89,0.28)] dark:bg-[rgba(48,96,89,0.4)] shadow-[inset_2px_0_0_0_#1BE4B4]"
                        : ""
                    )}
                  >
                    <span className="whitespace-nowrap font-mono text-[9px] text-sand-700/50 dark:text-pale-100/35">
                      {it.no}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[11px] leading-4",
                        on ? "text-sand-900 dark:text-ink-50" : "text-sand-700/70 dark:text-pale-100/65"
                      )}
                    >
                      {it.title}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap font-mono text-[9px]",
                        it.empty ? "text-alert" : "text-sand-700/45 dark:text-pale-100/30"
                      )}
                    >
                      {it.fidelity.toFixed(2).slice(1)}
                    </span>
                  </div>
                )
              })}
          </div>
        ))}
      </div>
    </div>
  )
}

function FrameBody({ frame }: { frame: WorldFrame }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col">
      <div className="flex flex-shrink-0 items-end justify-between gap-6 border-b border-sand-300 dark:border-ink-100/40 px-10 pb-3.5 pt-[22px]">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="font-mono text-[9px] tracking-[0.2em] text-neptune-600 dark:text-neptune-400">
            WORLD / {frame.folder}
          </span>
          <h1 className="m-0 font-prose text-[30px] font-bold leading-[1.05] text-sand-900 dark:text-ink-50">
            {frame.title}
          </h1>
        </div>
        <CalibrationReadout fidelity={frame.fidelity} className="flex-shrink-0" />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-10 pb-10 pt-8">
        <div className="flex max-w-[600px] flex-col">
          {frame.empty ? (
            <div className="flex flex-col gap-2 border border-alert p-4 shadow-[inset_2px_0_0_0_theme(colors.alert)]">
              <span className="text-[12px] uppercase tracking-[0.14em] text-alert">
                frame exposed, nothing recorded
              </span>
              <span className="text-[11px] leading-[18px] text-sand-700/70 dark:text-pale-100/55">
                The file exists at {frame.path} and is zero bytes.{" "}
                {frame.citedBy.length
                  ? `It is cited by ${frame.citedBy.length} frame${frame.citedBy.length > 1 ? "s" : ""} that assume it is written.`
                  : "Nothing cites it."}
              </span>
            </div>
          ) : null}

          {frame.blocks.map((b, i) => {
            if (b.kind === "callout")
              return (
                <div
                  key={i}
                  className="mb-5 shadow-[inset_2px_0_0_0_#1BE4B4] bg-[rgba(48,96,89,0.06)] dark:bg-[rgba(48,96,89,0.14)] px-4 py-3"
                >
                  <span className="mb-1.5 block font-mono text-[9px] tracking-[0.16em] text-neptune-600 dark:text-neptune-400">
                    DEFINITION
                  </span>
                  <CalibratedText fidelity={frame.fidelity} className="text-[14px] leading-[22px]">
                    {b.text}
                  </CalibratedText>
                </div>
              )
            if (b.kind === "link")
              return (
                <div key={i} className="mb-3.5 mt-1 flex flex-wrap gap-2">
                  {b.targets.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 border border-sand-300 dark:border-ink-100/40 px-2 py-0.5 text-[10px] tracking-[0.08em] text-sand-700/70 dark:text-pale-100/65"
                    >
                      <span className="text-flux">→</span>
                      {t}
                    </span>
                  ))}
                </div>
              )
            if (b.kind === "heading")
              return (
                <h2
                  key={i}
                  className={cn(
                    "mb-2 mt-5 font-bold text-sand-900 dark:text-ink-50",
                    b.level <= 3 ? "text-[18px]" : "text-[15px]"
                  )}
                >
                  {b.text}
                </h2>
              )
            if (b.kind === "bullet")
              return (
                <CalibratedText
                  key={i}
                  tag="li"
                  fidelity={frame.fidelity}
                  className="mb-1.5 list-disc"
                  style={{ marginLeft: 20 + b.indent * 16 }}
                >
                  {b.text}
                </CalibratedText>
              )
            if (b.kind === "embed")
              return (
                <span key={i} className="mb-3.5 block font-mono text-[10px] italic text-sand-700/55 dark:text-pale-100/45">
                  [embed: {b.text}]
                </span>
              )
            if (b.kind === "rule") return <span key={i} className="my-4 block h-px bg-sand-300 dark:bg-ink-100/40" />
            return (
              <CalibratedText key={i} fidelity={frame.fidelity} className="mb-3.5 text-[13px] leading-[22px]">
                {b.text}
              </CalibratedText>
            )
          })}

          {frame.truncated ? (
            <div className="my-1 flex items-center gap-2.5">
              <span className="h-px w-5 bg-alert" />
              <span className="font-mono text-[9px] tracking-[0.14em] text-alert">
                SENTENCE ENDS MID-CLAUSE IN SOURCE — NOT RECONSTRUCTED
              </span>
            </div>
          ) : null}

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-5 bg-sand-300 dark:bg-ink-100/40" />
            <Readout fields={["END OF FRAME", frame.path]} tone="loading" />
            <span className="h-px flex-1 bg-sand-300 dark:bg-ink-100/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CrossReference({
  frame,
  frames,
  onPick,
}: {
  frame: WorldFrame
  frames: WorldFrame[]
  onPick: (no: string) => void
}) {
  const row = (l: string, v: string, failed?: boolean) => (
    <Fragment key={l}>
      <span className="font-mono text-[9px] tracking-[0.12em] text-sand-700/55 dark:text-pale-100/45">{l}</span>
      <span className={cn("text-right text-[10px]", failed ? "text-alert" : "text-sand-900 dark:text-pale-100")}>
        {v}
      </span>
    </Fragment>
  )

  const priority = frames
    .map((p) => ({ ...p, need: p.citedBy.length * (1 - p.fidelity) }))
    .filter((p) => p.need > 0)
    .sort((a, b) => b.need - a.need)
    .slice(0, 5)

  const link = (title: string, arrow: string) => {
    const t = frames.find((p) => p.title === title)
    return (
      <div
        key={title}
        onClick={() => t && onPick(t.no)}
        className="flex cursor-pointer items-baseline gap-2 px-3 py-1"
      >
        <span className="text-[10px] text-flux">{arrow}</span>
        <span className="min-w-0 flex-1 truncate text-[11px] leading-4 text-sand-700/70 dark:text-pale-100/65">
          {title}
        </span>
        <span className={cn("text-[9px]", t?.empty ? "text-alert" : "text-sand-700/45 dark:text-pale-100/30")}>
          {t ? t.fidelity.toFixed(2).slice(1) : "—"}
        </span>
      </div>
    )
  }

  return (
    <div className="flex w-[252px] flex-shrink-0 flex-col border-l border-sand-300 dark:border-ink-100/40">
      <div className="border-b border-sand-300 dark:border-ink-100/40 px-3 pb-2 pt-2.5">
        <span className="font-mono text-[9px] tracking-[0.18em] text-neptune-600 dark:text-neptune-400">
          CROSS-REFERENCE
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-b border-sand-300 dark:border-ink-100/40 px-3 pb-4 pt-3.5">
          {row("FRAME", frame.no)}
          {row("WORDS", String(frame.words).padStart(3, "0"), !frame.words)}
          {row("OUT-LINKS", String(frame.linksOut.length).padStart(2, "0"))}
          {row("CITED BY", String(frame.citedBy.length).padStart(2, "0"))}
          {row("FILED", frame.folder === "UNFILED" ? "NO" : "YES", frame.folder === "UNFILED")}
          {row("CALIBRATION", frame.fidelity.toFixed(3))}
        </div>

        <div className="px-3 pb-1 pt-3.5">
          <span className="font-mono text-[9px] tracking-[0.16em] text-neptune-600 dark:text-neptune-400">
            LINKS OUT
          </span>
        </div>
        {frame.linksOut.length ? frame.linksOut.map((t) => link(t, "→")) : <Absent />}

        <div className="px-3 pb-1 pt-4">
          <span className="font-mono text-[9px] tracking-[0.16em] text-neptune-600 dark:text-neptune-400">
            CITED BY
          </span>
        </div>
        {frame.citedBy.length ? frame.citedBy.map((t) => link(t, "←")) : <Absent />}

        <div className="mt-3 border-t border-sand-300 dark:border-ink-100/40 px-3 pb-1 pt-4">
          <span className="font-mono text-[9px] tracking-[0.16em] text-neptune-600 dark:text-neptune-400">
            WRITING PRIORITY
          </span>
          <span className="mt-0.5 block text-[9px] leading-[14px] text-sand-700/45 dark:text-pale-100/30">
            most cited, least written
          </span>
        </div>
        {priority.map((p) => (
          <div key={p.no} onClick={() => onPick(p.no)} className="flex cursor-pointer items-baseline gap-2 px-3 py-1">
            <span className="text-[9px] text-sand-700/50 dark:text-pale-100/35">{p.no}</span>
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-[11px] leading-4",
                p.empty ? "text-alert" : "text-sand-700/70 dark:text-pale-100/65"
              )}
            >
              {p.title}
            </span>
            <span className="text-[9px] text-neptune-600 dark:text-neptune-400">{p.need.toFixed(2)}</span>
          </div>
        ))}

        <div className="mx-3 my-5 flex items-center gap-2 border border-sand-300 dark:border-ink-100/40 px-3 py-2.5">
          <span className="font-mono text-[9px] tracking-[0.12em] text-sand-700/60 dark:text-pale-100/45">
            FIDELITY IS COMPUTED, NEVER SET
          </span>
        </div>
      </div>
    </div>
  )
}

function Absent() {
  return <span className="block px-3 py-0.5 text-[10px] text-sand-700/40 dark:text-pale-100/28">none recorded</span>
}
