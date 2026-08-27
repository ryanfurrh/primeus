import { getAllDisclosuresWithContent } from "@/lib/getAllDisclosures"
import { ArchiveClient } from "./ArchiveClient"

export const metadata = {
  title: "Archive",
  description: "",
}

/* Server component — getAllDisclosuresWithContent() reads the filesystem
   (vault/disclosures/), so it can't run inside ArchiveClient, which
   needs "use client" for the three-move interactive state. Eagerly loads
   every record's content here and hands it down as a prop; the corpus is a
   handful of records, so there's no reason for per-record fetching. */
export default function ArchivePage() {
  const records = getAllDisclosuresWithContent()
  return <ArchiveClient records={records} />
}
