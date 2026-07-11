"use client";

// Libs
import { useMemo, useState } from "react";
import { Html } from "@react-three/drei";
import { DoubleSide, Quaternion, Vector3 } from "three";
import { latLonToVector3 } from "@/lib/geo";
import { temperatureColor } from "@/lib/weather/color";
import { EARTH_RADIUS } from "./earth";

// Types
import type { ICityWeather } from "@/lib/weather/types";

const RING_NORMAL = new Vector3(0, 0, 1);

interface IWeatherMarkerProps {
  city: ICityWeather;
}

export function WeatherMarker({ city }: IWeatherMarkerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const position = latLonToVector3(city.lat, city.lon, EARTH_RADIUS + 0.02);
  const color = temperatureColor(city.temperatureC);

  // ringGeometry is flat in the XY plane by default — rotate it to face
  // outward along the sphere's surface normal at this point, or it's edge-on
  // (effectively invisible) from most camera angles.
  const outwardRotation = useMemo(() => {
    const normal = position.clone().normalize();
    return new Quaternion().setFromUnitVectors(RING_NORMAL, normal);
  }, [position]);

  return (
    <group position={ position }>
      <mesh
        quaternion={ outwardRotation }
        onClick={ (event) => {
          event.stopPropagation();
          setIsOpen((current) => !current);
        } }
      >
        <ringGeometry args={ [0.018, 0.028, 16] } />
        <meshBasicMaterial color={ color } side={ DoubleSide } />
      </mesh>
      { isOpen && (
        <Html distanceFactor={ 8 } occlude>
          <div className="pointer-events-none rounded-md border border-white/10 bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
            <div className="font-medium">{ city.name }</div>
            <div className="text-white/70">
              { Math.round(city.temperatureC) }°C · { Math.round(city.windSpeedKmh) } km/h wind
            </div>
          </div>
        </Html>
      ) }
    </group>
  );
}
