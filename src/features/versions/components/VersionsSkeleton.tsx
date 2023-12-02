import classNames from 'classnames';

interface Props {
  numberOfRows?: number;
}

const columnArray = Array.from(Array(3).keys());

function VersionsSkeleton({ numberOfRows = 8 }: Props) {
  const rowsArray = Array.from(Array(numberOfRows).keys());

  return (
    <div className="flex flex-col">
      <div className="py-3 px-2 flex items-end justify-between">
        <div className="w-60">
          <div className="h-5 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse" />
        </div>
        <div className="w-40">
          <div className="h-6 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse" />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td className="w-48" />
            <th className="px-6 py-3">
              <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse w-32" />
            </th>
            <th className="px-6 py-3">
              <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse w-32" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rowsArray.map((row) => (
            <tr
              key={row}
              className="odd:bg-white odd:dark:bg-slate-800 even:bg-gray-200 even:dark:bg-gray-700"
            >
              {columnArray.map((col) => (
                <td key={`${row}${col}`} className="px-6 py-4">
                  <div
                    className={classNames(
                      'h-2 bg-gray-100 rounded-full dark:bg-gray-600 animate-pulse',
                      { 'w-1/2': row % 2 !== 0 },
                      { 'w-3/4': row % 2 === 0 }
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VersionsSkeleton;
