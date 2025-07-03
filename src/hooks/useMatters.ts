import { useState, useEffect } from 'react';
// TODO: Replace with actual API service when available
// import { ApiServiceFactory } from '../services/api';

export function useMatters() {
  const [matters, setMatters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatters = async () => {
    try {
      setLoading(true);
      // const matterService = ApiServiceFactory.getMatterService();
      // const data = await matterService.getMatters();
      // setMatters(data);
      setMatters([]); // Placeholder: replace with real data
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatters();
  }, []);

  return { matters, loading, error, refresh: fetchMatters };
}
