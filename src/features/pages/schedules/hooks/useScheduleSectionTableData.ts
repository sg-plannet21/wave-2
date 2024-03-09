import { useCallback, useMemo, useState } from 'react';
import useSchedulesTableData, {
  ScheduleTableRecord,
} from './useSchedulesTableData';

import useSectionId from './useSectionId';

function useSchedulesSectionTableData() {
  const [showDefault, setShowDefault] = useState(true);
  const { data, isLoading, error } = useSchedulesTableData();
  const sectionId = useSectionId();

  const toggleDefault = useCallback(() => setShowDefault((prev) => !prev), []);

  const sectionSchedules: Array<ScheduleTableRecord> = useMemo(
    () => data.filter((schedule) => schedule.section === sectionId),

    [data, sectionId]
  );

  const sectionFiltered: ScheduleTableRecord[] = useMemo(() => {
    if (showDefault) return sectionSchedules;
    return sectionSchedules.filter((record) => !record.isDefault);
  }, [showDefault, sectionSchedules]);

  return {
    data: sectionFiltered,
    isLoading: !sectionId || isLoading,
    error,
    isDefault: showDefault,
    toggleDefault,
  };
}

export default useSchedulesSectionTableData;
