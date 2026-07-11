// Maps a normalized concentration value (0-1, already log-scaled and clamped by
const CONCENTRATION_STOPS: [number, [number, number, number]][] = [
  [0, [56, 189, 248]], // low - light blue
  [0.5, [250, 204, 21]], // moderate - yellow
  [1, [239, 68, 68]], // high - red
];

export function microplasticColor(t: number): string {
  const clamped = Math.min(Math.max(t, 0), 1);

  for (let i = 0; i < CONCENTRATION_STOPS.length - 1; i++) {
    const [stopA, colorA] = CONCENTRATION_STOPS[i];
    const [stopB, colorB] = CONCENTRATION_STOPS[i + 1];

    if (clamped >= stopA && clamped <= stopB) {
      const mix = (clamped - stopA) / (stopB - stopA);
      const blended: [number, number, number] = [
        colorA[0] + (colorB[0] - colorA[0]) * mix,
        colorA[1] + (colorB[1] - colorA[1]) * mix,
        colorA[2] + (colorB[2] - colorA[2]) * mix,
      ];
      return rgbToHex(blended);
    }
  }

  return rgbToHex(CONCENTRATION_STOPS[CONCENTRATION_STOPS.length - 1][1]);
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (value: number) => Math.round(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
