export interface IMicroplasticGrid {
  latStart: number;
  lonStart: number;
  latStep: number;
  lonStep: number;
  latCount: number;
  lonCount: number;
  values: (number | null)[];
  observedAt: string;
}
