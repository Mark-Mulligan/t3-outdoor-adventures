// React
import { FC, Dispatch, SetStateAction } from "react";

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ImageModal: FC<IProps> = ({ showModal, setShowModal }) => {
  return (
    <div
      id="large-modal"
      tabIndex={-1}
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black/50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="mx-auto relative p-4 w-full max-w-4xl h-full flex items-center">
        <div>
          <div className="relative rounded-lg shadow bg-gray-700 shrink">
            <div className="flex justify-between items-center p-5 rounded-t border-b border-gray-600">
              <h3 className="text-xl font-medium text-white">Large modal</h3>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="large-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its
                citizens, companies around the world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is
                meant to ensure a common set of data rights in the European Union. It requires organizations to notify
                users as soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
              <button
                data-modal-toggle="large-modal"
                type="button"
                className="text-white bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-toggle="large-modal"
                type="button"
                className="text-gray-300 bg-grey-700 hover:bg-gray-600 focus:ring-gray-600 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
