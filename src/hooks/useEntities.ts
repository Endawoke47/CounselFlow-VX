import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useEntities() {
  const [entities, setEntities] = useState<Database['public']['Tables']['entities']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getEntityService()
      .getEntities()
      .then((data) => {
        if (isMounted) {
          setEntities(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load entities');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { entities, loading, error };
}
