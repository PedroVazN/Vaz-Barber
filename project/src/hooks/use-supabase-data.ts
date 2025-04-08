
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseSupabaseDataOptions<T> {
  tableName: string;
  columnName?: string;
  columnValue?: string | number;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
}

export function useSupabaseData<T>(options: UseSupabaseDataOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        let query = supabase
          .from(options.tableName)
          .select('*');
        
        if (options.columnName && options.columnValue) {
          query = query.eq(options.columnName, options.columnValue);
        }
        
        if (options.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          });
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setData(data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [options.tableName, options.columnName, options.columnValue]);

  return { data, isLoading, error };
}
