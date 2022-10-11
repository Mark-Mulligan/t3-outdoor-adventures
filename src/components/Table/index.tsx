// React
import { useState } from 'react';

//Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import SortArrow from './SortArrow';

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
      <table className="w-full text-sm text-left" style={{ minWidth: 550 }}>
        <thead className="text-xs uppercase bg-gray-400/80">
          <tr>
            {columns.map((column) => {
              return (
                <th
                  key={uuidv4()}
                  className="px-5 py-3 cursor-pointer"
                  onClick={() => handleColumnHeaderClick(column.field.toString())}
                >
                  <div className="flex">
                    <span className="mr-1">{column.headerName}</span>
                    <SortArrow router={router} columnHeader={column.field.toString()} />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <Link key={uuidv4()} href={`/park/${row.parkcode}`}>
                <tr className={`border-b border-gray-500 bg-gray-300/80 cursor-pointer hover:bg-gray-300`}>
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
