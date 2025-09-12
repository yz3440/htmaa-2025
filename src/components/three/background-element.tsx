"use client";

import useDeviceDetection from "@/hooks/useDeviceDetection";
import { Sphere, TorusKnot } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { BlurEffect } from "./blur-effect";

function RotatingSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const initialRotation: [number, number, number] = useMemo(
    () => [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    [],
  );

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.0005;
      sphereRef.current.rotation.x += 0.0005;
      sphereRef.current.rotation.z += 0.0005;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y -= 0.0005;
      torusRef.current.rotation.x -= 0.0005;
      torusRef.current.rotation.z -= 0.0005;
    }
  });

  return (
    <group rotation={initialRotation}>
      {/* <TorusKnot ref={torusRef} args={[10, 4, 8, 8]}>
        <meshBasicMaterial attach="material" color="#333" wireframe />
      </TorusKnot> */}
      <Sphere ref={sphereRef} args={[10, 12, 12]}>
        <meshBasicMaterial attach="material" color="#030" wireframe />
      </Sphere>
    </group>
  );
}

export default function BackgroundElement() {
  const device = useDeviceDetection();

  // if (device === "mobile") {
  //   return null;
  // }

  return (
    <div className="fixed inset-0 left-0 top-0 -z-10 h-dvh w-dvw">
      <Canvas
        gl={{ antialias: false }}
        dpr={0.4}
        camera={{ fov: 160 }}
        className="pointer-events-none"
      >
        <EffectComposer>
          {/* <RadialBlurEffect blurStart={0.5} blurWidth={0.1} /> */}
          <BlurEffect
            horizontalStrength={0.002}
            verticalStrength={0.008}
            level={0.3}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.004, 0.0004)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
        <RotatingSphere />
      </Canvas>
    </div>
  );
}
