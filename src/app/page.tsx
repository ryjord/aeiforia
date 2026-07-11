// Libs
import { fetchRegionalIntensity } from "@/lib/carbon-intensity/client";
import { GlobeExperience } from "@/components/globe-experience";

export default async function Home() {
  const initialData = await fetchRegionalIntensity();

  return (
    <main className="h-dvh w-full bg-black">
      <GlobeExperience initialData={ initialData } />
    </main>
  );
}
