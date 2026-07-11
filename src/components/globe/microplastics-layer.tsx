"use client";

// Libs
import { useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";
import { latLonToVector3 } from "@/lib/geo";
import { microplasticColor } from "@/lib/microplastics/color";
import { EARTH_RADIUS } from "./earth";

// Types
import type { IMicroplasticGrid } from "@/lib/microplastics/types";

const MIN_POINT_RADIUS = 0.006;
const MAX_POINT_RADIUS = 0.02;

interface IMicroplasticsLayerProps {
  grid: IMicroplasticGrid;
}

export function MicroplasticsLayer({ grid }: IMicroplasticsLayerProps) {
  const points = useMemo(() => {
    const nonNull = grid.values.filter((value): value is number => value !== null);
    if (nonNull.length === 0) return [];

    // Normalize against this snapshot's own range (log scale) rather than a fixed
    // global one — the real spread within any single 30-day mean is narrow, so a
    // fixed scale would flatten every point to nearly the same color.
    const logValues = nonNull.map((value) => Math.log10(Math.max(value, 1)));
    const logMin = Math.min(...logValues);
    const logMax = Math.max(...logValues);
    const logRange = logMax - logMin || 1;

    const result: { position: [number, number, number]; color: string; scale: number }[] = [];

    for (let latIndex = 0; latIndex < grid.latCount; latIndex++) {
      for (let lonIndex = 0; lonIndex < grid.lonCount; lonIndex++) {
        const concentration = grid.values[latIndex * grid.lonCount + lonIndex];
        if (concentration === null) continue;

        const t = (Math.log10(Math.max(concentration, 1)) - logMin) / logRange;
        const lat = grid.latStart + latIndex * grid.latStep;
        const rawLon = grid.lonStart + lonIndex * grid.lonStep;
        const lon = rawLon > 180 ? rawLon - 360 : rawLon;
        const position = latLonToVector3(lat, lon, EARTH_RADIUS + 0.008);

        result.push({
          position: position.toArray() as [number, number, number],
          color: microplasticColor(t),
          scale: MIN_POINT_RADIUS + (MAX_POINT_RADIUS - MIN_POINT_RADIUS) * t,
        });
      }
    }

    return result;
  }, [grid]);

  return (
    <Instances limit={ points.length } range={ points.length }>
      <sphereGeometry args={ [1, 6, 6] } />
      <meshBasicMaterial transparent opacity={ 0.55 } depthWrite={ false } />
      { points.map((point, index) => (
        <Instance key={ index } position={ point.position } color={ point.color } scale={ point.scale } />
      )) }
    </Instances>
  );
}
