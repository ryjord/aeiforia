export type IntensityIndex = "very low" | "low" | "moderate" | "high" | "very high";

export type FuelType = "biomass" | "coal" | "imports" | "gas" | "nuclear" | "other" | "hydro" | "solar" | "wind";

export interface GenerationMixEntry {
  fuel: FuelType;
  perc: number;
}

export interface RawRegion {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: IntensityIndex;
  };
  generationmix: GenerationMixEntry[];
}

export interface RawRegionalResponse {
  data: [
    {
      from: string;
      to: string;
      regions: RawRegion[];
    },
  ];
}

export interface RegionReading {
  regionId: number;
  dnoRegion: string;
  shortName: string;
  lat: number;
  lon: number;
  forecast: number;
  index: IntensityIndex;
  generationMix: GenerationMixEntry[];
}

export interface RegionalIntensity {
  from: string;
  to: string;
  regions: RegionReading[];
}
