import { useState, useEffect } from 'react';
import { ApiServiceFactory } from '../services/api';

export function useContracts() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const contractService = ApiServiceFactory.getContractService();
      const data = await contractService.getContracts();
      setContracts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contracts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return { contracts, loading, error, refresh: fetchContracts };
}
