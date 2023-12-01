import { useEffect, useState } from 'react';
import { ReactComponent as ArchiveIcon } from '@/assets/archive.svg';
import classNames from 'classnames';
import Select, { SelectOption } from '@/components/Inputs/Select';

export interface VersionTableRow<T> {
  field: keyof T;
  label: string;
}

interface Props<T> {
  versions: Array<T>;
  name: string;
  rows: Array<VersionTableRow<T>>;
}

function Versions<T>({ name, rows, versions }: Props<T>) {
  const [version, setVersion] = useState<SelectOption | undefined>(undefined);

  useEffect(() => {
    setVersion({
      label: `Version ${versions.length - 1}`,
      value: 1,
    });
  }, [versions.length]);

  if (versions.length <= 1) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 dark:text-white h-80">
        <ArchiveIcon className="w-16 h-16" />
        <h4 className="dark:text-white">No Entries Found</h4>
      </div>
    );
  }

  if (!version) return null;

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col">
        <Select
          options={Array.from(Array(versions.length - 1).keys())
            .map((key) => key + 1)
            .map((key) => ({
              value: key,
              label: `Version ${versions.length - key}`,
            }))}
          selectedOption={version}
          onChange={setVersion}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="text-2xl font-semibold text-emerald-500">
            {name} - Versions
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td />
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
