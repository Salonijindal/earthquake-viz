export interface EarthquakeData {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  place: string;
  id: string;
}

export interface PlotAxis {
  field: keyof EarthquakeData;
  label: string;
}