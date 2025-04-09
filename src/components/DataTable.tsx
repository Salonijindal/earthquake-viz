import { memo, useCallback, useState, useMemo } from 'react';
import { useEarthquakeStore } from '../store/earthquakeStore';
import { EarthquakeData } from '../types/earthquake';

const ROWS_PER_PAGE = 10;

// Column configuration for better organization and reusability
const COLUMNS = [
  { key: 'time', label: 'Time', width: '25%' },
  { key: 'place', label: 'Place', width: '35%' },
  { key: 'mag', label: 'Magnitude', width: '10%' },
  { key: 'depth', label: 'Depth', width: '10%' },
  { key: 'coordinates', label: 'Coordinates', width: '20%' }
] as const;

// Memoized row component that only re-renders when its own selection state changes
const TableRow = memo(({ 
  earthquake
}: { 
  earthquake: EarthquakeData;
}) => {
  const isSelected = useEarthquakeStore(
    useCallback(state => state.selectedRecord?.id === earthquake.id, [earthquake.id])
  );
  const setSelectedRecord = useEarthquakeStore(state => state.setSelectedRecord);

  const handleClick = useCallback(() => {
    setSelectedRecord(isSelected ? null : earthquake);
  }, [earthquake, isSelected, setSelectedRecord]);

  return (
    <div
      className={`flex items-center hover:bg-gray-100 cursor-pointer ${
        isSelected ? 'bg-blue-200 font-semibold' : ''
      }`}
      onClick={handleClick}
    >
      <div style={{ width: COLUMNS[0].width }} className="px-4 py-3 truncate">
        {new Date(earthquake.time).toLocaleString()}
      </div>
      <div style={{ width: COLUMNS[1].width }} className="px-4 py-3 truncate" title={earthquake.place}>
        {earthquake.place}
      </div>
      <div style={{ width: COLUMNS[2].width }} className="px-4 py-3 text-right">
        {earthquake.mag.toFixed(1)}
      </div>
      <div style={{ width: COLUMNS[3].width }} className="px-4 py-3 text-right">
        {earthquake.depth.toFixed(1)}
      </div>
      <div style={{ width: COLUMNS[4].width }} className="px-4 py-3 truncate" title={`${earthquake.latitude.toFixed(4)}, ${earthquake.longitude.toFixed(4)}`}>
        {`${earthquake.latitude.toFixed(4)}, ${earthquake.longitude.toFixed(4)}`}
      </div>
    </div>
  );
});

// Main DataTable component that only re-renders when the data or page changes
const DataTable = memo(() => {
  const data = useEarthquakeStore(state => state.data);
  const isLoading = useEarthquakeStore(state => state.isLoading);
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200">
        <div className="flex bg-gray-50">
          {COLUMNS.map(column => (
            <div
              key={column.key}
              style={{ width: column.width }}
              className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                ['mag', 'depth'].includes(column.key) ? 'text-right' : ''
              }`}
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className="bg-white divide-y divide-gray-200">
          {currentData.map((earthquake) => (
            <TableRow
              key={earthquake.id}
              earthquake={earthquake}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default DataTable; 