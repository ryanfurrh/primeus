// lib/getNote.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import { slugify } from "@/lib/slugify"

const notesDirectory = path.join(process.cwd(), "vault/world")

export async function getNote(slug: string) {
  const fullPath = path.join(notesDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const fileContent = fs.readFileSync(fullPath, "utf8")

  // If file exists but is completely empty, still return a placeholder
  if (!fileContent.trim()) {
    return {
      slug,
      frontmatter: {},
      contentHtml: "<p><em>This note is empty.</em></p>",
    }
  }

  const { data, content } = matter(fileContent)

  const parsedContent = content.replace(/\[\[([^\]]+)\]\]/g, (_, rawLink) => {
    const [link, label] = rawLink.split("|")
    const cleaned = slugify(link)
    const display = label || link.split("/").pop()
    return `[${display}](\/world\/${cleaned})`
  })

  const processedContent = await remark().use(remarkGfm).use(html).process(parsedContent)

  return {
    slug,
    frontmatter: data,
    contentHtml: processedContent.toString(),
  }
}
