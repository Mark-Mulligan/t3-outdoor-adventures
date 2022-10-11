// Next
import Link from 'next/link';

// UUID
import { v4 as uuidv4 } from 'uuid';

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
  return (
    <nav className="flex-none md:w-[220px] w-full text-gray-400 md:px-6 md:pt-6 px-3 pt-3 md:relative fixed">
      <div className="md:hidden relative flex justify-between">
        <Link href="/">
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
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <ul className="md:fixed static">
        <li className="py-2 text-xl cursor-pointer hover:text-white">
          <Link href="/">
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
        <hr className="my-2 h-px border-0 bg-gray-700"></hr>
        {parkSideNavItems.map((navItem) => {
          return (
            <li key={uuidv4()} className="py-2 text-xl cursor-pointer hover:text-white">
              <a href={`#${navItem.id}`}>{navItem.label}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ParkPageNav;
