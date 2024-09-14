"use client"

import { PageHeader } from "@/app/components/PageHeader"
import { PrimaeLogoMinimal } from "@/public/icons"
import Image from "next/image"
import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Computer1 from "./artifacts/models/Computer1"

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
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="">
        <PageHeader name="primæ" description="" icon={<PrimaeLogoMinimal className="w-7 h-7" />} />
      </div>
      <div className="flex flex-col items-center w-full max-w-lg">
        <h1 className="mb-4 text-center font-jet">hello world.</h1>

        <div className="relative flex w-full h-auto">
          <Image
            src="/gifs/dot-grid-movement.gif"
            alt={""}
            width={500}
            height={500}
            className="absolute flex -z-10 w-full right-[0]"
          />
        </div>

        <div className="flex w-full mb-12 h-[300px] md:h-[500px] hover:cursor-grab active:cursor-grabbing relative">
          <div className="absolute bottom-0 w-full px-4 py-4 mb-4 ">
            <div className="flex flex-col justify-center gap-12 md:gap-36 place-items-center">
              <p className="z-10 px-4 py-4 bg-background border-1 border-pale-100/50">Welcome.</p>
            </div>
          </div>
          <div className="z-0 w-full">
            <Canvas
              camera={{
                zoom: 100,
                near: 0.1,
                far: 1000,
                position: [0, 3, 3],
              }}
              orthographic={true}
            >
              <OrbitControls />
              <ambientLight />
              <Suspense fallback={null}>
                <Computer1 />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
