import { FC, useState } from 'react';

import { Server } from '@/types/servers';
import { Column, SortBy } from '@/types/table';

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

  const resetSorting = () => {
    setSortedData(data);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name} onClick={() => sortData(column.name)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row: Server) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.name}>{row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
