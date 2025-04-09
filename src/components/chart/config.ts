import { EarthquakeData } from '../../types/earthquake';

export interface ChartPoint {
  x: number;
  y: number;
  originalData: EarthquakeData;
}

export const CHART_CONFIG = {
  colors: {
    default: '#8884d8',
    selected: '#ff0000'
  },
  sizes: {
    default: 4,
    hover: 6,
    selected: 8
  },
  animation: {
    duration: 0
  }
};

export const AXIS_OPTIONS = [
  { field: 'longitude' as const, label: 'Longitude' },
  { field: 'latitude' as const, label: 'Latitude' },
  { field: 'mag' as const, label: 'Magnitude' },
  { field: 'depth' as const, label: 'Depth' }
] as const;

export const formatTooltip = (point: EarthquakeData, xField: keyof EarthquakeData, yField: keyof EarthquakeData) => {
  const xValue = typeof point[xField] === 'number' ? (point[xField] as number).toFixed(1) : point[xField];
  const yValue = typeof point[yField] === 'number' ? (point[yField] as number).toFixed(1) : point[yField];
  return `${String(xField)}: ${xValue}, ${String(yField)}: ${yValue}`;
}; 