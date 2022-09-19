import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TableColumn<T> {
  field: keyof T;
  headerName: string;
}

interface IProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
}

const Table = <T extends object>({ columns, rows }: IProps<T>) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th
                key={uuidv4()}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {column.headerName}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={uuidv4()}>
              {columns.map((column) => {
                const data: any = row[column.field];
                return (
                  <td key={uuidv4()} className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {data}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
