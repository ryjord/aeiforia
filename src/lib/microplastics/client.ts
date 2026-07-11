import { parseDap4Float32Array } from "./dap4";

// Types
import type { IMicroplasticGrid } from "./types";

const CMR_GRANULES_URL = "https://cmr.earthdata.nasa.gov/search/granules.json";
const SHORT_NAME = "CYGNSS_L3_MICROPLASTIC_V3.2";

const LAT_DIM_SIZE = 297;
const LON_DIM_SIZE = 1440;
const LAT_STRIDE = 12;
const LON_STRIDE = 12;
const FILL_VALUE = -9999;
const REVALIDATE_SECONDS = 60 * 60 * 12;

interface ICmrLink {
  rel: string;
  title?: string;
  href: string;
}

interface ICmrGranuleEntry {
  time_start: string;
  links: ICmrLink[];
}

interface ICmrGranulesResponse {
  feed: { entry: ICmrGranuleEntry[] };
}

export async function fetchMicroplastics(): Promise<IMicroplasticGrid | null> {
  const token = process.env.NASA_EARTHDATA_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const granuleParams = new URLSearchParams({ short_name: SHORT_NAME, sort_key: "-start_date", page_size: "1" });
    const granuleRes = await fetch(`${CMR_GRANULES_URL}?${granuleParams}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!granuleRes.ok) {
      return null;
    }

    const granuleJson: ICmrGranulesResponse = await granuleRes.json();
    const entry = granuleJson.feed.entry[0];
    const opendapLink = entry?.links.find(
      (link) => link.rel.endsWith("service#") && link.title === "OPeNDAP request URL",
    )?.href;

    if (!opendapLink || !entry.time_start) {
      return null;
    }

    const latIndices = `0:${LAT_STRIDE}:${LAT_DIM_SIZE - 1}`;
    const lonIndices = `0:${LON_STRIDE}:${LON_DIM_SIZE - 1}`;
    const constraint = `mp_concentration%5B0%5D%5B${latIndices}%5D%5B${lonIndices}%5D`;

    const dataRes = await fetch(`${opendapLink}.dap?dap4.ce=${constraint}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!dataRes.ok) {
      return null;
    }

    const rawValues = parseDap4Float32Array(await dataRes.arrayBuffer());
    const latCount = Math.floor((LAT_DIM_SIZE - 1) / LAT_STRIDE) + 1;
    const lonCount = Math.floor((LON_DIM_SIZE - 1) / LON_STRIDE) + 1;

    if (rawValues.length !== latCount * lonCount) {
      return null;
    }

    return {
      latStart: -37,
      lonStart: 0,
      latStep: 0.25 * LAT_STRIDE,
      lonStep: 0.25 * LON_STRIDE,
      latCount,
      lonCount,
      values: Array.from(rawValues, (value) => (value === FILL_VALUE ? null : value)),
      observedAt: entry.time_start,
    };
  } catch (error) {
    console.error("Failed to fetch microplastics data:", error);
    return null;
  }
}
