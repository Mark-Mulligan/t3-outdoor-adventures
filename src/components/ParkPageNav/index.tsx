// React
import { useState, useContext } from 'react';

// Next
import Link from 'next/link';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Context
import { AppContext } from '../../context/AppContext';

const parkSideNavItems = [
  { label: 'Description', id: 'description' },
  { label: 'Entrance Fees', id: 'entrance-fees' },
  { label: 'Hours', id: 'hours' },
  { label: 'Activities', id: 'activities' },
  { label: 'Location', id: 'location' },
  { label: 'Contact Info', id: 'contact-info' },
  { label: 'Photos', id: 'photos' },
];

const ParkPageNav = () => {
  const { lastSearchString } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex-none md:w-[220px] w-full md:px-6 md:pt-6 px-0 pt-0 md:relative fixed z-10 overflow-hidden">
      <div className="md:hidden relative flex justify-between px-3 py-3 z-20 bg-slate-300">
        <Link href={`/parks${lastSearchString}`}>
          <span className="flex items-center">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Parks
          </span>
        </Link>
        <svg
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <ul
        className={`fixed md:top-5 md:h-auto md:pt-0 md:w-auto md:left-6 md:bg-inherit bg-slate-300 h-full top-0 pt-12 w-[220px] transition-all ${
          menuOpen ? 'left-[calc(100%-220px)]' : 'left-full'
        }`}
      >
        <li className="py-2 text-xl cursor-pointer hover:text-slate-600 md:block hidden">
          <Link href={`/parks${lastSearchString}`}>
            <span className="flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Parks
            </span>
          </Link>
        </li>
        <hr className="my-2 h-px border-0 bg-gray-700 md:block hidden" />
        {parkSideNavItems.map((navItem) => {
          return (
            <li key={uuidv4()} className="md:px-0 px-4 py-2 text-xl cursor-pointer hover:text-slate-600">
              <a href={`#${navItem.id}`}>{navItem.label}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ParkPageNav;
