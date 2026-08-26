import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Calibration } from "@/lib/calibration"
import { parseVaultPage, type WorldBlock } from "@/lib/parseVaultPage"

const baseDir = path.join(process.cwd(), "vault/world")

function walkDir(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry)
    return fs.statSync(fullPath).isDirectory() ? walkDir(fullPath) : [fullPath]
  })
}

export interface WorldFrame {
  no: string
  folder: string
  title: string
  stem: string
  path: string
  blocks: WorldBlock[]
  words: number
  truncated: boolean
  empty: boolean
  linksOut: string[]
  citedBy: string[]
  fidelity: number
  caps: { words: number; out: number; back: number }
}

/* Reads vault/world/**\/*.md and runs the same two-pass resolution
   vault.js's parseVault() does: parse every page in isolation first
   (blocks, prose, raw out-link target strings), then resolve those
   targets against every page's title/stem to build real linksOut/citedBy,
   and only then compute fidelity — caps and per-page calibration both
   need the whole corpus, not one page at a time. */
export function getWorldFrames(): WorldFrame[] {
  const files = walkDir(baseDir).filter((f) => f.endsWith(".md"))

  const raw = files.map((fullPath) => {
    const fileContent = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContent)
    const relativePath = path.relative(baseDir, fullPath)
    // First path segment only, not the full dirname — Mechanics/Alignment/
    // and Mechanics/Skills/ both flatten to one "MECHANICS" group, matching
    // how vault.js itself grouped these (folder is a topic label, not a
    // literal directory listing). Top-level files (no subfolder) are
    // UNFILED, same convention vault.js used for its own top-level pages.
    const segments = relativePath.split(path.sep)
    const folder = segments.length > 1 ? segments[0].toUpperCase() : "UNFILED"
    const stem = path.basename(relativePath, ".md")
    return {
      folder,
      title: (data.title as string) || stem,
      stem,
      path: relativePath,
      parsed: parseVaultPage(content),
    }
  })

  const index = new Map<string, number>()
  raw.forEach((p, i) => {
    index.set(p.title.toLowerCase(), i)
    index.set(p.stem.toLowerCase(), i)
  })

  const resolved = raw.map((p, pi) => {
    const out = Array.from(
      new Set(p.parsed.out.map((x) => index.get(x.toLowerCase())).filter((i): i is number => i != null && i !== pi))
    )
    return { ...p, out }
  })

  const withLinks = resolved.map((p, i) => ({
    ...p,
    no: String(i + 1).padStart(3, "0"),
    linksOut: p.out.map((j) => resolved[j].title),
    citedBy: resolved.filter((o, j) => j !== i && o.out.includes(i)).map((o) => o.title),
  }))

  const caps = Calibration.caps(
    withLinks.map((p) => ({
      folder: p.folder,
      words: p.parsed.words,
      linksOut: p.linksOut,
      citedBy: p.citedBy,
    }))
  )

  return withLinks.map((p) => ({
    no: p.no,
    folder: p.folder,
    title: p.title,
    stem: p.stem,
    path: p.path,
    blocks: p.parsed.blocks,
    words: p.parsed.words,
    truncated: p.parsed.truncated,
    empty: p.parsed.empty,
    linksOut: p.linksOut,
    citedBy: p.citedBy,
    fidelity: Calibration.compute(
      { words: p.parsed.words, linksOut: p.linksOut, citedBy: p.citedBy, truncated: p.parsed.truncated, folder: p.folder },
      caps
    ),
    caps,
  }))
}
