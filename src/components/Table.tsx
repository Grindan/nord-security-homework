import { FC, useState } from 'react';

import { Server } from '@/types/servers';
import { Column } from '@/types/table';

type Props = {
  data: Array<Server>;
  columns: Array<Column<'name' | 'distance'>>;
};

const Table: FC<Props> = ({ data, columns }) => {
  const [sortedData, setSortedData] = useState(data);

  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.label}</th>
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
