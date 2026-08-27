/* Cancels the root layout's symmetric gutter so the 3D stage runs
   edge-to-edge under the floating rail — the spec's "the artifact viewport
   sets that padding to 0 and runs full-bleed". Width is left auto (not
   w-full) so the negative margins expand it to exactly the viewport width
   rather than overflowing. The chrome inside still respects the gutter. */
export default function ArtifactsLayout({ children }) {
  return (
    <div className="flex h-full flex-col -mx-6 md:-mx-[110px]">
      <main className="flex w-full h-full">{children}</main>
    </div>
  )
}
