import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useKnowledgeEntries() {
  const [entries, setEntries] = useState<Database['public']['Tables']['knowledge_entries']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getKnowledgeService()
      .getKnowledgeEntries()
      .then((data) => {
        if (isMounted) {
          setEntries(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load knowledge entries');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { entries, loading, error };
}
