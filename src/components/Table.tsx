import { FC, useState } from 'react';

import { Server } from '@/types/servers';
import { Column, SortBy } from '@/types/table';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import CrossIcon from './icons/CrossIcon';

type Props<T> = {
  data: Array<Server>;
  columns: Array<Column<T>>;
};

const Table: FC<Props<'name' | 'distance'>> = ({ data, columns }) => {
  const [sortedData, setSortedData] = useState(data || []);
  const [sortKey, setSortKey] = useState<'name' | 'distance' | null>(null);
  const [sortDirection, setSortDirection] = useState<SortBy | null>(null);

  const sortData = (key: 'name' | 'distance') => {
    const newDirection =
      key === sortKey
        ? sortDirection === SortBy.Asc
          ? SortBy.Desc
          : SortBy.Asc
        : SortBy.Asc;

    const newSortedData = [...sortedData].sort((a, b) => {
      const shouldBeAscSorted = sortKey === key && newDirection === SortBy.Desc;

      if (a[key] > b[key]) {
        return shouldBeAscSorted ? -1 : 1;
      }
      if (a[key] < b[key]) {
        return shouldBeAscSorted ? 1 : -1;
      }
      return 0;
    });

    setSortKey(key);
    setSortDirection(newDirection);
    setSortedData(newSortedData);
  };

  const clearSorting = () => {
    setSortedData(data);
    setSortKey(null);
    setSortDirection(null);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              className={
                'cursor-pointer px-2 py-3 outline-blue-400' +
                `w-[${100 / columns.length}%]`
              }
              onClick={() => sortData(column.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sortData(column.name);
                }
              }}
              tabIndex={0}
            >
              <div className="flex">
                {column.label}
                <ChevronDownIcon
                  className={
                    'mx-3 outline-blue-400' +
                    (column.name === sortKey ? '' : ' opacity-10') +
                    (sortDirection === SortBy.Asc && column.name === sortKey
                      ? ' rotate-180'
                      : '')
                  }
                />
                <CrossIcon
                  className={column.name === sortKey ? '' : ' invisible'}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSorting();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      clearSorting();
                    }
                  }}
                  tabIndex={0}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row: Server) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.name} className="py-1 px-2 border">
                {row[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
