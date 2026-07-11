// Approximate centroid for each GB DNO regions

export const REGION_COORDINATES: Record<number, { lat: number; lon: number }> = {
  1: { lat: 57.4, lon: -4.2 }, // North Scotland
  2: { lat: 55.8, lon: -3.5 }, // South Scotland
  3: { lat: 53.6, lon: -2.5 }, // North West England
  4: { lat: 54.9, lon: -1.6 }, // North East England
  5: { lat: 53.8, lon: -1.5 }, // Yorkshire
  6: { lat: 53.2, lon: -3.2 }, // North Wales & Merseyside
  7: { lat: 51.6, lon: -3.5 }, // South Wales
  8: { lat: 52.5, lon: -1.9 }, // West Midlands
  9: { lat: 52.95, lon: -1.15 }, // East Midlands
  10: { lat: 52.3, lon: 0.8 }, // East England
  11: { lat: 50.9, lon: -3.5 }, // South West England
  12: { lat: 51.2, lon: -1.4 }, // South England
  13: { lat: 51.5, lon: -0.12 }, // London
  14: { lat: 51.2, lon: 0.6 }, // South East England
};
