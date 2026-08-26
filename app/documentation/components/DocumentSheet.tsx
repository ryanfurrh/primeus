// app/documentation/components/DocumentSheet.tsx
import Image from "next/image"
import type { CSSProperties } from "react"
import { courierPrime } from "@/app/fonts"
import { cn } from "@/lib/utils"
import { CalibratedText } from "@/components/data/CalibratedText"
import type { DisclosureFull } from "@/lib/disclosures"
import type { DisclosureBlock } from "@/lib/parseDisclosureBody"

const field: CSSProperties = { letterSpacing: "0.1em", color: "#5A544A" }

/* A photographed object, so the three system voices don't apply inside it —
   its own paper, ink, Courier Prime. No TOP SECRET stamp or TO/FROM/SUBJECT
   fields (the kit's memo template): these records aren't intercepted
   classified correspondence, they're real authored notes, so the masthead
   uses their real metadata (title, source, entry, date, fileNo) instead of
   fabricating a classification banner or a sender/recipient that doesn't
   exist. Same reasoning for the footer — no invented "PAGE 1 OF 4"; these
   documents aren't paginated. Redaction (a solid #1C1A16-on-#1C1A16 block,
   never a blur) is a real, reusable capability here but nothing in the
   current disclosures has content actually marked for withholding, so none
   renders — not inventing a redaction where none exists. */
export function DocumentSheet({ record }: { record: DisclosureFull }) {
  return (
    <div
      className={cn(courierPrime.className, "relative box-border w-[604px] px-[60px] pb-16 pt-14")}
      style={{ background: "#E6E1D3", color: "#1C1A16" }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ background: "repeating-linear-gradient(90deg, #1C1A16 0 14px, transparent 14px 26px)" }}
      />

      <div className="mb-1 flex flex-col gap-0.5">
        <span style={{ fontSize: 11, letterSpacing: "0.22em" }}>{record.source.toUpperCase()} DISCLOSURE</span>
        <span style={{ fontSize: 11, ...field }}>
          ENTRY {record.entry ?? "—"} · {record.date ?? "undated"}
        </span>
      </div>

      <div className="my-[18px] h-px" style={{ background: "#1C1A16" }} />

      <h1 className="mb-5 text-[26px] font-bold leading-tight" style={{ margin: "0 0 20px" }}>
        {record.title}
      </h1>

      <div
        className="mb-[26px] grid gap-x-4 gap-y-1.5"
        style={{ gridTemplateColumns: "88px 1fr", fontSize: 12, lineHeight: "18px" }}
      >
        <span style={field}>FILE</span>
        <span>{record.fileNo}</span>
        <span style={field}>DATE</span>
        <span>{record.date ?? "undated"}</span>
        <span style={field}>SOURCE</span>
        <span>{record.source}</span>
        {record.subtitle ? (
          <>
            <span style={field}>SUBJECT</span>
            <span>{record.subtitle}</span>
          </>
        ) : null}
      </div>

      {record.empty ? (
        <p className="italic" style={{ color: "#5A544A", fontSize: 13 }}>
          no prose recorded on this page
        </p>
      ) : (
        record.blocks.map((b, i) => <Block key={i} block={b} fidelity={record.fidelity} />)
      )}

      <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(28,26,22,0.35)" }}>
        <span style={{ fontSize: 10, ...field }}>
          {record.empty ? "EMPTY DISCLOSURE" : "END OF DISCLOSURE"} · {record.fileNo}
        </span>
        <span style={{ fontSize: 10, ...field }}>SCAN {record.scan}</span>
      </div>
    </div>
  )
}

function Block({ block, fidelity }: { block: DisclosureBlock; fidelity: number }) {
  switch (block.kind) {
    case "heading": {
      const size = block.level <= 2 ? 18 : 15
      return (
        <h2 className="mb-2 mt-5 font-bold" style={{ fontSize: size }}>
          {block.text}
        </h2>
      )
    }
    case "image":
      return (
        <div className="my-4">
          <Image src={block.src} alt={block.alt} width={480} height={320} className="h-auto w-full max-w-[480px]" />
        </div>
      )
    case "table":
      return (
        <table className="my-4 w-full border-collapse text-[12px]" style={{ borderColor: "#1C1A16" }}>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border px-2 py-1" style={{ borderColor: "rgba(28,26,22,0.35)" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    case "list":
      return (
        <ol className="my-3 flex flex-col gap-1 pl-5" style={{ listStyleType: block.ordered ? "decimal" : "disc" }}>
          {block.items.map((item, ii) => (
            <CalibratedText key={ii} tag="li" fidelity={fidelity}>
              {item}
            </CalibratedText>
          ))}
        </ol>
      )
    case "p":
      return (
        <CalibratedText tag="p" fidelity={fidelity} className="mb-4">
          {block.text}
        </CalibratedText>
      )
  }
}
