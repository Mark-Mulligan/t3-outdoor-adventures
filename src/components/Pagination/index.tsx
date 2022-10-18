// React
import { FC } from 'react';

// Next
import { useRouter } from 'next/router';

// Libraries
import { v4 as uuidv4 } from 'uuid';

// Components
import PageBtn from './PageBtn';
import RangePlaceHolder from './RangePlaceHolder';

interface IProps {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

const Pagination: FC<IProps> = ({ page, limit, totalPages, totalResults }) => {
  const router = useRouter();

  const renderPageNumbers = () => {
    let btnText = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        btnText.push(i);
      }
    } else if (page > 4 && page < totalPages - 4) {
      btnText = [1, '...', page - 1, page, page + 1, '...', totalPages];
    } else if (page > 4) {
      btnText = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      btnText = [1, 2, 3, 4, 5, '...', totalPages];
    }

    return btnText.map((text) => {
      if (typeof text === 'number') {
        return <PageBtn key={uuidv4()} pageNumber={text} currentPage={page} />;
      }

      return <RangePlaceHolder key={uuidv4()} />;
    });
  };

  const createQueryObject = (key: string, value: string | number) => {
    if (router && router.query) {
      return { ...router.query, [key]: value };
    }

    return { key: value };
  };

  return (
    <div className="container px-4 py-2 flex sm:justify-between justify-center flex-wrap bg-gray-400/80">
      <div>
        <p className="text-center mt-2 mb-2 font-light">
          Showing <span className="font-semibold">{(page - 1) * limit + 1}</span> to{' '}
          <span className="font-semibold">{page * limit}</span> of <span className="font-semibold">{totalResults}</span>{' '}
          results
        </p>
        <div className="items-center flex justify-center mb-4">
          <div className="relative mr-2">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="grid-state"
              value={limit}
              onChange={(e) =>
                router.push({ pathname: '/', query: createQueryObject('limit', e.target.value) }, undefined, {
                  shallow: true,
                })
              }
            >
              <option>10</option>
              <option>20</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <p className="font-light">Results Per Page</p>
        </div>
      </div>
      <nav className="inline-flex items-center -space-x-px" aria-label="Pagination">
        <button
          className="block xs:py-2 xs:px-3 px-2 py-2 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          title="Previous Page"
          onClick={() =>
            router.push({ pathname: '/', query: createQueryObject('page', page - 1) }, undefined, { shallow: true })
          }
          disabled={page === 1}
        >
          <span className="sr-only">Previous Page</span>
          <svg
            aria-hidden="true"
            className="xs:w-5 xs:h-5 w-4 h-4 xs:m-0 m-[-0.5px]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {renderPageNumbers()}
        <button
          className="block py-2 xs:px-3 px-2 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          title="Next Page"
          onClick={() =>
            router.push({ pathname: '/', query: createQueryObject('page', page + 1) }, undefined, { shallow: true })
          }
          disabled={page === totalPages}
        >
          <span className="sr-only">Next Page</span>
          <svg
            aria-hidden="true"
            className="xs:w-5 xs:h-5 w-4 h-4 xs:m-0 m-[-0.5px]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
