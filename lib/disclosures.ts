// lib/disclosures.ts
/* Types + pure logic shared between the server (lib/getAllDisclosures.ts,
   which reads the filesystem) and the client (DocumentationClient.tsx,
   which needs "use client" for the three-move UI state). Kept in its own
   fs-free module: a client component that value-imports anything from a
   module with a top-level `import fs from "fs"` pulls the whole module
   into the browser bundle and fails to compile, even if all it actually
   uses is a type or a pure function. */
import type { DisclosureBlock } from "@/lib/parseDisclosureBody"

export interface Disclosure {
  slug: string
  source: string
  title: string
  subtitle?: string
  date?: string
  entry?: string
  fileNo: string
  scan: string
  words: number
  empty: boolean
  fullPath: string
}

export interface DisclosureFull extends Disclosure {
  blocks: DisclosureBlock[]
  truncated: boolean
  fidelity: number
}

export interface DisclosureGroup {
  source: string
  records: Disclosure[]
}

export function groupDisclosures(all: Disclosure[]): DisclosureGroup[] {
  const bySource = new Map<string, Disclosure[]>()
  all.forEach((d) => {
    const list = bySource.get(d.source) ?? []
    list.push(d)
    bySource.set(d.source, list)
  })
  return Array.from(bySource.entries()).map(([source, records]) => ({ source, records }))
}
