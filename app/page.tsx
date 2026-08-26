"use client"

import Image from "next/image"
import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Computer1 from "./artifacts/models/Computer1"
import { PageHeader } from "@/components/PageHeader"
import { Readout } from "@/components/data/Readout"
import { Badge } from "@/components/data/Badge"
import { GridBackdrop } from "@/components/GridBackdrop"
import { PrimaeLogo } from "@/public/icons"

const { version } = require("/package.json")

// export const metadata = {
//   title: "Primævus",
//   description: "",
// };

export default function HomePage() {
  const Model = () => {
    const gltf = useLoader(GLTFLoader, "/models/computer1/computer1.gltf")
    return (
      <>
        <primitive object={gltf.scene} position={[0, -0.5, 0]} rotation={[0, 0, 0]} scale={1.1} />
      </>
    )
  }

  return (
    <div className="relative flex flex-col items-center pb-8">
      <GridBackdrop variant="isometric" />
      <PageHeader name="primæ" icon={<PrimaeLogo className="w-4 h-4" />} readout="A RECORD OF THE FIRST AGE" />
      <div className="box-border flex flex-col items-center w-full max-w-[620px] px-6 pt-10">
        <span className="font-mono text-[16px] text-sand-700 dark:text-pale-100">hello world.</span>

        <div className="relative flex w-full h-[300px] md:h-[500px] mt-8 overflow-hidden border border-sand-300 border-t-[10px] border-t-sand-400 dark:border-ink-100/40 dark:border-t-ink-100 hover:cursor-grab active:cursor-grabbing">
          <Image
            src="/gifs/dot-grid-movement.gif"
            alt=""
            fill
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
              <OrbitControls />
              <ambientLight />
              <Suspense fallback={null}>
                <Model />
              </Suspense>
            </Canvas>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-8 pointer-events-none">
            <span className="px-3 py-1.5 border border-sand-300 dark:border-ink-100/40 bg-sand-100/70 dark:bg-ink-800/70 font-mono text-[16px] text-sand-700 dark:text-pale-100">
              Welcome.
            </span>
            <span className="px-3 py-1.5 border border-sand-300 dark:border-ink-100/40 bg-sand-100/70 dark:bg-ink-800/70 font-mono text-[16px] text-sand-700 dark:text-pale-100">
              A record of the first age.
            </span>
          </div>

          <div className="absolute z-10 flex items-center gap-2 left-3 bottom-3">
            <Badge dot>Orbit · Auto</Badge>
            <Readout fields={["MODEL", "computer1.gltf", "ZOOM 125", "DPR 0.40"]} className="text-[9px]" />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-3">
          <Readout
            fields={["DEPT. OF ENERGY", "EMERGING ENERGY DIV.", "FIELD OFFICE 04"]}
            className="text-[9px]"
          />
          <Readout fields={[`version ${version}`, "in-world"]} tone="loading" className="text-[9px]" />
        </div>
      </div>
    </div>
  )
}
