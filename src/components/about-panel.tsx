// Libs
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types
import type { INationalGenerationMix } from "@/lib/carbon-intensity/types";

interface IAboutPanelProps {
  nationalMix: INationalGenerationMix;
}

export function AboutPanel({ nationalMix }: IAboutPanelProps) {
  const topFuels = [...nationalMix.generationMix].sort((a, b) => b.perc - a.perc).slice(0, 5);

  return (
    <Card className="w-80 border-white/10 bg-black/70 text-white backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-base">What is this?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-white/70">
        <p>
          Aeiforía tracks the UK&apos;s live National Grid carbon intensity — how much CO₂ is released generating each
          unit of electricity, region by region, right now.
        </p>
        <p>
          Intensity swings several-fold across a single day as wind, solar, and gas fall in and out of the mix. Shifting
          usage toward the low-carbon windows is one of the more effective everyday climate actions available.
        </p>
        <div className="space-y-1 border-t border-white/10 pt-3">
          <p className="text-xs text-white/50">GB generation mix right now</p>
          { topFuels.map((fuel) => (
            <div key={ fuel.fuel } className="flex items-center justify-between text-xs">
              <span className="capitalize">{ fuel.fuel }</span>
              <span>{ fuel.perc }%</span>
            </div>
          )) }
        </div>
        <p className="border-t border-white/10 pt-3 text-xs text-white/50">
          Live visitor presence and cross-region collaboration are landing next — right now the globe format is ahead of
          the data, that&apos;s by design.
        </p>
        <p className="text-xs text-white/40">Source: National Grid ESO Carbon Intensity API</p>
      </CardContent>
    </Card>
  );
}
