import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import Badge from '@/components/Data-Display/Badge';
import { Tooltip } from 'react-tooltip';
import useMenusTableData, {
  MenuTableRecord,
  menuOptions,
} from '../hooks/useMenusTableData';
import DeleteMenu from './DeleteMenu';

function MenusTable() {
  const { data, isLoading } = useMenusTableData();

  const EntityLink = react.useCallback(
    (record: { entry: MenuTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const Option = (option: (typeof menuOptions)[number]) =>
    react.useCallback((record: { entry: MenuTableRecord }) => {
      const route = record.entry[option.key];
      if (!route)
        return <Badge variant="secondary" label={option.label} size="sm" />;
      return (
        <>
          <Tooltip id={option.key} />
          <Badge
            data-tooltip-id={option.key}
            data-tooltip-content={route}
            variant="primary"
            size="sm"
            label={option.label}
          />
        </>
      );
    }, []);

  const Delete = react.useCallback(
    (record: { entry: MenuTableRecord }) => (
      <div className="text-right">
        <DeleteMenu id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const optionRecords: TableColumn<MenuTableRecord>[] = menuOptions.map(
    (opt) => ({
      field: opt.key,
      label: '',
      ignoreFiltering: true,
      Cell: Option(opt),
    })
  );

  const columns: TableColumn<MenuTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    ...optionRecords,
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
