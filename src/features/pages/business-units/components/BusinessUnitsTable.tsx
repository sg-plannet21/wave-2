import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useBusinessUnitsTableData, {
  BusinessUnitTableRecord,
} from '../hooks/useBusinessUnitsTableData';
import DeleteBusinessUnit from './DeleteBusinessUnit';

function BusinessUnitsTable() {
  const { data, isLoading } = useBusinessUnitsTableData();

  const EntityLink = react.useCallback(
    (businessUnit: { entry: BusinessUnitTableRecord }) => (
      <Link to={businessUnit.entry.id}>{businessUnit.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (businessUnit: { entry: BusinessUnitTableRecord }) => (
      <div className="text-right">
        <DeleteBusinessUnit
          id={businessUnit.entry.id}
          name={businessUnit.entry.name}
        />
      </div>
    ),
    []
  );

  const columns: TableColumn<BusinessUnitTableRecord>[] = [
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

  if (isLoading) return <WaveTableSkeleton numberOfColumns={2} />;

  return <WaveTable<BusinessUnitTableRecord> data={data} columns={columns} />;
}

export default BusinessUnitsTable;
