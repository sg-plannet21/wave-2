import TableSkeleton, { TableSkeletonProps } from '../Table/TableSkeleton';

export type WaveTableSkeletonProps = TableSkeletonProps;

function DashboardComponent({
  numberOfColumns,
  numberOfRows,
}: WaveTableSkeletonProps) {
  return (
    <div className="flex flex-col">
      <div className="py-2 px-4 flex">
        <div className="w-72">
          <div className="h-3 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse" />
        </div>
      </div>
      <TableSkeleton
        numberOfColumns={numberOfColumns}
        numberOfRows={numberOfRows}
      />
      <div className="py-2 px-4 flex">
        <div className="w-36">
          <div className="h-6 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
