import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slugify } from "@/lib/slugify"

const baseDir = path.join(process.cwd(), "vault/world")

function walkDir(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry)
    return fs.statSync(fullPath).isDirectory() ? walkDir(fullPath) : [fullPath]
  })
}

export function getAllNotes() {
  const files = walkDir(baseDir).filter((f) => f.endsWith(".md"))

  return files.map((fullPath) => {
    const fileContent = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContent)

    const relativePath = path.relative(baseDir, fullPath)
    const slug = slugify(relativePath)
    const fileName = path.basename(relativePath, ".md") // <- important

    console.log("hello!")
    console.log(`[note] slug: ${slug} → ${fullPath}`)
    return {
      slug, // used for routing
      fileName, // for resolving wiki links
      title: data.title || fileName,
      tags: data.tags || [],
      fullPath,
    }
  })
}
export function debugNotes() {
  getAllNotes().forEach((n) => console.log(`[DEBUG] ${n.fileName} → ${n.slug}`))
}
