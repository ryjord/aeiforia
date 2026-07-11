// Libs
import { fetchRegionalIntensity, fetchNationalGenerationMix } from "@/lib/carbon-intensity/client";
import { fetchGlobalWeather } from "@/lib/weather/client";
import { GlobeExperience } from "@/components/globe-experience";

export default async function Home() {
  const [initialData, initialNationalMix, initialCities] = await Promise.all([
    fetchRegionalIntensity(),
    fetchNationalGenerationMix(),
    fetchGlobalWeather(),
  ]);

  return (
    <main className="h-dvh w-full bg-black">
      <GlobeExperience
        initialData={ initialData }
        initialNationalMix={ initialNationalMix }
        initialCities={ initialCities }
      />
    </main>
  );
}
