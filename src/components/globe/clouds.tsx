"use client";

// Libs
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Mesh } from "three";
import { EARTH_RADIUS } from "./earth";

// A static texture, not live satellite imagery
const CLOUDS_TEXTURE_URL = "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";
const CLOUDS_RADIUS = EARTH_RADIUS * 1.015;
const DRIFT_SPEED = 0.01;

export function Clouds() {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(CLOUDS_TEXTURE_URL);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * DRIFT_SPEED;
    }
  });

  return (
    <mesh ref={ meshRef }>
      <sphereGeometry args={ [CLOUDS_RADIUS, 64, 64] } />
      <meshStandardMaterial map={ texture } alphaMap={ texture } transparent opacity={ 0.6 } depthWrite={ false } />
    </mesh>
  );
}
