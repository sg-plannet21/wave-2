import Versions from '@/features/versions/components/Versions';
import useEntryPointVersionsTableData from '../../entry-points/hooks/useEntryPointVersionsTableData';

function VersionTest() {
  const { versions, rows, isLoading, name } = useEntryPointVersionsTableData(
    'ab4bed59-b5d5-4118-8a37-2a9cc62bcf54'
  );
  return (
    <Versions
      versions={versions}
      name={name}
      isLoading={isLoading}
      rows={rows}
    />
  );
}

export default VersionTest;
