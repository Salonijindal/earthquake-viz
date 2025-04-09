import { memo, useState, useCallback } from 'react';
import { PlotAxis } from '../types/earthquake';
import ScatterPlot from './chart/ScatterPlot';
import AxisSelector from './chart/AxisSelector';
import { useEarthquakeContext } from '../context/EarthquakeContext';

const PlottingPane = memo(() => {
  // Local state management (prop drilling example)
  const [xAxis, setXAxis] = useState<PlotAxis>({ field: 'longitude', label: 'Longitude' });
  const [yAxis, setYAxis] = useState<PlotAxis>({ field: 'latitude', label: 'Latitude' });

  // Context API for highlighting
  const { setHighlightedRecord } = useEarthquakeContext();

  // Handlers for axis changes (to be passed down via props)
  const handleXAxisChange = useCallback((selected: PlotAxis) => {
    setXAxis(selected);
  }, []);

  const handleYAxisChange = useCallback((selected: PlotAxis) => {
    setYAxis(selected);
  }, []);

  return (
    <div className="h-[600px]">
      <div className="flex gap-4 mb-4">
        {/* Example of prop drilling through AxisSelector */}
        <AxisSelector
          label="X Axis"
          value={xAxis.field}
          onChange={handleXAxisChange}
        />
        <AxisSelector
          label="Y Axis"
          value={yAxis.field}
          onChange={handleYAxisChange}
        />
      </div>

      {/* ScatterPlot uses both Context (highlighting) and Zustand (selection) */}
      <ScatterPlot
        xField={xAxis.field}
        yField={yAxis.field}
        xLabel={xAxis.label}
        yLabel={yAxis.label}
        onHover={setHighlightedRecord}
      />
    </div>
  );
});

export default PlottingPane; 