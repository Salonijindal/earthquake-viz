import { createContext, useContext, ReactNode, useState } from 'react';
import { EarthquakeData } from '../types/earthquake';

interface EarthquakeContextType {
  highlightedRecord: EarthquakeData | null;
  setHighlightedRecord: (record: EarthquakeData | null) => void;
}

const EarthquakeContext = createContext<EarthquakeContextType | undefined>(undefined);

export const EarthquakeProvider = ({ children }: { children: ReactNode }) => {
  // This state is specifically for temporary highlighting/hovering
  const [highlightedRecord, setHighlightedRecord] = useState<EarthquakeData | null>(null);
  
  return (
    <EarthquakeContext.Provider value={{ highlightedRecord, setHighlightedRecord }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

export const useEarthquakeContext = () => {
  const context = useContext(EarthquakeContext);
  if (!context) {
    throw new Error('useEarthquakeContext must be used within an EarthquakeProvider');
  }
  return context;
}; 