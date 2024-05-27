import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard.js";
import { ImageInterface } from "../App/App.types";

interface ImageGalleryProps {
  images: ImageInterface[];
  onOpenModal: (image: ImageInterface) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onOpenModal }) => {
  return (
    <ul className={css.list}>
      {images.map((image, index) => (
        <li className={css.listItem} key={index}>
          <ImageCard image={image} onClick={onOpenModal}></ImageCard>
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
