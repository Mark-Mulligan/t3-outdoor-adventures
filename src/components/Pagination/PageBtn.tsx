import { FC } from 'react';

interface IProps {
  pageLabel: number;
  currentPage: number;
}

const baseStyles = `hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 hover:border-gray-300`;
const nonActiveStlyes = `bg-white text-black`;
const activeStyles = `bg-black text-white`;

const PageBtn: FC<IProps> = ({ pageLabel, currentPage }) => {
  return (
    <a
      className={`${baseStyles} ${pageLabel === currentPage ? activeStyles : nonActiveStlyes}`}
      href="#"
      title={`Page ${pageLabel}`}
    >
      {pageLabel}
    </a>
  );
};

export default PageBtn;
