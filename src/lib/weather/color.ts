// Temperature (°C) -> color stops, interpolated linearly between neighbours.
const TEMPERATURE_STOPS: [number, [number, number, number]][] = [
  [-10, [59, 130, 246]], // blue
  [10, [34, 197, 94]], // green
  [22, [234, 179, 8]], // yellow
  [35, [239, 68, 68]], // red
];

export function temperatureColor(celsius: number): string {
  if (celsius <= TEMPERATURE_STOPS[0][0]) return rgbToHex(TEMPERATURE_STOPS[0][1]);
  if (celsius >= TEMPERATURE_STOPS[TEMPERATURE_STOPS.length - 1][0]) {
    return rgbToHex(TEMPERATURE_STOPS[TEMPERATURE_STOPS.length - 1][1]);
  }

  for (let i = 0; i < TEMPERATURE_STOPS.length - 1; i++) {
    const [tempA, colorA] = TEMPERATURE_STOPS[i];
    const [tempB, colorB] = TEMPERATURE_STOPS[i + 1];

    if (celsius >= tempA && celsius <= tempB) {
      const t = (celsius - tempA) / (tempB - tempA);
      const mixed: [number, number, number] = [
        colorA[0] + (colorB[0] - colorA[0]) * t,
        colorA[1] + (colorB[1] - colorA[1]) * t,
        colorA[2] + (colorB[2] - colorA[2]) * t,
      ];
      return rgbToHex(mixed);
    }
  }

  return rgbToHex(TEMPERATURE_STOPS[TEMPERATURE_STOPS.length - 1][1]);
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (value: number) => Math.round(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
