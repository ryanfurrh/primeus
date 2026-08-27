// app/artifacts/page.tsx
"use client"

import { ViewPortal } from "./components/ViewPortal"
import WindowHeader from "./components/WindowHeader"
import ArtifactData from "./components/ArtifactData"
import TensionMonitor from "./components/TensionMonitor"
import { ArtifactSelector } from "./components/ArtifactSelector"

/* ArtifactProvider already wraps the whole app in app/layout.tsx, so
   selection state here is the same global context WindowHeader,
   ArtifactData and TensionMonitor already consumed — nothing new to wire
   there, just assembling components that existed but were never rendered
   into this page.

   No GridBackdrop here (unlike Home/Shell) — Ryan wants this page to be a
   real full-bleed 3D view window with the ground carried by the real
   in-scene grid (ViewPortal, styled to match), not a second competing 2D
   CSS lattice layered underneath it. The R3F Canvas is transparent by
   default, so the two would otherwise blend and clutter the view. */
const ArtifactsPage = () => {
  return (
    // -mx cancels the root layout's gutter so the 3D stage runs edge-to-edge
    // under the floating rail. flex-1 (not w-full) so the negative margins
    // expand it to exactly the viewport width instead of overflowing.
    <div className="relative flex flex-1 h-full min-h-[480px] overflow-hidden -mx-6 md:-mx-24">
      {/* wash-rgb isn't a token this repo imports (Stage 1 translated the kit's
          CSS-custom-property layer to Tailwind classes) — hardcoded to the
          real light/dark values from tokens/semantic.css instead of a
          var(--wash-rgb) reference that would resolve to nothing. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: "radial-gradient(55% 45% at 50% 42%, rgba(178,216,210,0.35), transparent 70%)" }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden pointer-events-none dark:block"
        style={{ background: "radial-gradient(55% 45% at 50% 42%, rgba(48,96,89,0.35), transparent 70%)" }}
      />
      <ViewPortal />
      <WindowHeader />

      {/* All floating chrome lives in two zones that can't collide with the
          rail: the centred title bar, and this right-hand column inset to the
          same gutter the other surfaces use.

          ArtifactSelector is the page's single selector now — it took over
          this button position from ModelSelect and the artifact-switching job
          from the dropdown that used to live in WindowHeader. */}
      <div className="absolute z-20 top-20 right-6 bottom-6 flex w-64 flex-col gap-3 pointer-events-none md:right-24 md:w-72">
        <div className="self-end pointer-events-auto">
          <ArtifactSelector />
        </div>
        <div className="pointer-events-auto">
          <ArtifactData />
        </div>
        <div className="pointer-events-auto">
          <TensionMonitor />
        </div>
      </div>
    </div>
  )
}

export default ArtifactsPage
