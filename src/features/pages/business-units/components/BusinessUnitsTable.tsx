import Badge from '@/components/Data-Display/Badge';
import Table, { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import useBusinessUnitsTableData, {
  BusinessUnitTableRecord,
} from '../hooks/useBusinessUnitsTableData';

function BusinessUnitsTable() {
  const { data } = useBusinessUnitsTableData();

  const Test = react.useCallback(
    (bu: { entry: BusinessUnitTableRecord }) => (
      <Badge variant="success" label={bu.entry.id} />
    ),
    []
  );

  const EntityLink = react.useCallback(
    (businessUnit: { entry: BusinessUnitTableRecord }) => (
      <Link to={businessUnit.entry.id}>{businessUnit.entry.name}</Link>
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
      Cell: Test,
    },
  ];

  return <Table<BusinessUnitTableRecord> data={data} columns={columns} />;
}

export default BusinessUnitsTable;
