import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useMenusTableData, { MenuTableRecord } from '../hooks/useMenusTableData';
import DeleteMenu from './DeleteMenu';

function MenusTable() {
  const { data, isLoading } = useMenusTableData();

  const EntityLink = react.useCallback(
    (record: { entry: MenuTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (record: { entry: MenuTableRecord }) => (
      <div className="text-right">
        <DeleteMenu id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<MenuTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return <WaveTable<MenuTableRecord> data={data} columns={columns} />;
}

export default MenusTable;
