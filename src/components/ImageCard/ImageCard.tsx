import css from "./ImageCard.module.css";
import { ImageInterface } from "../App/App.types";

interface ImageCardProps {
  image: ImageInterface;
  onClick: (image: ImageInterface) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={css.cardCont}>
      <img
        onClick={() => onClick(image)}
        className={css.cardImg}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
