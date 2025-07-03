// Temporal Data Hook for CounselFlow Analytics
// Custom hook for managing temporal data state

import { useState, useEffect } from 'react';
import { TimePeriod, getTemporalData } from '@/data/temporalData';

// Hook for managing temporal data
export const useTemporalData = (initialPeriod: TimePeriod = '24h') => {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>(initialPeriod);
  const [data, setData] = useState(() => getTemporalData(initialPeriod));

  useEffect(() => {
    setData(getTemporalData(activePeriod));
  }, [activePeriod]);

  return {
    activePeriod,
    setActivePeriod,
    data
  };
};
