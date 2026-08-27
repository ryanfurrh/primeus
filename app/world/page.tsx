import { getWorldFrames } from "@/lib/getWorldFrames"
import { WorldClient } from "./WorldClient"

export const metadata = {
  title: "World",
  description: "",
}

/* Server component — getWorldFrames() reads the filesystem (vault/world/),
   so it can't run inside WorldClient, which needs "use client" for the
   frame-selection state. Same split as the Archive
   (getAllDisclosuresWithContent -> ArchiveClient). */
export default function WorldIndexPage() {
  const frames = getWorldFrames()
  return <WorldClient frames={frames} />
}
