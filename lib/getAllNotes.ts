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

    return {
      slug, // this becomes the URL path
      title: data.title || slug.split("/").pop(),
      tags: data.tags || [],
    }
  })
}
