import { getAllDisclosuresWithContent } from "@/lib/getAllDisclosures"
import { DocumentationClient } from "./DocumentationClient"

export const metadata = {
  title: "Documentation",
  description: "",
}

/* Server component — getAllDisclosuresWithContent() reads the filesystem
   (vault/disclosures/), so it can't run inside DocumentationClient, which
   needs "use client" for the three-move interactive state. Eagerly loads
   every record's content here and hands it down as a prop; the corpus is a
   handful of records, so there's no reason for per-record fetching. */
export default function DocumentationPage() {
  const records = getAllDisclosuresWithContent()
  return <DocumentationClient records={records} />
}
