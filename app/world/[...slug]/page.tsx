// app/world/[...slug]/page.tsx
import { getNote } from "@/lib/getNote"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"

export default async function WorldNotePage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/")
  const note = await getNote(slug)

  if (!note) return notFound()

  return (
    <article className="max-w-3xl p-6 mx-auto prose dark:prose-invert">
      <h1>{note.frontmatter.title ?? note.slug}</h1>
      {note.frontmatter.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          {note.frontmatter.tags.map((tag: string) => (
            <a
              key={tag}
              href={`/world/tags/${slugify(tag)}`}
              className="px-2 py-1 bg-gray-200 rounded dark:bg-ink-800 hover:underline"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />
    </article>
  )
}
