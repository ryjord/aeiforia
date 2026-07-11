"use client";

// Libs
import { useEffect, useState } from "react";
import { GlobeScene } from "@/components/globe/globe-scene";
import { StatPanel } from "@/components/stat-panel";
import { AboutPanel } from "@/components/about-panel";
import { Button } from "@/components/ui/button";

// Types
import type { IRegionalIntensity, IRegionReading, INationalGenerationMix } from "@/lib/carbon-intensity/types";
import type { ICityWeather } from "@/lib/weather/types";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

interface IGlobeExperienceProps {
  initialData: IRegionalIntensity;
  initialNationalMix: INationalGenerationMix;
  initialCities: ICityWeather[];
}

export function GlobeExperience({ initialData, initialNationalMix, initialCities }: IGlobeExperienceProps) {
  const [data, setData] = useState(initialData);
  const [nationalMix, setNationalMix] = useState(initialNationalMix);
  const [cities, setCities] = useState(initialCities);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [showWeather, setShowWeather] = useState(true);
  const [showClouds, setShowClouds] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [regionalRes, nationalRes, weatherRes] = await Promise.all([
          fetch("/api/carbon-intensity"),
          fetch("/api/national-mix"),
          fetch("/api/weather"),
        ]);

        if (regionalRes.ok) {
          const next: IRegionalIntensity = await regionalRes.json();
          setData(next);
        }

        if (nationalRes.ok) {
          const next: INationalGenerationMix = await nationalRes.json();
          setNationalMix(next);
        }

        if (weatherRes.ok) {
          const next: ICityWeather[] = await weatherRes.json();
          setCities(next);
        }
      } catch (error) {
        console.error("Failed to refresh live data:", error);
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
      <GlobeScene
        regions={ data.regions }
        selectedRegionId={ selectedRegionId }
        onSelectRegion={ handleSelectRegion }
        cities={ cities }
        showWeather={ showWeather }
        showClouds={ showClouds }
      />
      <div className="pointer-events-none absolute top-6 left-6">
        <div className="pointer-events-auto">
          <StatPanel regions={ data.regions } selectedRegion={ selectedRegion } updatedAt={ data.from } />
        </div>
      </div>
      <div className="pointer-events-none absolute top-6 right-6">
        <div className="pointer-events-auto">
          <AboutPanel nationalMix={ nationalMix } />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        <Button
          variant={ showWeather ? "default" : "outline" }
          size="sm"
          className="pointer-events-auto bg-black/70 text-white backdrop-blur-md hover:bg-black/90"
          onClick={ () => setShowWeather((current) => !current) }
        >
          { showWeather ? `Hide weather (${cities.length})` : `Show weather (${cities.length})` }
        </Button>
        <Button
          variant={ showClouds ? "default" : "outline" }
          size="sm"
          className="pointer-events-auto bg-black/70 text-white backdrop-blur-md hover:bg-black/90"
          onClick={ () => setShowClouds((current) => !current) }
        >
          { showClouds ? "Hide clouds" : "Show clouds" }
        </Button>
      </div>
    </div>
  );
}
