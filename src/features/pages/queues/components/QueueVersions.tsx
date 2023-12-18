import VersionsDrawer from '@/features/versions/components/VersionsDrawer';
import useQueueVersionTableData from '../hooks/useQueueVersionTableData';

interface Props {
  id: string;
}

function QueueVersions({ id }: Props) {
  const { name, versions, rows, isLoading } = useQueueVersionTableData(id);

  return (
    <VersionsDrawer
      name={name}
      versions={versions}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default QueueVersions;
