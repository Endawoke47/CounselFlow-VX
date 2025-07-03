import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useBoardPacks() {
  const [boardPacks, setBoardPacks] = useState<Database['public']['Tables']['board_packs']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getBoardPackService()
      .getBoardPacks()
      .then((data) => {
        if (isMounted) {
          setBoardPacks(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load board packs');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { boardPacks, loading, error };
}
