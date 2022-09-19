// React
import { FC } from 'react';

// Next
import { useRouter } from 'next/router';

interface IProps {
  pageNumber: number;
  currentPage: number;
}

const baseStyles = `hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 hover:border-gray-300`;
const nonActiveStlyes = `bg-white text-black`;
const activeStyles = `bg-black text-white`;

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
      className={`${baseStyles} ${pageNumber === currentPage ? activeStyles : nonActiveStlyes}`}
      onClick={() =>
        router.push({ pathname: '/', query: createQueryObject('page', pageNumber) }, undefined, { shallow: true })
      }
    >
      {pageNumber}
    </button>
  );
};

export default PageBtn;
