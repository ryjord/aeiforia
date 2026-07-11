export interface ICity {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

// A spread of world cities across every inhabited continent — gives the
// globe genuine live coverage beyond the UK carbon intensity pins.
export const WORLD_CITIES: ICity[] = [
  { id: "new-york", name: "New York", lat: 40.7, lon: -74.0 },
  { id: "los-angeles", name: "Los Angeles", lat: 34.0, lon: -118.2 },
  { id: "mexico-city", name: "Mexico City", lat: 19.4, lon: -99.1 },
  { id: "rio-de-janeiro", name: "Rio de Janeiro", lat: -22.9, lon: -43.2 },
  { id: "reykjavik", name: "Reykjavík", lat: 64.1, lon: -21.9 },
  { id: "cairo", name: "Cairo", lat: 30.0, lon: 31.2 },
  { id: "lagos", name: "Lagos", lat: 6.5, lon: 3.4 },
  { id: "cape-town", name: "Cape Town", lat: -33.9, lon: 18.4 },
  { id: "moscow", name: "Moscow", lat: 55.8, lon: 37.6 },
  { id: "mumbai", name: "Mumbai", lat: 19.1, lon: 72.9 },
  { id: "beijing", name: "Beijing", lat: 39.9, lon: 116.4 },
  { id: "tokyo", name: "Tokyo", lat: 35.7, lon: 139.7 },
  { id: "sydney", name: "Sydney", lat: -33.9, lon: 151.2 },
  { id: "auckland", name: "Auckland", lat: -36.8, lon: 174.8 },
  { id: "singapore", name: "Singapore", lat: 1.35, lon: 103.8 },
  { id: "dubai", name: "Dubai", lat: 25.2, lon: 55.3 },
];
