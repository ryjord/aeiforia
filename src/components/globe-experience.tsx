"use client";

// Libs
import { useEffect, useState } from "react";
import { GlobeScene } from "@/components/globe/globe-scene";
import { StatPanel } from "@/components/stat-panel";

// Types
import type { IRegionalIntensity, IRegionReading } from "@/lib/carbon-intensity/types";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

interface IGlobeExperienceProps {
  initialData: IRegionalIntensity;
}

export function GlobeExperience({ initialData }: IGlobeExperienceProps) {
  const [data, setData] = useState(initialData);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/carbon-intensity");
        if (!res.ok) {
          return;
        }

        const next: IRegionalIntensity = await res.json();
        setData(next);
      } catch (error) {
        console.error("Failed to refresh carbon intensity:", error);
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const selectedRegion = data.regions.find((region) => region.regionId === selectedRegionId) ?? null;

  function handleSelectRegion(region: IRegionReading) {
    setSelectedRegionId((current) => (current === region.regionId ? null : region.regionId));
  }

  return (
    <div className="relative h-full w-full">
      <GlobeScene regions={ data.regions } selectedRegionId={ selectedRegionId } onSelectRegion={ handleSelectRegion } />
      <div className="pointer-events-none absolute top-6 left-6">
        <div className="pointer-events-auto">
          <StatPanel regions={ data.regions } selectedRegion={ selectedRegion } updatedAt={ data.from } />
        </div>
      </div>
    </div>
  );
}
