export type IIntensityIndex = "very low" | "low" | "moderate" | "high" | "very high";

export type IFuelType = "biomass" | "coal" | "imports" | "gas" | "nuclear" | "other" | "hydro" | "solar" | "wind";

export interface IGenerationMixEntry {
  fuel: IFuelType;
  perc: number;
}

export interface IRawRegion {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: IIntensityIndex;
  };
  generationmix: IGenerationMixEntry[];
}

export interface IRawRegionalResponse {
  data: [
    {
      from: string;
      to: string;
      regions: IRawRegion[];
    },
  ];
}

export interface IRegionReading {
  regionId: number;
  dnoRegion: string;
  shortName: string;
  lat: number;
  lon: number;
  forecast: number;
  index: IIntensityIndex;
  generationMix: IGenerationMixEntry[];
}

export interface IRegionalIntensity {
  from: string;
  to: string;
  regions: IRegionReading[];
}

export interface IRawGenerationResponse {
  data: {
    from: string;
    to: string;
    generationmix: IGenerationMixEntry[];
  };
}

export interface INationalGenerationMix {
  from: string;
  to: string;
  generationMix: IGenerationMixEntry[];
}
