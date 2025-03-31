import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import { getAllNotes } from "./getAllNotes"

export async function getNote(slug: string) {
  const noteIndex = getAllNotes()

  const match = noteIndex.find((note) => note.slug === slug)
  if (!match) return null

  const fullPath = match.fullPath
  const fileContent = fs.readFileSync(fullPath, "utf8")

  if (!fileContent.trim()) {
    return {
      slug,
      frontmatter: {},
      contentHtml: "<p><em>This note is empty.</em></p>",
    }
  }

  const { data, content } = matter(fileContent)

  // resolve wiki links
  const parsedContent = content.replace(/\[\[([^\]]+)\]\]/g, (_, rawLink) => {
    const [fullTarget, alias] = rawLink.split("|")
    const [linkName, heading] = fullTarget.split("#")

    const linkMatch = noteIndex.find(
      (note) => note.fileName.toLowerCase() === linkName.trim().toLowerCase()
    )

    const linkedSlug = linkMatch?.slug || linkName
    const anchor = heading ? `#${heading.trim().toLowerCase().replace(/\s+/g, "-")}` : ""
    const display = alias || heading || linkName

    return `[${display}](/world/${linkedSlug}${anchor})`
  })

  const processedContent = await remark().use(remarkGfm).use(html).process(parsedContent)

  return {
    slug,
    frontmatter: data,
    contentHtml: processedContent.toString(),
  }
}
