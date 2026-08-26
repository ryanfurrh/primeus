// app/artifacts/page.tsx
"use client"

import { ViewPortal } from "./components/ViewPortal"
import WindowHeader from "./components/WindowHeader"
import ArtifactData from "./components/ArtifactData"
import TensionMonitor from "./components/TensionMonitor"
import ModelSelect from "./components/ModelSelect"
import { GridBackdrop } from "@/components/GridBackdrop"

/* ArtifactProvider already wraps the whole app in app/layout.tsx, so
   selection state here is the same global context WindowHeader,
   ArtifactData and TensionMonitor already consumed — nothing new to wire
   there, just assembling components that existed but were never rendered
   into this page. */
const ArtifactsPage = () => {
  return (
    <div className="relative flex w-full h-full min-h-[480px] overflow-hidden">
      <GridBackdrop variant="isometric" />
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

      {/* ModelSelect is the real, separate entry point into the per-model
          detail route (/artifacts/[model]) — kept reachable from the main
          page rather than dropped, since that route has to keep working. */}
      <div className="absolute z-20 top-6 left-6">
        <ModelSelect />
      </div>

      <div className="absolute z-20 top-20 right-4 bottom-4 flex w-64 flex-col gap-3 pointer-events-none md:w-72">
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
