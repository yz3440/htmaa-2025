"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import type * as THREE from "three";
import { cn } from "@/lib/utils";
import { env } from "@/env.js";

// GLB Model Component
const GLBModel = ({
  src,
  ...props
}: { src: string } & JSX.IntrinsicElements["group"]) => {
  const normalizedSrc =
    typeof src === "string" && src.startsWith("/") ? src.slice(1) : src;

  const finalSrc = env.NEXT_PUBLIC_BASE_URL
    ? `${env.NEXT_PUBLIC_BASE_URL}/${normalizedSrc}`
    : `/${normalizedSrc}`;

  const { scene } = useGLTF(finalSrc);
  const modelRef = useRef<THREE.Group>(null);

  // Optional: Add rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      // Subtle rotation animation
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  return (
    <group ref={modelRef} {...props}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Loading fallback component
const GLBLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#cccccc" wireframe />
  </mesh>
);

interface GLBViewerProps {
  src: string;
  width?: number;
  height?: number;
  autoRotate?: boolean;
  showEnvironment?: boolean;
  showShadows?: boolean;
  cameraPosition?: [number, number, number];
  objectPosition?: [number, number, number];
  className?: string;
  backgroundColor?: string;
}

export const GLBViewer = ({
  src,
  width,
  height = 400,
  autoRotate = false,
  showEnvironment = true,
  showShadows = true,
  cameraPosition = [0, 0, 5],
  objectPosition = [0, 0, 0],
  backgroundColor,
  className,
}: GLBViewerProps) => {
  const initialCameraDistance = Math.sqrt(
    cameraPosition[0] * cameraPosition[0] +
      cameraPosition[1] * cameraPosition[1] +
      cameraPosition[2] * cameraPosition[2],
  );
  return (
    <div
      className={cn(
        "relative mb-4 w-full overflow-hidden rounded-lg border border-border/20",
        "transition-all duration-500 hover:shadow-lg",
        "mx-auto",
        className,
      )}
      style={{ width: width ?? "100%", height }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        shadows={showShadows}
        className={cn(
          !backgroundColor &&
            "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        )}
        style={{ backgroundColor }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow={showShadows}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Environment */}
        {showEnvironment && (
          <Environment preset="studio" background={false} blur={0.8} />
        )}

        {/* Model */}
        <Suspense fallback={<GLBLoader />}>
          <group position={objectPosition}>
            <GLBModel src={src} />
          </group>
        </Suspense>

        {/* Shadows */}
        {showShadows && (
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4.5}
          />
        )}

        {/* Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotate ? 0.5 : 0}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={initialCameraDistance * 0.5}
          maxDistance={initialCameraDistance * 2}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>

      {/* Loading indicator overlay */}
      <div className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 text-xs text-muted-foreground">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};
