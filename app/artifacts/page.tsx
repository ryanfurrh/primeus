// app/artifacts/page.tsx
"use client"

import { ViewPortal } from "./components/ViewPortal"
import WindowHeader from "./components/WindowHeader"
import ArtifactData from "./components/ArtifactData"
import TensionMonitor from "./components/TensionMonitor"
import ModelSelect from "./components/ModelSelect"

/* ArtifactProvider already wraps the whole app in app/layout.tsx, so
   selection state here is the same global context WindowHeader,
   ArtifactData and TensionMonitor already consumed — nothing new to wire
   there, just assembling components that existed but were never rendered
   into this page. */
const ArtifactsPage = () => {
  return (
    <div className="relative flex w-full h-full min-h-[480px] overflow-hidden">
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
