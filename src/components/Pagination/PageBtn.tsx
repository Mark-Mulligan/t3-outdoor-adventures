// React
import { FC } from "react";

// Next
import { useRouter } from "next/router";

interface IProps {
  pageNumber: number;
  currentPage: number;
}

const nonActiveStlyes = `py-2 px-3 leading-tight border hover:bg-gray-700 hover:text-white bg-gray-800 border-gray-700 text-gray-400`;
const activeStyles = `py-2 px-3 leading-tight text-white bg-gray-700 border border-gray-700 hover:bg-blue-100 hover:text-blue-700`;

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
