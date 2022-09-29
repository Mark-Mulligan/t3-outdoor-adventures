// React
import { FC, useState } from "react";

// Next
import Image from "next/image";

// UUID
import { v4 as uuidv4 } from "uuid";

// Components
import ParkInfoSection from "../ParkInfoSection";
import ImageModal from "../Modals/ImageModal";

// Custom Types
import { IParkImage } from "../../customTypes/parks";

interface IProps {
  images: IParkImage[];
}

const Photos: FC<IProps> = ({ images }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ParkInfoSection title="Photos">
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {images.map((image) => {
          return (
            <li
              onClick={() => setShowModal(true)}
              key={uuidv4()}
              className="2xl:h-96 xl:h-96 lg:h-80 md:h-72 sm:h-64 h-64 cursor-pointer"
              style={{ position: "relative", width: "100%" }}
            >
              <Image src={image.url} alt={image.altText} layout="fill" objectFit="cover" />
            </li>
          );
        })}
      </ul>
      <ImageModal showModal={showModal} setShowModal={setShowModal} />
    </ParkInfoSection>
  );
};

export default Photos;
