// Libs
import { WORLD_CITIES } from "./cities";

// Types
import type { IRawWeatherEntry, ICityWeather } from "./types";

const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const REVALIDATE_SECONDS = 900;

// Fetch live weather for every world city in a single batched request
export async function fetchGlobalWeather(): Promise<ICityWeather[]> {
  const latitude = WORLD_CITIES.map((city) => city.lat).join(",");
  const longitude = WORLD_CITIES.map((city) => city.lon).join(",");

  const url = `${FORECAST_ENDPOINT}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Open-Meteo API responded with ${res.status}`);
  }

  const body: IRawWeatherEntry[] = await res.json();

  return body.map((entry, index) => {
    const city = WORLD_CITIES[index];

    return {
      cityId: city.id,
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      temperatureC: entry.current.temperature_2m,
      windSpeedKmh: entry.current.wind_speed_10m,
      weatherCode: entry.current.weather_code,
      observedAt: entry.current.time,
    };
  });
}
