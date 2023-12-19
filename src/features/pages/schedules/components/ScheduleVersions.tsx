import VersionsDrawer from '@/features/versions/components/VersionsDrawer';
import useScheduleVersionTableData from '../hooks/useScheduleVersionTableData';

interface Props {
  id: string;
}

function ScheduleVersions({ id }: Props) {
  const { name, versions, rows, isLoading } = useScheduleVersionTableData(id);

  return (
    <VersionsDrawer
      name={name}
      versions={versions}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default ScheduleVersions;
