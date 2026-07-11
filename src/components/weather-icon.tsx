// Libs
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { weatherCategory } from "@/lib/weather/icon";

interface IWeatherIconProps {
  code: number;
  className?: string;
}

const ICON_BY_CATEGORY = {
  clear: Sun,
  "partly-cloudy": CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunderstorm: CloudLightning,
};

const ANIMATION_BY_CATEGORY = {
  clear: "animate-[spin_6s_linear_infinite]",
  "partly-cloudy": "animate-pulse",
  cloudy: "animate-[weather-drift_3s_ease-in-out_infinite]",
  fog: "animate-pulse",
  drizzle: "animate-bounce",
  rain: "animate-bounce",
  snow: "animate-[weather-flutter_2.2s_ease-in-out_infinite]",
  thunderstorm: "animate-[weather-flicker_2.6s_linear_infinite]",
};

export function WeatherIcon({ code, className }: IWeatherIconProps) {
  const category = weatherCategory(code);
  const Icon = ICON_BY_CATEGORY[category];

  return <Icon className={ `${ANIMATION_BY_CATEGORY[category]} ${className ?? ""}` } />;
}
