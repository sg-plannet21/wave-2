import { useMemo } from 'react';
import dayjs from 'dayjs';
import { timeDifferenceLabel, TimeDifferenceReturn } from '@/lib/date-time';
import { get } from 'lodash';
import useExceptions from './useExceptions';
import useSectionId from '../../schedules/hooks/useSectionId';
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

function useExceptionsTableData() {
  const { data: exceptions, error } = useExceptions();
  const sectionId = useSectionId();
  const routesLookup = useRoutesLookup();

  const data: ExceptionTableRecord[] = useMemo(() => {
    if (!exceptions || !sectionId || !routesLookup) return [];

    return exceptions
      .filter((exception) => exception.section === sectionId)
      .map((exception) => {
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
  }, [exceptions, routesLookup, sectionId]);

  return { data, isLoading: !exceptions || !sectionId || !routesLookup, error };
}

export default useExceptionsTableData;
