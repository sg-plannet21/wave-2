import Badge from '@/components/Data-Display/Badge';
import Table, { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
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

  const columns: TableColumn<BusinessUnitTableRecord>[] = [
    { field: 'name', label: 'name' },
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
