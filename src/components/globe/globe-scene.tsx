"use client";

// Libs
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { Group } from "three";
import { latLonToVector3 } from "@/lib/geo";
import { Earth, EARTH_RADIUS } from "./earth";
import { RegionMarker } from "./region-marker";
import { WeatherMarker } from "./weather-marker";
import { Clouds } from "./clouds";

// Types
import type { IRegionReading } from "@/lib/carbon-intensity/types";
import type { ICityWeather } from "@/lib/weather/types";

const UK_CENTER_LAT = 54;
const UK_CENTER_LON = -2;
const CAMERA_DISTANCE = 7.5;
const INITIAL_CAMERA_POSITION = latLonToVector3(UK_CENTER_LAT, UK_CENTER_LON, CAMERA_DISTANCE).toArray();

const ROTATION_SPEED = 0.03;

interface IGlobeSceneProps {
  regions: IRegionReading[];
  selectedRegionId: number | null;
  onSelectRegion: (region: IRegionReading) => void;
  cities: ICityWeather[];
  showWeather: boolean;
  showClouds: boolean;
}

export function GlobeScene({
  regions,
  selectedRegionId,
  onSelectRegion,
  cities,
  showWeather,
  showClouds,
}: IGlobeSceneProps) {
  return (
    <Canvas camera={ { position: INITIAL_CAMERA_POSITION, fov: 45 } }>
      <ambientLight intensity={ 0.6 } />
      <directionalLight position={ [5, 3, 5] } intensity={ 1.2 } />
      <Stars radius={ 80 } depth={ 40 } count={ 2000 } factor={ 2 } saturation={ 0 } fade />
      <Suspense fallback={ null }>
        <RotatingGlobe>
          <Earth />
          { regions.map((region) => (
            <RegionMarker
              key={ region.regionId }
              region={ region }
              isSelected={ region.regionId === selectedRegionId }
              onSelect={ onSelectRegion }
            />
          )) }
          { showWeather && cities.map((city) => <WeatherMarker key={ city.cityId } city={ city } />) }
          { showClouds && <Clouds /> }
        </RotatingGlobe>
      </Suspense>
      <OrbitControls enablePan={ false } minDistance={ EARTH_RADIUS + 0.8 } maxDistance={ 12 } />
    </Canvas>
  );
}

// Keeps the Earth mesh and the region markers rotating together as a single unit.
function RotatingGlobe({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ROTATION_SPEED;
    }
  });

  return <group ref={ groupRef }>{ children }</group>;
}
