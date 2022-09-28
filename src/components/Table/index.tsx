import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

interface TableColumn<T> {
  field: keyof T;
  headerName: string;
}

interface IProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
}

interface objectWithParkcode extends Object {
  parkcode: string;
}

const Table = <T extends objectWithParkcode>({ columns, rows }: IProps<T>) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-700">
          <tr>
            {columns.map((column) => {
              return (
                <th key={uuidv4()} className="px-5 py-3">
                  {column.headerName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <Link key={uuidv4()} href={`/park/${row.parkcode}`}>
                <tr className="border-b bg-gray-800 border-gray-700">
                  {columns.map((column) => {
                    const data: any = row[column.field];
                    return (
                      <td key={uuidv4()} className="px-5 py-3">
                        {data}
                      </td>
                    );
                  })}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
