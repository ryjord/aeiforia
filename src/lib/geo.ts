import { Vector3 } from "three";

// Convert a lat/lon pair to a point on a sphere of the given radius.
export function latLonToVector3(lat: number, lon: number, radius: number): Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}
