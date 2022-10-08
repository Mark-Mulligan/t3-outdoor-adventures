// React
import { useState } from 'react';

//Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Utils
import { removeQueryKey, createQueryObject } from '../../utils/routing';

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
  const router = useRouter();
  // const [sortInfo, setSortInfo] = useState(null);

  const handleColumnHeaderClick = (columnHeader: string) => {
    let sortBy: string | undefined;
    let sortDirection: string | undefined = 'asc';
    let sortStr = router?.query?.sort;

    if (sortStr && typeof sortStr === 'string') {
      sortBy = sortStr.split('-')[0];
      sortDirection = sortStr.split('-')[1];

      if (sortBy === columnHeader && sortDirection === 'desc') {
        router.push({ pathname: '/', query: removeQueryKey(router, 'sort') }, undefined, { shallow: true });
        return;
      }

      if (sortBy === columnHeader) {
        sortDirection = 'desc';
        router.push(
          { pathname: '/', query: createQueryObject(router, 'sort', `${columnHeader}-${sortDirection}`) },
          undefined,
          {
            shallow: true,
          },
        );
        return;
      }
    }

    router.push({ pathname: '/', query: createQueryObject(router, 'sort', `${columnHeader}-asc`) }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-300" style={{ minWidth: 550 }}>
        <thead className="text-xs uppercase bg-gray-700">
          <tr>
            {columns.map((column) => {
              return (
                <th
                  key={uuidv4()}
                  className="px-5 py-3"
                  onClick={() => handleColumnHeaderClick(column.field.toString())}
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
              <Link key={uuidv4()} href={`/park/${row.parkcode}`}>
                <tr className="border-b bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-600/50">
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
