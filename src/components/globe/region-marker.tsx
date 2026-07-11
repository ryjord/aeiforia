"use client";

// Libs
import { Html } from "@react-three/drei";
import { latLonToVector3 } from "@/lib/geo";
import { INTENSITY_COLORS } from "@/lib/carbon-intensity/color";
import { EARTH_RADIUS } from "./earth";

// Types
import type { IRegionReading } from "@/lib/carbon-intensity/types";

interface IRegionMarkerProps {
  region: IRegionReading;
  isSelected: boolean;
  onSelect: (region: IRegionReading) => void;
}

export function RegionMarker({ region, isSelected, onSelect }: IRegionMarkerProps) {
  const position = latLonToVector3(region.lat, region.lon, EARTH_RADIUS + 0.02);
  const color = INTENSITY_COLORS[region.index];

  return (
    <group position={ position }>
      <mesh
        onClick={ (event) => {
          event.stopPropagation();
          onSelect(region);
        } }
      >
        <sphereGeometry args={ [isSelected ? 0.045 : 0.03, 16, 16] } />
        <meshBasicMaterial color={ color } />
      </mesh>
      { isSelected && (
        <Html distanceFactor={ 8 } occlude>
          <div className="pointer-events-none rounded-md border border-white/10 bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
            <div className="font-medium">{ region.shortName }</div>
            <div className="text-white/70">
              { region.forecast } gCO₂/kWh · { region.index }
            </div>
          </div>
        </Html>
      ) }
    </group>
  );
}
