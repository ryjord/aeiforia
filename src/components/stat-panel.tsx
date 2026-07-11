// Libs
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTENSITY_COLORS } from "@/lib/carbon-intensity/color";

// Types
import type { IRegionReading, IIntensityIndex } from "@/lib/carbon-intensity/types";

interface IStatPanelProps {
  regions: IRegionReading[];
  selectedRegion: IRegionReading | null;
  updatedAt: string;
}

export function StatPanel({ regions, selectedRegion, updatedAt }: IStatPanelProps) {
  const average = Math.round(regions.reduce((sum, region) => sum + region.forecast, 0) / regions.length);
  const sorted = [...regions].sort((a, b) => a.forecast - b.forecast);
  const cleanest = sorted[0];
  const dirtiest = sorted[sorted.length - 1];

  return (
    <Card className="w-80 border-white/10 bg-black/70 text-white backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-base">UK Grid Carbon Intensity</CardTitle>
        <p className="text-xs text-white/50">Updated { new Date(updatedAt).toLocaleTimeString("en-GB") }</p>
      </CardHeader>
      <CardContent className="space-y-4">
        { selectedRegion ? (
          <RegionDetail region={ selectedRegion } />
        ) : (
          <div className="space-y-1">
            <p className="text-sm text-white/70">GB average forecast</p>
            <p className="text-3xl font-semibold">{ average } gCO₂/kWh</p>
            <p className="text-xs text-white/50">Click a pin on the globe to inspect a region.</p>
          </div>
        ) }
        { !selectedRegion && cleanest && dirtiest && (
          <div className="space-y-1.5 border-t border-white/10 pt-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/50">Cleanest now</span>
              <span>
                { cleanest.shortName } · { cleanest.forecast } gCO₂/kWh
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50">Dirtiest now</span>
              <span>
                { dirtiest.shortName } · { dirtiest.forecast } gCO₂/kWh
              </span>
            </div>
          </div>
        ) }
        <Legend />
      </CardContent>
    </Card>
  );
}

function RegionDetail({ region }: { region: IRegionReading }) {
  const topFuels = [...region.generationMix].sort((a, b) => b.perc - a.perc).slice(0, 4);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-white/70">{ region.shortName }</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-semibold">{ region.forecast }</p>
          <p className="text-xs text-white/50">gCO₂/kWh</p>
          <Badge style={ { backgroundColor: INTENSITY_COLORS[region.index] } } className="text-black">
            { region.index }
          </Badge>
        </div>
      </div>
      <div className="space-y-1">
        { topFuels.map((fuel) => (
          <div key={ fuel.fuel } className="flex items-center justify-between text-xs text-white/70">
            <span className="capitalize">{ fuel.fuel }</span>
            <span>{ fuel.perc }%</span>
          </div>
        )) }
      </div>
    </div>
  );
}

function Legend() {
  const entries = Object.entries(INTENSITY_COLORS) as [IIntensityIndex, string][];

  return (
    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
      { entries.map(([index, color]) => (
        <div key={ index } className="flex items-center gap-1 text-[10px] text-white/60">
          <span className="h-2 w-2 rounded-full" style={ { backgroundColor: color } } />
          { index }
        </div>
      )) }
    </div>
  );
}
