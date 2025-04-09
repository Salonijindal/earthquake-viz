import { memo } from 'react';
import { EarthquakeData } from '../../types/earthquake';
import { useChart } from '../../hooks/useChart';
import { useEarthquakeStore } from '../../store/earthquakeStore';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface ScatterPlotProps {
  xField: keyof EarthquakeData;
  yField: keyof EarthquakeData;
  xLabel: string;
  yLabel: string;
  onHover: (record: EarthquakeData | null) => void;
}

const ScatterPlot = memo(({
  xField,
  yField,
  xLabel,
  yLabel,
  onHover,
}: ScatterPlotProps) => {
  const data = useEarthquakeStore(state => state.data);
  const selectedRecord = useEarthquakeStore(state => state.selectedRecord);
  const setSelectedRecord = useEarthquakeStore(state => state.setSelectedRecord);

  const { chartData, options } = useChart({
    data,
    selectedRecord,
    xField,
    yField,
    xLabel,
    yLabel,
    onPointSelect: setSelectedRecord,
    onPointHover: onHover,
  });

  return (
    <div className="w-full h-full">
      <Chart type="scatter" data={chartData} options={options} />
    </div>
  );
});

export default ScatterPlot; 