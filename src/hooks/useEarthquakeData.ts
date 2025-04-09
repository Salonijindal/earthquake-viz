import { useEffect } from 'react';
import axios from 'axios';
import { useEarthquakeStore } from '../store/earthquakeStore';
import { EarthquakeData } from '../types/earthquake';

function parseCSVData(csvText: string): EarthquakeData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    return {
      time: values[0],
      latitude: parseFloat(values[1]),
      longitude: parseFloat(values[2]),
      depth: parseFloat(values[3]),
      mag: parseFloat(values[4]),
      place: values[13],
      id: values[11]
    };
  });
}

export const useEarthquakeData = () => {
  const { setData, setLoading, setError } = useEarthquakeStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'
        );
        const parsedData = parseCSVData(response.data);
        setData(parsedData);
      } catch (error) {
        setError('Failed to fetch earthquake data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setLoading, setError]);
}; 