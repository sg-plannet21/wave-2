import { useEffect, useState } from 'react';
import { ReactComponent as ArchiveIcon } from '@/assets/archive.svg';
import { ReactComponent as VersionIcon } from '@/assets/history.svg';
import classNames from 'classnames';
import Select, { SelectOption } from '@/components/Inputs/Select';
import VersionsSkeleton from './VersionsSkeleton';

export interface VersionTableRow<
  Entry extends { [P in keyof Entry]: Entry[P] },
> {
  field: keyof Entry;
  label: string;
}

interface Props<Entry extends { [P in keyof Entry]: Entry[P] }> {
  versions: Array<Entry>;
  name?: string;
  rows: Array<VersionTableRow<Entry>>;
  isLoading: boolean;
}

function Versions<Entry extends { [P in keyof Entry]: Entry[P] }>({
  name,
  rows,
  versions,
  isLoading,
}: Props<Entry>) {
  const [version, setVersion] = useState<SelectOption | undefined>(undefined);

  useEffect(() => {
    setVersion({
      label: versions.length - 1,
      value: 1,
    });
  }, [versions.length]);

  if (isLoading || !version) return <VersionsSkeleton />;

  if (versions.length <= 1) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 dark:text-white h-80">
        <ArchiveIcon className="w-16 h-16" />
        <h4 className="dark:text-white">No Entries Found</h4>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-end gap-2 px-2 py-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h2>
          <Select
            icon={<VersionIcon className="fill-gray-300" />}
            options={Array.from(Array(versions.length - 1).keys())
              .map((key) => key + 1)
              .map((key) => ({
                value: key,
                label: `Version ${versions.length - key}`,
              }))}
            selectedOption={version}
            onChange={setVersion}
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td aria-label="Propery Name" />
              <th scope="col" className="px-6 py-3">
                Current
              </th>
              <th scope="col" className="px-6 py-3">
                Version {version.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const currentValue = versions[0][row.field] as string;
              const versionedValue = versions[version.value as number][
                row.field
              ] as string;

              return (
                <tr
                  key={row.label}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row.label}
                  </th>
                  <td
                    className={classNames('px-6 py-4', {
                      'text-green-600 dark:text-green-400':
                        currentValue !== versionedValue,
                    })}
                  >
                    {currentValue}
                  </td>
                  <td
                    className={classNames('px-6 py-4', {
                      'text-red-600 dark:text-red-400':
                        currentValue !== versionedValue,
                    })}
                  >
                    {versionedValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Versions;
