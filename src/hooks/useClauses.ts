import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useClauses() {
  const [clauses, setClauses] = useState<Database['public']['Tables']['clauses']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getClauseService()
      .getClauses()
      .then((data) => {
        if (isMounted) {
          setClauses(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load clauses');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { clauses, loading, error };
}
