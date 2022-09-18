// React
import { FC, Dispatch, SetStateAction } from 'react';

// Next
import Link from 'next/link';

// Components
import PageBtn from './PageBtn';
import RangePlaceHolder from './RangePlaceHolder';

interface IProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const Pagination: FC<IProps> = ({ page, setPage, totalPages }) => {
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
        return <PageBtn pageLabel={text} currentPage={page} />;
      }

      return <RangePlaceHolder />;
    });
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
        <a
          className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
          title="Previous Page"
          onClick={() => setPage(page - 1)}
        >
          <span className="sr-only">Previous Page</span>
          <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
          </svg>
        </a>
        {renderPageNumbers()}
        <a
          className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 text-black hover:border-gray-300"
          title="Next Page"
          href="#"
          onClick={() => setPage(page + 1)}
        >
          <span className="sr-only">Next Page</span>
          <svg className="block w-4 h-4 fill-current" viewBox="0 0 256 512" aria-hidden="true" role="presentation">
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
          </svg>
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
