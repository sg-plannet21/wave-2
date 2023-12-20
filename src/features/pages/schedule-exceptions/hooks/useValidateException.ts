import { useCallback, useMemo } from 'react';
import { validateException } from '@/lib/date-time';
import useExceptions from './useExceptions';
import useSectionId from '../../schedules/hooks/useSectionId';
import { ScheduleException } from '../types';

function useValidateException() {
  const sectionId = useSectionId();
  const { data } = useExceptions({ enabled: !!sectionId });

  const exceptions: ScheduleException[] = useMemo(() => {
    if (!data || !sectionId) return [];

    return data.filter((exception) => exception.section === sectionId);
  }, [data, sectionId]);

  const validate = useCallback(
    (
      sectionedExceptions: ScheduleException[],
      startDate: string,
      endDate: string
    ) => validateException(sectionedExceptions, startDate, endDate),
    []
  );

  return { validate, exceptions };
}
export default useValidateException;
