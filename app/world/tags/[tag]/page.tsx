import { getAllNotes } from "@/lib/getAllNotes"

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag
  const allNotes = getAllNotes()
  const tagged = allNotes.filter((note) =>
    note.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold"># {tag}</h1>
      <ul className="space-y-2">
        {tagged.map((note) => (
          <li key={note.slug}>
            <a href={`/world/${note.slug}`} className="text-teal hover:underline">
              {note.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
