"use client";

// Libs
import { useTexture } from "@react-three/drei";

const EARTH_TEXTURE_URL = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const EARTH_RADIUS = 2;

export function Earth() {
  const texture = useTexture(EARTH_TEXTURE_URL);

  return (
    <mesh>
      <sphereGeometry args={ [EARTH_RADIUS, 64, 64] } />
      <meshStandardMaterial map={ texture } roughness={ 0.8 } metalness={ 0.1 } />
    </mesh>
  );
}

export { EARTH_RADIUS };
