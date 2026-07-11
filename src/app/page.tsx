// Libs
import { fetchRegionalIntensity, fetchNationalGenerationMix } from "@/lib/carbon-intensity/client";
import { fetchGlobalWeather } from "@/lib/weather/client";
import { fetchMicroplastics } from "@/lib/microplastics/client";
import { GlobeExperience } from "@/components/globe-experience";

export default async function Home() {
  const [initialData, initialNationalMix, initialCities, initialMicroplastics] = await Promise.all([
    fetchRegionalIntensity(),
    fetchNationalGenerationMix(),
    fetchGlobalWeather(),
    fetchMicroplastics(),
  ]);

  return (
    <main className="h-dvh w-full bg-black">
      <GlobeExperience
        initialData={ initialData }
        initialNationalMix={ initialNationalMix }
        initialCities={ initialCities }
        initialMicroplastics={ initialMicroplastics }
      />
    </main>
  );
}
