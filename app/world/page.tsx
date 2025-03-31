import Link from "next/link"
import { getAllNotes } from "@/lib/getAllNotes"

export default async function WorldIndexPage() {
  const notes = await getAllNotes()

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">🌍 World Notes</h1>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link href={`/world/${note.slug}`} className="text-teal hover:underline">
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
