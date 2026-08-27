"use client";

import { blue, green, lightGreen } from "@mui/material/colors";
import {
  AsciiRenderer,
  CameraControls,
  Environment,
  Grid,
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Stage,
  TorusKnot,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  LineBasicMaterial,
  LineSegments,
  Mesh,
  WireframeGeometry,
} from "three";

import { useArtifact } from "./ArtifactContext";
import { ArtifactIndex } from "./ArtifactIndex";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function TensionMonitor() {
  const { selectedArtifact } = useArtifact();
  const selectedArtifactData = ArtifactIndex.find(
    (artifact) => artifact.name === selectedArtifact
  );
  const Model = () => {
    const gltf = useLoader(GLTFLoader, "/models/wave-form-1/scene.gltf");
    return (
      <>
        <mesh scale={1} receiveShadow castShadow>
          <primitive
            object={gltf.scene}
            position={[0, -0.7, 0]}
            rotation={[0, 0, 0]}
          />
          <meshStandardMaterial wireframe color="white" />
        </mesh>
      </>
    );
  };

  return (
    <div
      className={
        selectedArtifact === "Welcome"
          ? "hidden"
          : "relative flex flex-col w-full h-48 overflow-hidden rounded-[4px] border border-pale-100/40 bg-ink-900/85 backdrop-blur-[6px] font-mono"
      }
    >
      <h3 className="absolute z-10 px-1 py-1 text-[12px] font-semibold tracking-wider top-3 left-3 bg-neptune-800/50 text-neptune-400">
        Tension Monitor
      </h3>
      <Canvas
        shadows
        orthographic
        camera={{
          position: [12, 0, 12],
          zoom: 110,
          left: -2,
          right: 2,
          top: 2,
          bottom: 2,
          near: 1,
        }}
        gl={{ antialias: false }}
        dpr={0.3}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="cyan" position={[0, 1, 3]} intensity={10} />
        <pointLight position={[10, 2, 15]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={5}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded...</Html>;
}
