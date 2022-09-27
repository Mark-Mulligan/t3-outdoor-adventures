// React
import { FC } from "react";

// Next
import { useRouter } from "next/router";

interface IProps {
  pageNumber: number;
  currentPage: number;
}

const nonActiveStlyes = `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`;
const activeStyles = `py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`;

const PageBtn: FC<IProps> = ({ pageNumber, currentPage }) => {
  const router = useRouter();

  const createQueryObject = (key: string, value: string | number) => {
    if (router && router.query) {
      return { ...router.query, [key]: value };
    }

    return { key: value };
  };

  return (
    <button
      className={`${pageNumber === currentPage ? activeStyles : nonActiveStlyes}`}
      onClick={() =>
        router.push({ pathname: "/", query: createQueryObject("page", pageNumber) }, undefined, { shallow: true })
      }
    >
      {pageNumber}
    </button>
  );
};

export default PageBtn;
