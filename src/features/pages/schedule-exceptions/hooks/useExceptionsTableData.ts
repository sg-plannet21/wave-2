import { useMemo } from 'react';
import dayjs from 'dayjs';
import { timeDifferenceLabel, TimeDifferenceReturn } from '@/lib/date-time';
import { get } from 'lodash';
import useExceptions from './useExceptions';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

export type ExceptionTableRecord = {
  id: string;
  name: string;
  section: string;
  startDate: number;
  endDate: number;
  difference: TimeDifferenceReturn;
  route: string;
};

function useSectionExceptionsTableData() {
  const { data: exceptions, error, refetch } = useExceptions();
  const routesLookup = useRoutesLookup();

  const data: ExceptionTableRecord[] = useMemo(() => {
    if (!exceptions || !routesLookup) return [];

    return exceptions.map((exception) => {
      const start = dayjs(exception.start_time);
      const end = dayjs(exception.end_time);

      const difference = timeDifferenceLabel(start, end);

      return {
        id: exception.schedule_exception_id,
        name: exception.description,
        section: exception.section,
        startDate: start.valueOf(),
        endDate: end.valueOf(),
        difference,
        route: get(routesLookup[exception.route], 'route_name'),
      };
    });
  }, [exceptions, routesLookup]);

  return { data, isLoading: !exceptions || !routesLookup, error, refetch };
}

export default useSectionExceptionsTableData;
