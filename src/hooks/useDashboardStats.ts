import { useEffect, useState } from 'react';
import { ApiServiceFactory, DashboardStat } from '@/services/api/index';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getDashboardService()
      .getDashboardStats()
      .then((data) => {
        if (isMounted) {
          setStats(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load dashboard stats');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading, error };
}
