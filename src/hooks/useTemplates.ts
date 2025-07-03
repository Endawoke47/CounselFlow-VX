import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useTemplates() {
  const [templates, setTemplates] = useState<Database['public']['Tables']['templates']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getTemplateService()
      .getTemplates()
      .then((data) => {
        if (isMounted) {
          setTemplates(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load templates');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { templates, loading, error };
}
