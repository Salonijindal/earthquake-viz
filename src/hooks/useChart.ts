import { useCallback, useMemo } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { EarthquakeData } from '../types/earthquake';
import { CHART_CONFIG, ChartPoint, formatTooltip } from '../components/chart/config';

export interface UseChartProps {
  data: EarthquakeData[];
  selectedRecord: EarthquakeData | null;
  xField: keyof EarthquakeData;
  yField: keyof EarthquakeData;
  xLabel: string;
  yLabel: string;
  onPointSelect: (point: EarthquakeData | null) => void;
  onPointHover: (point: EarthquakeData | null) => void;
}

export const useChart = ({
  data,
  selectedRecord,
  xField,
  yField,
  xLabel,
  yLabel,
  onPointSelect,
  onPointHover,
}: UseChartProps) => {
  const handlePointClick = useCallback(
    (point: ChartPoint | null) => {
      onPointSelect(point?.originalData ?? null);
    },
    [onPointSelect]
  );

  const handlePointHover = useCallback(
    (point: ChartPoint | null) => {
      onPointHover(point?.originalData ?? null);
    },
    [onPointHover]
  );

  const chartData = useMemo<ChartData<'scatter'>>(() => {
    const basePoints: ChartPoint[] = data.map((record) => ({
      x: record[xField] as number,
      y: record[yField] as number,
      originalData: record,
    }));

    const defaultPoints = basePoints.filter(
      (point) => point.originalData !== selectedRecord
    );

    const datasets = [
      {
        label: 'Earthquakes',
        data: defaultPoints,
        backgroundColor: CHART_CONFIG.colors.default,
        pointRadius: CHART_CONFIG.sizes.default,
      },
    ];

    if (selectedRecord) {
      datasets.push({
        label: 'Selected',
        data: [
          {
            x: selectedRecord[xField] as number,
            y: selectedRecord[yField] as number,
            originalData: selectedRecord,
          },
        ],
        backgroundColor: CHART_CONFIG.colors.selected,
        pointRadius: CHART_CONFIG.sizes.selected,
      });
    }

    return { datasets };
  }, [data, selectedRecord, xField, yField]);

  const options = useMemo<ChartOptions<'scatter'>>(() => {
    return {
      animation: CHART_CONFIG.animation,
      scales: {
        x: {
          title: {
            display: true,
            text: xLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yLabel,
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const point = context.raw as ChartPoint;
              return formatTooltip(point.originalData, xField, yField);
            },
          },
        },
      },
      onHover: (event, elements) => {
        const point = elements[0]
          ? (chartData.datasets[elements[0].datasetIndex].data[
              elements[0].index
            ] as ChartPoint)
          : null;
        handlePointHover(point);
      },
      onClick: (event, elements) => {
        const point = elements[0]
          ? (chartData.datasets[elements[0].datasetIndex].data[
              elements[0].index
            ] as ChartPoint)
          : null;
        handlePointClick(point);
      },
    };
  }, [chartData, handlePointClick, handlePointHover, xLabel, yLabel]);

  return { chartData, options };
}; 