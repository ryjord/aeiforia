export type IWeatherCategory =
  "clear" | "partly-cloudy" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "thunderstorm";

export function weatherCategory(code: number): IWeatherCategory {
  if (code === 0) {
    return "clear";
  }
  if (code === 1 || code === 2) {
    return "partly-cloudy";
  }
  if (code === 3) {
    return "cloudy";
  }
  if (code === 45 || code === 48) {
    return "fog";
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return "drizzle";
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "rain";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "snow";
  }
  if ([95, 96, 99].includes(code)) {
    return "thunderstorm";
  }
  return "cloudy";
}
