// app/documentation/[slug]/page.tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllDisclosuresWithContent } from "@/lib/getAllDisclosures"
import { DocumentSheet } from "../components/DocumentSheet"
import { CalibrationReadout } from "@/components/data/CalibrationReadout"
import { Readout } from "@/components/data/Readout"
import { ArrowLeft } from "@/public/icons"

/* Standalone deep link into a single disclosure — not part of the internal
   three-move flow (nothing in DocumentationClient navigates here), which
   stays true to the site's "do not collapse the three moves into
   index-plus-detail" rule. This route exists for direct/bookmarked access
   to one record, same as it did before the redesign, just reading from
   vault/disclosures now instead of the old posts/ folder. */

export async function generateStaticParams() {
  return getAllDisclosuresWithContent().map((r) => ({ slug: r.slug.split("/") }))
}

export const metadata = {
  title: "Documentation",
  description: "",
}

export default function DisclosurePage({ params }: { params: { slug: string[] } }) {
  const records = getAllDisclosuresWithContent()
  const slug = params.slug.join("/")
  const record = records.find((r) => r.slug === slug)

  if (!record) return notFound()

  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <div className="mb-4 flex w-full max-w-[604px] items-center gap-3">
        <Link
          href="/documentation"
          className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center border border-sand-400/60 dark:border-pale-100/35 text-sand-500 dark:text-pale-100/50"
        >
          <ArrowLeft className="h-3 w-3" />
        </Link>
        <Readout fields={[record.fileNo]} tone="full" />
        <CalibrationReadout fidelity={record.fidelity} />
      </div>
      <DocumentSheet record={record} />
    </div>
  )
}
