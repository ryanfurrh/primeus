"use client"

import { Bounds, Environment, Grid, Html, OrbitControls, useProgress } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { Mesh } from "three"
import { ArtifactProvider, useArtifact } from "./ArtifactContext"
import { ArtifactIndex } from "./ArtifactIndex"
import { EffectComposer, Outline, Selection, Select } from "@react-three/postprocessing"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export function ViewPortal() {
  const { selectedArtifact } = useArtifact()
  const selectedArtifactData = ArtifactIndex.find((artifact) => artifact.name === selectedArtifact)
  const Model = () => {
    const gltf = useLoader(GLTFLoader, `/${selectedArtifactData?.file}`)
    const meshRef = useRef<Mesh>(null)
    useFrame(() => {
      if (!meshRef.current) {
        return
      }
    })

    return (
      <>
        <Bounds fit observe margin={selectedArtifactData?.margin || 1.4}>
          <mesh scale={selectedArtifactData?.scale} ref={meshRef} receiveShadow castShadow>
            <primitive
              object={gltf.scene}
              position={selectedArtifactData?.position || [0, 0.4, 0]}
              rotation={selectedArtifactData?.rotation}
            />
            <meshStandardMaterial />
          </mesh>
        </Bounds>
      </>
    )
  }

  return (
    <div className="absolute inset-0 flex font-mono">
      <ArtifactProvider>
        <Canvas
          shadows={"percentage"}
          orthographic
          camera={
            {
              // position: [15, 15, 20],
              // zoom: 140,
              // left: -2,
              // right: -2,
              // top: 2,
              // bottom: 2,
              // near: 0.2,
            }
          }
          gl={{ logarithmicDepthBuffer: true, antialias: false }}
          dpr={0.45}
        >
          <ambientLight intensity={2} color="cyan" />
          <directionalLight color="cyan" position={[0, 20, 3]} intensity={5} />
          <pointLight position={[10, 10, 15]} intensity={1} />
          <Environment preset="night" />

          <Suspense fallback={<Loader />}>
            <Selection>
              <EffectComposer autoClear={false}>
                <Outline
                  edgeStrength={21}
                  visibleEdgeColor={0x1be4b4}
                  hiddenEdgeColor={0x1be4b4}
                  width={5000}
                />
              </EffectComposer>
              <Select enabled>
                <Model />
              </Select>
            </Selection>
          </Suspense>
          {/* Real in-scene ground, styled to the site's --energized value
              (#1BE4B4 / flux in tailwind.config.js) — the same fixed teal
              WindowHeader/ArtifactData use, rather than the page-level CSS
              GridBackdrop lattice, which the full-bleed canvas would just
              hide (see app/artifacts/page.tsx). */}
          <Grid
            infiniteGrid
            fadeDistance={80}
            fadeStrength={5}
            sectionColor={0x1be4b4}
            sectionThickness={1}
            cellColor={0x1be4b4}
            cellThickness={0.5}
          />
          <OrbitControls
            target={[0.3, 2, 0]}
            autoRotate
            autoRotateSpeed={0.4}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
          />
          <fog />
        </Canvas>
      </ArtifactProvider>
    </div>
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded...</Html>
}
