// React
import { FC, Dispatch, SetStateAction } from 'react';

// Next
import Image from 'next/image';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Custom Types
import { IParkImage } from '../../customTypes/parks';

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  images: IParkImage[] | undefined;
  selectedImageIndex: number;
  setSelectedImageIndex: Dispatch<SetStateAction<number>>;
}

const ImageModal: FC<IProps> = ({ showModal, setShowModal, images, selectedImageIndex, setSelectedImageIndex }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      id="large-modal"
      tabIndex={-1}
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black/70 ${
        showModal ? '' : 'hidden'
      }`}
    >
      <div className="pt-10">
        <button
          onClick={() => setShowModal(false)}
          type="button"
          style={{ zIndex: 2 }}
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
          data-modal-toggle="popup-modal"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <h2 className="text-3xl text-center text-white mb-4">{images[selectedImageIndex]?.title}</h2>

        <div className="relative">
          {images.map((image, index) => {
            return (
              <div
                key={uuidv4()}
                className={`${selectedImageIndex === index ? '' : 'hidden'} duration-700 ease-in-out`}
                style={{ maxWidth: 900, maxHeight: '60%', margin: 'auto' }}
              >
                <img src={image.url} className="" alt={image.altText} />
              </div>
            );
          })}
        </div>

        <div className="relative mt-4 mx-auto" style={{ maxWidth: 900 }}>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white">
              <svg
                aria-hidden="true"
                className="w-10 h-10 sm:w-10 sm:h-10 text-gray:100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white">
              <svg
                aria-hidden="true"
                className="w-10 h-10 sm:w-10 sm:h-10 text-gray:100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>

          <p className="px-20 text-center">{images[selectedImageIndex]?.caption}</p>
          <p className="px-20 text-center italic">
            Photo {selectedImageIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
