import { useMemo } from 'react';
import dayjs from 'dayjs';
import { timeDifferenceLabel, TimeDifferenceReturn } from '@/lib/date-time';
import useExceptions from './useExceptions';
import useSectionId from '../../schedules/hooks/useSectionId';

export type ExceptionTableRecord = {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  difference: TimeDifferenceReturn;
};

function useExceptionsTableData() {
  const { data: exceptions, error } = useExceptions();
  const sectionId = useSectionId();

  const data: ExceptionTableRecord[] = useMemo(() => {
    if (!exceptions || !sectionId) return [];

    return exceptions
      .filter((exception) => exception.section === sectionId)
      .map((exception) => {
        const start = dayjs(exception.start_time);
        const end = dayjs(exception.end_time);

        const difference = timeDifferenceLabel(start, end);

        return {
          id: exception.schedule_exception_id,
          name: exception.description,
          startDate: start.valueOf(),
          endDate: end.valueOf(),
          difference,
        };
      });
  }, [exceptions, sectionId]);

  return { data, isLoading: !exceptions || !sectionId, error };
}

export default useExceptionsTableData;
