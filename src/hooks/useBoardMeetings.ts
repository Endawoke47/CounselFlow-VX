import { useEffect, useState } from 'react';
import { ApiServiceFactory } from '@/services/api/index';
import type { Database } from '@/types/database';

export function useBoardMeetings() {
  const [boardMeetings, setBoardMeetings] = useState<Database['public']['Tables']['board_meetings']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    ApiServiceFactory.getBoardPackService()
      .getBoardMeetings()
      .then((data) => {
        if (isMounted) {
          setBoardMeetings(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load board meetings');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { boardMeetings, loading, error };
}
