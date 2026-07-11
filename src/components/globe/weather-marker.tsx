"use client";

// Libs
import { useState } from "react";
import { Html } from "@react-three/drei";
import { latLonToVector3 } from "@/lib/geo";
import { temperatureColor } from "@/lib/weather/color";
import { WeatherIcon } from "@/components/weather-icon";
import { EARTH_RADIUS } from "./earth";

// Types
import type { ICityWeather } from "@/lib/weather/types";

const MARKER_RADIUS = 0.018;
const HOVER_SCALE = 1.7;
const HIT_RADIUS = 0.06;

interface IWeatherMarkerProps {
  city: ICityWeather;
}

export function WeatherMarker({ city }: IWeatherMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const position = latLonToVector3(city.lat, city.lon, EARTH_RADIUS + 0.015);
  const color = temperatureColor(city.temperatureC);
  const isOpen = isHovered || isPinned;

  return (
    <group position={ position }>
      <mesh
        onPointerOver={ (event) => {
          event.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        } }
        onPointerOut={ (event) => {
          event.stopPropagation();
          setIsHovered(false);
          document.body.style.cursor = "auto";
        } }
        onClick={ (event) => {
          event.stopPropagation();
          setIsPinned((current) => !current);
        } }
      >
        <sphereGeometry args={ [HIT_RADIUS, 8, 8] } />
        <meshBasicMaterial visible={ false } />
      </mesh>
      <mesh scale={ isOpen ? HOVER_SCALE : 1 }>
        <sphereGeometry args={ [MARKER_RADIUS, 12, 12] } />
        <meshBasicMaterial color={ color } />
      </mesh>
      { isOpen && (
        <Html distanceFactor={ 8 }>
          <div className="pointer-events-none flex items-center gap-2 rounded-md border border-white/10 bg-black/80 px-2 py-1.5 text-xs whitespace-nowrap text-white shadow-lg">
            <WeatherIcon code={ city.weatherCode } className="h-5 w-5 shrink-0 text-white/80" />
            <div>
              <div className="font-medium">{ city.name }</div>
              <div className="text-white/70">
                { Math.round(city.temperatureC) }°C · { Math.round(city.windSpeedKmh) } km/h wind
              </div>
            </div>
          </div>
        </Html>
      ) }
    </group>
  );
}
