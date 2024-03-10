import { useMemo } from 'react';
import { get } from 'lodash';
import useScheduleTableData, {
  ScheduleTableRecord,
} from './useSchedulesTableData';
import useSectionsLookup from '../../sections/hooks/useSectionsLookup';

export type ActiveScheduleTableRecord = ScheduleTableRecord & {
  sectionName: string;
};

function useActiveScheduleTableData() {
  const { data: schedules, isLoading, refetch } = useScheduleTableData();
  const sectionsLookup = useSectionsLookup();

  const activeSchedules: Array<ActiveScheduleTableRecord> = useMemo(() => {
    if (!schedules || !sectionsLookup) return [];

    return schedules
      .filter((schedule) => schedule.isActive)
      .map((schedule) => ({
        ...schedule,
        sectionName: get(sectionsLookup[schedule.section], 'section'),
      }));
  }, [schedules, sectionsLookup]);

  return {
    data: activeSchedules,
    isLoading: isLoading || !sectionsLookup,
    refetch,
  };
}

export default useActiveScheduleTableData;
