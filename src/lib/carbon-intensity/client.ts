// Libs
import { REGION_COORDINATES } from "./regions";

// Types
import type { IRawRegionalResponse, IRegionalIntensity } from "./types";

const REGIONAL_ENDPOINT = "https://api.carbonintensity.org.uk/regional";
const REVALIDATE_SECONDS = 1800;

// Fetch live regional carbon intensity
export async function fetchRegionalIntensity(): Promise<IRegionalIntensity> {
  const res = await fetch(REGIONAL_ENDPOINT, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Carbon Intensity API responded with ${res.status}`);
  }

  const body: IRawRegionalResponse = await res.json();
  const [period] = body.data;

  const regions = period.regions
    .filter((region) => region.regionid in REGION_COORDINATES)
    .map((region) => ({
      regionId: region.regionid,
      dnoRegion: region.dnoregion,
      shortName: region.shortname,
      ...REGION_COORDINATES[region.regionid],
      forecast: region.intensity.forecast,
      index: region.intensity.index,
      generationMix: region.generationmix,
    }));

  return { from: period.from, to: period.to, regions };
}
