"use client"

import Image from "next/image"
import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Readout } from "@/components/data/Readout"
import { Badge } from "@/components/data/Badge"
import { GridBackdrop } from "@/components/GridBackdrop"

const { version } = require("/package.json")

/* Auto-orbit that wanders instead of spinning at one fixed rate. Two sines
   with incommensurate periods drive autoRotateSpeed, so it drifts, slows,
   crosses zero and reverses without settling into a short visible loop; a
   third, slower one nudges the polar angle so the orbit rides up and down
   as well as around. setPolarAngle is feature-checked — it only exists on
   newer three OrbitControls, and the horizontal drift is the effect that
   matters if it's absent. */
function DriftingOrbit() {
  const controls = useRef<any>(null)

  useFrame((state) => {
    const c = controls.current
    if (!c) return
    const t = state.clock.elapsedTime
    c.autoRotateSpeed = 1.6 * Math.sin(t * 0.11) + 0.9 * Math.sin(t * 0.037)
    if (typeof c.setPolarAngle === "function") {
      c.setPolarAngle(Math.PI / 2.6 + 0.22 * Math.sin(t * 0.043))
    }
  })

  return <OrbitControls ref={controls} autoRotate makeDefault />
}

/* Hoisted to module scope on purpose. It used to be declared inside
   HomePage, which made it a brand-new component type on every render:
   React then unmounted and remounted it, and because useLoader hands back
   one cached gltf.scene instance, that same Object3D kept getting
   re-parented and could end up detached from the scene — the model
   silently vanished while the canvas, camera and loader all looked
   healthy. Cloning makes this component own its own object either way. */
function ComputerModel() {
  const gltf = useLoader(GLTFLoader, "/models/computer1/computer1.gltf")
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])
  // scale 1.1 -> 0.85: "a bit smaller". Position matches the original.
  return <primitive object={scene} position={[0, -0.5, 0]} scale={0.85} />
}

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center pb-8">
      <GridBackdrop variant="isometric" fullBleed />
      <div className="relative z-10 box-border flex flex-col items-center w-full max-w-[620px] px-6 pt-10">
        <span className="font-mono text-[16px] text-sand-700 dark:text-pale-100">Welcome.</span>

        <div className="relative flex w-full h-[300px] md:h-[500px] mt-8 overflow-hidden border border-sand-300 border-t-[10px] border-t-sand-400 dark:border-ink-100/40 dark:border-t-ink-100 hover:cursor-grab active:cursor-grabbing">
          <Image
            src="/gifs/dot-grid-movement.gif"
            alt=""
            fill
            priority
            sizes="(min-width: 620px) 620px, 100vw"
            className="object-cover opacity-50 -z-10"
          />
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{
                zoom: 125,
                near: 0.1,
                far: 1000,
                position: [0, 3, 3],
              }}
              dpr={0.4}
              orthographic={true}
            >
              <DriftingOrbit />
              <ambientLight />
              <Suspense fallback={null}>
                <ComputerModel />
              </Suspense>
            </Canvas>
          </div>

          {/* "Welcome." moved out to the heading above the stage, so the only
              caption left floats at the bottom. */}
          {/* pb-14 rather than the p-8 all round — lifts the caption a little
              clear of the readout row pinned at the stage's bottom edge. */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-8 pb-14 pointer-events-none">
            <span className="px-3 py-1.5 border border-sand-300 dark:border-ink-100/40 bg-sand-100/70 dark:bg-ink-800/70 font-mono text-[16px] text-sand-700 dark:text-pale-100">
              A record of the first age.
            </span>
          </div>

          <div className="absolute z-10 flex items-center gap-2 left-3 bottom-3">
            <Badge dot>Orbit · Auto</Badge>
            {/* The full instrument readout is wider than a phone; the orbit
                chip alone carries the state down there. */}
            <Readout
              fields={["MODEL", "computer1.gltf", "ZOOM 125", "DPR 0.40"]}
              className="hidden md:inline text-[9px]"
            />
          </div>
        </div>

        {/* Stacks and wraps below md — side by side these two run well past
            a phone's width. */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0 w-full mt-3">
          <Readout
            fields={["DEPT. OF ENERGY", "EMERGING ENERGY DIV.", "FIELD OFFICE 04"]}
            className="text-[9px] whitespace-normal md:whitespace-nowrap"
          />
          <Readout
            fields={[`version ${version}`, "in-world"]}
            tone="loading"
            className="text-[9px] whitespace-normal md:whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  )
}
