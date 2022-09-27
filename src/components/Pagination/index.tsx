// React
import { FC, Dispatch, SetStateAction } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libraries
import { v4 as uuidv4 } from "uuid";

// Components
import PageBtn from "./PageBtn";
import RangePlaceHolder from "./RangePlaceHolder";

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
      btnText = [1, "...", page - 1, page, page + 1, "...", totalPages];
    } else if (page > 4) {
      btnText = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      btnText = [1, 2, 3, 4, 5, "...", totalPages];
    }

    return btnText.map((text) => {
      if (typeof text === "number") {
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
    <div className="container px-4 py-2">
      <nav className="inline-flex items-center -space-x-px" aria-label="Pagination">
        <button
          className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          title="Previous Page"
          onClick={() =>
            router.push({ pathname: "/", query: createQueryObject("page", page - 1) }, undefined, { shallow: true })
          }
          disabled={page === 1}
        >
          <span className="sr-only">Previous Page</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        {renderPageNumbers()}
        <button
          className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          title="Next Page"
          onClick={() =>
            router.push({ pathname: "/", query: createQueryObject("page", page + 1) }, undefined, { shallow: true })
          }
          disabled={page === totalPages}
        >
          <span className="sr-only">Next Page</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>
      <div>
        <p className="text-center mt-2 mb-2">
          Showing {(page - 1) * limit + 1} to {page * limit} of {totalResults} results
        </p>
        <div className="flex items-center justify-center">
          <div className="relative mr-2">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              value={limit}
              onChange={(e) =>
                router.push({ pathname: "/", query: createQueryObject("limit", e.target.value) }, undefined, {
                  shallow: true,
                })
              }
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <p>Results Per Page</p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
