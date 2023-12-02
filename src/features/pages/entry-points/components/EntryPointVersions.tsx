import VersionsDrawer from '@/features/versions/components/VersionsDrawer';
import useEntryPointVersionsTableData from '../hooks/useEntryPointVersionsTableData';

interface Props {
  id: string;
}

function EntryPointVersions({ id }: Props) {
  const { name, versions, rows, isLoading } =
    useEntryPointVersionsTableData(id);

  return (
    <VersionsDrawer
      name={name}
      versions={versions}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default EntryPointVersions;
