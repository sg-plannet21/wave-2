import entityLookup from '@/lib/entity-lookup';
import { useCallback, useMemo } from 'react';
import { validateSchedule, NewScheduleData } from '@/lib/date-time';
import { Schedule } from '../types';
import useSchedules from './useSchedules';
import useSectionId from './useSectionId';

function useValidateSchedule() {
  const sectionId = useSectionId();
  const { data } = useSchedules({ enabled: !!sectionId });

  const scheduleLookup = data && entityLookup<Schedule>(data, 'schedule_id');

  const customSchedules: Schedule[] = useMemo(() => {
    if (!scheduleLookup || !sectionId) return [];

    return Object.values(scheduleLookup).filter(
      (schedule) => schedule.section === sectionId && !schedule.is_default
    );
  }, [scheduleLookup, sectionId]);

  const validate = useCallback(
    (scheduleData: NewScheduleData) =>
      validateSchedule(customSchedules, scheduleData),
    [customSchedules]
  );

  return { validate, scheduleLookup };
}
export default useValidateSchedule;
