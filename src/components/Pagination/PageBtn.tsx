// React
import { FC } from 'react';

// Next
import { useRouter } from 'next/router';

interface IProps {
  pageNumber: number;
  currentPage: number;
}

const nonActiveStlyes = `py-2 px-3 xs:text-sm text-xs leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`;
const activeStyles = `z-10 py-2 px-3 xs:text-sm text-xs leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700`;

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
        router.push({ pathname: '/', query: createQueryObject('page', pageNumber) }, undefined, { shallow: true })
      }
    >
      {pageNumber}
    </button>
  );
};

export default PageBtn;
