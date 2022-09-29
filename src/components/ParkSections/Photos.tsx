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
  const [selectedImage, setSelectedImage] = useState<IParkImage | undefined>(undefined);

  const handleImageClick = (image: IParkImage) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <ParkInfoSection title="Photos">
      <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {images.map((image) => {
          return (
            <li
              onClick={() => handleImageClick(image)}
              key={uuidv4()}
              className="2xl:h-96 xl:h-96 lg:h-80 md:h-72 sm:h-64 h-64 cursor-pointer"
              style={{ position: "relative", width: "100%" }}
            >
              <Image blurDataURL={image.url} src={image.url} alt={image.altText} layout="fill" objectFit="cover" />
            </li>
          );
        })}
      </ul>
      <ImageModal showModal={showModal} setShowModal={setShowModal} parkImg={selectedImage} />
    </ParkInfoSection>
  );
};

export default Photos;
