// Libs
import { fetchRegionalIntensity, fetchNationalGenerationMix } from "@/lib/carbon-intensity/client";
import { GlobeExperience } from "@/components/globe-experience";

export default async function Home() {
  const [initialData, initialNationalMix] = await Promise.all([fetchRegionalIntensity(), fetchNationalGenerationMix()]);

  return (
    <main className="h-dvh w-full bg-black">
      <GlobeExperience initialData={ initialData } initialNationalMix={ initialNationalMix } />
    </main>
  );
}
