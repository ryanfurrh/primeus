import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slugify } from "@/lib/slugify"
import { Calibration, countWords } from "@/lib/calibration"
import { parseDisclosureBody } from "@/lib/parseDisclosureBody"
import type { Disclosure, DisclosureFull } from "@/lib/disclosures"

export type { Disclosure, DisclosureFull, DisclosureGroup } from "@/lib/disclosures"
export { groupDisclosures } from "@/lib/disclosures"

const baseDir = path.join(process.cwd(), "vault/disclosures")

function walkDir(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry)
    return fs.statSync(fullPath).isDirectory() ? walkDir(fullPath) : [fullPath]
  })
}

const SCAN_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

/* Mirrors lib/getAllNotes.ts's read-from-disk pattern for vault/world.
   Source = the record's parent folder under vault/disclosures (History,
   Artifacts, Flux, ...) — the folders exist specifically to group records
   into "choose a source" per the site spec's three-move design.
   fileNo/scan are derived, not authored: fileNo from the real source +
   entry number, scan assigned alphabetically in walk order. Neither
   invents content — they format real metadata into an identifier. */
export function getAllDisclosures(): Disclosure[] {
  const files = walkDir(baseDir).filter((f) => f.endsWith(".md"))

  return files.map((fullPath, i) => {
    const fileContent = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContent)

    const relativePath = path.relative(baseDir, fullPath)
    const source = relativePath.split(path.sep)[0]
    const slug = slugify(relativePath)
    const fileName = path.basename(relativePath, ".md")
    const words = countWords(content)

    return {
      slug,
      source,
      title: data.title || fileName,
      subtitle: data.subtitle,
      date: data.date,
      entry: data.entry,
      fileNo: `${source.toUpperCase()}-${String(data.entry ?? i + 1).padStart(2, "0")}`,
      scan: SCAN_LETTERS[i % SCAN_LETTERS.length],
      words,
      empty: !content.trim(),
      fullPath,
    }
  })
}

/* The full read: metadata + parsed body + computed fidelity, for every
   record. Eagerly loads everything server-side (the corpus is a handful of
   records — no reason for per-record fetching) so the client component that
   drives the three-move UI never touches the filesystem itself. */
export function getAllDisclosuresWithContent(): DisclosureFull[] {
  const all = getAllDisclosures()
  const caps = Calibration.caps(all.map((d) => ({ words: d.words, linksOut: [], citedBy: [] })))

  return all.map((d) => {
    const fileContent = fs.readFileSync(d.fullPath, "utf8")
    const { content } = matter(fileContent)
    const { blocks, truncated } = parseDisclosureBody(content)
    const fidelity = Calibration.compute({ words: d.words, linksOut: [], citedBy: [], truncated }, caps)
    return { ...d, blocks, truncated, fidelity }
  })
}
