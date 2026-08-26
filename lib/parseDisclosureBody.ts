// lib/parseDisclosureBody.ts
import { isDangling } from "@/lib/calibration"

export type DisclosureBlock =
  | { kind: "heading"; level: number; text: string }
  | { kind: "image"; alt: string; src: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; rows: string[][] }
  | { kind: "p"; text: string }

/* A small, focused markdown -> block parser for what the disclosure records
   actually contain (headings, paragraphs, ordered/unordered lists, images,
   tables) — not a general markdown engine. Structure (headings, images,
   tables) is kept out of the calibration mechanic; only prose (paragraphs,
   list items) is eligible to degrade, matching "structure never decays". */
export function parseDisclosureBody(content: string): { blocks: DisclosureBlock[]; truncated: boolean } {
  const lines = content.split("\n")
  const blocks: DisclosureBlock[] = []
  let truncated = false

  let i = 0
  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line) {
      i++
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length, text: stripInline(heading[2]) })
      i++
      continue
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (image) {
      blocks.push({ kind: "image", alt: image[1], src: image[2] })
      i++
      continue
    }

    if (/^\|/.test(line)) {
      const rows: string[][] = []
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        const cells = lines[i]
          .trim()
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim())
        if (!/^:?-+:?$/.test(cells.join(""))) rows.push(cells)
        i++
      }
      blocks.push({ kind: "table", rows })
      continue
    }

    const listItem = line.match(/^(?:[-*]|\d+\.)\s+(.*)$/)
    if (listItem) {
      const ordered = /^\d+\./.test(line)
      const items: string[] = []
      while (i < lines.length) {
        const m = lines[i].trim().match(/^(?:[-*]|\d+\.)\s+(.*)$/)
        if (!m) break
        items.push(stripInline(m[1]))
        i++
      }
      blocks.push({ kind: "list", ordered, items })
      continue
    }

    // Paragraph: join wrapped lines until a blank line or a new block starts.
    let text = line
    i++
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|!\[|\||[-*]\s|\d+\.\s)/.test(lines[i].trim())) {
      text += " " + lines[i].trim()
      i++
    }
    if (isDangling(text)) truncated = true
    blocks.push({ kind: "p", text: stripInline(text) })
  }

  return { blocks, truncated }
}

function stripInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .trim()
}
