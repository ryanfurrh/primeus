/* Neutral. The full-bleed cancel used to live here, but this layout also
   wraps app/artifacts/[model], so that route lost the gutter too and its
   content ended up underneath the floating rail. Only the stage page runs
   edge-to-edge, so the cancel now sits on app/artifacts/page.tsx itself. */
export default function ArtifactsLayout({ children }) {
  return (
    <div className="flex h-full flex-col">
      <main className="flex w-full h-full">{children}</main>
    </div>
  )
}
