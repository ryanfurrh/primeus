"use client"

import {
  Bounds,
  Environment,
  Grid,
  Html,
  OrbitControls,
  OrthographicCamera,
  Stars,
  useBounds,
  useProgress,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef, useState } from "react"
import {
  EffectComposer,
  Outline,
  Selection,
  Select,
  Glitch,
  Pixelation,
} from "@react-three/postprocessing"
import dynamic from "next/dist/shared/lib/dynamic"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { GlitchMode } from "postprocessing"

const loadModel = (modelId: string) => {
  return dynamic(
    () =>
      import(`../models/${modelId}.tsx`).then((mod) => {
        if (mod && mod.default) {
          return mod.default
        }
        throw new Error(`Module ${modelId} does not have a default export.`)
      }),
    { ssr: false }
  )
}

interface ViewPortProps {
  modelId: string
}

export default function ViewPort({ modelId }: ViewPortProps) {
  const [Model, setModel] = useState<React.ComponentType | null>(null)
  const boundsRef = useRef(null)
  const bounds = useBounds()

  useEffect(() => {
    console.log("useEffect triggered with modelId:", modelId, "Timestamp:", Date.now())

    if (modelId) {
      const load = async () => {
        try {
          const LoadedModel = await loadModel(modelId)
          console.log("Loaded model:", LoadedModel)
          setModel(() => LoadedModel)
          // Additional state updates might trigger re-renders
        } catch (error) {
          console.error("Error loading model:", error)
        }
      }
      load()
    }
  }, [modelId])

  useEffect(() => {
    if (Model && boundsRef.current) {
      // Recalculate bounds and fit the model in the view whenever the model changes
      bounds.fit()
    }
  }, [Model, bounds])

  // const { gridSize, ...gridConfig } = useControls({
  //   gridSize: [10.5, 10.5],
  //   cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
  //   cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
  //   cellColor: "#6f6f6f",
  //   sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
  //   sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
  //   sectionColor: "#9d4b4b",
  //   fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
  //   fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
  //   followCamera: false,
  //   infiniteGrid: true,
  // })

  return (
    <Canvas
      shadows
      camera={{ fov: 10, near: 0.1, far: 200, position: [20, 20, 30] }}
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 2]}
    >
      {/* <Perf position="bottom-left" /> */}
      <Grid
        infiniteGrid
        args={[10, 10]}
        fadeDistance={200}
        fadeStrength={3}
        cellColor={0x7cbdb3}
        cellSize={2}
        cellThickness={1.5}
        sectionColor={0x425753}
        sectionSize={1}
        sectionThickness={0.75}
      />
      {/* <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} /> */}
      <OrbitControls
        maxDistance={1}
        target={[0, 1, 0]}
        autoRotate
        autoRotateSpeed={0.7}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
        makeDefault
      />
      <ambientLight intensity={2} color="cyan" />
      <directionalLight color="cyan" position={[0, 20, 3]} intensity={5} />
      <directionalLight color="white" position={[0, 30, 8]} intensity={2} />

      <pointLight position={[10, 10, 15]} intensity={30} />
      <Select></Select>
      <Environment preset="night" environmentIntensity={3} />
      {/* <ambientLight intensity={4} /> */}
      {/* <directionalLight color="red" position={[0, 0, 5]} /> */}
      {/* <Environment preset="warehouse" environmentIntensity={1} /> */}
      <Suspense fallback={<Loader />}>
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline
              edgeStrength={40}
              visibleEdgeColor={0xf7e1d4}
              hiddenEdgeColor={0xf7e1d4}
              width={5000}
            />
            <Stars radius={100} depth={10} count={10000} factor={4} saturation={0} fade speed={1} />
            <Pixelation
              granularity={3.5} // pixel granularity
            />

            {/* <Glitch
              delay={[1.5, 3.5]} // min and max glitch delay
              duration={[0.6, 1.0]} // min and max glitch duration
              strength={[0.3, 1.0]} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            /> */}
          </EffectComposer>
          <Select enabled>
            {Model && (
              <Bounds fit clip observe margin={2} maxDuration={0.7} ref={boundsRef}>
                <Model />
              </Bounds>
            )}
          </Select>
        </Selection>
      </Suspense>
    </Canvas>
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded...</Html>
}
