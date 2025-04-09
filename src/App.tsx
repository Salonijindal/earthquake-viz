import DataTable from './components/DataTable';
import PlottingPane from './components/PlottingPane';
import { EarthquakeProvider } from './context/EarthquakeContext';
import { useEarthquakeData } from './hooks/useEarthquakeData';

function App() {
  useEarthquakeData();

  return (
    <EarthquakeProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Earthquake Data Visualization</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <PlottingPane />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <DataTable />
          </div>
        </div>
      </div>
    </EarthquakeProvider>
  );
}

export default App; 