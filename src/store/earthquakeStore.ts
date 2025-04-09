import { create } from 'zustand';
import { EarthquakeData } from '../types/earthquake';

interface EarthquakeStore {
  data: EarthquakeData[];
  selectedRecord: EarthquakeData | null;
  isLoading: boolean;
  error: string | null;
  setData: (data: EarthquakeData[]) => void;
  setSelectedRecord: (record: EarthquakeData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
  data: [],
  selectedRecord: null,
  isLoading: false,
  error: null,
  setData: (data) => set({ data }),
  setSelectedRecord: (record) => set((state) => {
    if (state.selectedRecord?.id === record?.id) {
      return state;
    }
    return { selectedRecord: record };
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));