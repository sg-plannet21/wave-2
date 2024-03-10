import { useMemo } from 'react';
import { get } from 'lodash';
import useExceptionsTableData, {
  ExceptionTableRecord,
} from './useExceptionsTableData';
import useSectionsLookup from '../../sections/hooks/useSectionsLookup';

function useActiveExceptionTableData() {
  const { data: exceptions, isLoading, refetch } = useExceptionsTableData();
  const sectionsLookup = useSectionsLookup();

  const data: Array<ExceptionTableRecord> = useMemo(() => {
    if (!exceptions || !sectionsLookup) return [];

    return exceptions.map((exception) => ({
      ...exception,
      section: get(sectionsLookup[exception.section], 'section'),
    }));
  }, [exceptions, sectionsLookup]);

  return { data, isLoading: isLoading || !sectionsLookup, refetch };
}

export default useActiveExceptionTableData;
