import { useMemo } from 'react';
import useExceptions from './useExceptions';

export type ExceptionTableRecord = {
  id: string;
  name: string;
};

function useExceptionsTableData() {
  const { data: exceptions, isLoading, error } = useExceptions();

  const data: ExceptionTableRecord[] = useMemo(() => {
    if (!exceptions) return [];

    return exceptions.map((exception) => ({
      id: exception.schedule_exception_id,
      name: exception.description,
    }));
  }, [exceptions]);

  return { data, isLoading, error };
}

export default useExceptionsTableData;
