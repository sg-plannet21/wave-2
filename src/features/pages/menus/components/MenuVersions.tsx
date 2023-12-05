import VersionsDrawer from '@/features/versions/components/VersionsDrawer';
import useMenuVersionsTableData from '../hooks/useMenuVersionTableData';

interface Props {
  id: string;
}

function MenuVersions({ id }: Props) {
  const { name, versions, rows, isLoading } = useMenuVersionsTableData(id);

  return (
    <VersionsDrawer
      name={name}
      versions={versions}
      rows={rows}
      isLoading={isLoading}
    />
  );
}

export default MenuVersions;
