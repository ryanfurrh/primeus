// lib/parseVaultPage.ts
/* Ported from the design system's vault.js parseVault() — same algorithm,
   adapted to run per-file against real frontmatter+markdown instead of an
   embedded raw-string array. Handles what this vault actually uses:
   [!info] callouts with > continuation, piped and anchored wikilinks,
   #### rules and headings, tab-nested bullets, ![[embeds]]. A wikilink
   alone on its line is navigation and does not count as prose. */

export type WorldBlock =
  | { kind: "rule" }
  | { kind: "callout"; text: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "bullet"; indent: number; text: string }
  | { kind: "embed"; text: string }
  | { kind: "link"; targets: string[] }
  | { kind: "p"; text: string }

export interface ParsedVaultPage {
  blocks: WorldBlock[]
  words: number
  truncated: boolean
  dangling: number
  empty: boolean
  out: string[] // raw wikilink target strings, not yet resolved to page indices
}

const DANGLING =
  /\b(of|the|a|an|and|or|with|to|for|in|on|at|by|from|as|into|than|that|but|is|are|was|were|be|been|both)$/i

function targets(s: string): string[] {
  return (s.match(/\[\[([^\]]+)\]\]/g) || [])
    .map((m) => m.slice(2, -2).split("|")[0].trim())
    .filter((t) => t && !t.startsWith("#"))
    .map((t) => t.split("#")[0].trim())
}

function label(s: string): string {
  return s
    .replace(/!\[\[([^\]]+)\]\]/g, "")
    .replace(/\[\[([^\]]+)\]\]/g, (_m, t: string) => t.split("|").pop() as string)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim()
}

export function parseVaultPage(raw: string): ParsedVaultPage {
  const blocks: WorldBlock[] = []
  const out: string[] = []
  let prose = ""
  let pending: { kind: "callout"; text: string } | null = null

  const flush = () => {
    if (pending) {
      blocks.push(pending)
      pending = null
    }
  }

  raw.split("\n").forEach((line) => {
    const indent = (line.match(/^[\t ]*/)?.[0].match(/\t|    /g) || []).length
    const t = line.trim()
    if (!t) {
      flush()
      return
    }

    if (/^-{3,}$/.test(t)) {
      flush()
      blocks.push({ kind: "rule" })
      return
    }

    const call = t.match(/^>\s*\[!\s*\w*\]\s*(.*)$/)
    if (call) {
      flush()
      pending = { kind: "callout", text: label(call[1].replace(/^-+$/, "")) }
      return
    }
    if (t.startsWith(">") && pending && pending.kind === "callout") {
      const more = label(t.replace(/^>\s*/, ""))
      pending.text = (pending.text + " " + more).trim()
      return
    }
    if (pending && pending.kind === "callout" && !t.startsWith("-") && !t.startsWith("#")) {
      pending.text = (pending.text + " " + label(t)).trim()
      targets(t).forEach((x) => out.push(x))
      return
    }
    flush()

    const head = t.match(/^(#{2,6})\s*(.+)$/)
    if (head) {
      targets(head[2]).forEach((x) => out.push(x))
      blocks.push({ kind: "heading", level: head[1].length, text: label(head[2]) })
      return
    }

    // (?=\s) requires the -/* bullet marker to be followed by whitespace —
    // without it, this matches the leading `*` of a **bold** line (a real
    // bug ported faithfully from vault.js's own identical regex, but not
    // one worth reproducing: it visibly breaks lines like "**Usage**:").
    const bullet = t.match(/^(?:[-*](?=\s)|\d+\.)\s*(.*)$/)
    if (bullet) {
      const body = bullet[1]
      const inner = body.match(/^(#{2,6})\s*(.+)$/)
      if (inner) {
        targets(inner[2]).forEach((x) => out.push(x))
        blocks.push({ kind: "heading", level: inner[1].length, text: label(inner[2]) })
        return
      }
      if (!body) return
      targets(body).forEach((x) => out.push(x))
      const text = label(body)
      prose += " " + text
      blocks.push({ kind: "bullet", indent, text })
      return
    }

    if (/^!\[\[/.test(t)) {
      blocks.push({ kind: "embed", text: t.replace(/[![\]]/g, "") })
      return
    }

    if (/^(\[\[[^\]]+\]\]\s*)+$/.test(t)) {
      const list = targets(t)
      list.forEach((x) => out.push(x))
      blocks.push({ kind: "link", targets: list })
      return
    }

    targets(t).forEach((x) => out.push(x))
    const text = label(t)
    prose += " " + text
    blocks.push({ kind: "p", text })
  })
  flush()

  blocks
    .filter((b): b is { kind: "callout"; text: string } => b.kind === "callout")
    .forEach((b) => {
      prose += " " + b.text
    })

  const words = prose
    .replace(/[#*_>|]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const dangling = blocks.filter((b) => b.kind === "p" && DANGLING.test(b.text.trim().replace(/[.,;:]$/, ""))).length
  const truncated = dangling > 0

  return { blocks, words, truncated, dangling, empty: raw.trim() === "", out }
}
