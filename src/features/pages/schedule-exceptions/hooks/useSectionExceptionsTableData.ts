import { useMemo } from 'react';
import useSectionId from '../../schedules/hooks/useSectionId';
import useExceptionsTableData, {
  ExceptionTableRecord,
} from './useExceptionsTableData';

function useSectionExceptionsTableData() {
  const { data: exceptions, isLoading } = useExceptionsTableData();
  const sectionId = useSectionId();

  const data: Array<ExceptionTableRecord> = useMemo(
    () => exceptions.filter((exception) => exception.section === sectionId),
    [exceptions, sectionId]
  );

  return { data, isLoading: isLoading || !sectionId };
}

export default useSectionExceptionsTableData;
