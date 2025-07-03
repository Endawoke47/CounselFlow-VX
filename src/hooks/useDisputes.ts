import { useState, useEffect } from 'react';
import { ApiServiceFactory } from '../services/api';
import type { Database } from '@/types/database';

export function useDisputes() {
  const [disputes, setDisputes] = useState<Database['public']['Tables']['disputes']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const disputeService = ApiServiceFactory.getDisputeService();
      const data = await disputeService.getDisputes();
      setDisputes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch disputes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  return { disputes, loading, error };
}
