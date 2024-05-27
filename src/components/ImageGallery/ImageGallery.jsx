import css from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard.jsx";

export default function ImageGallery({ images, onOpenModal }) {

 


    return (
        <ul className={css.list}>
            {images.map((image, index) => (
                <li className={css.listItem} key={index} >
                   <ImageCard image={image} onClick={onOpenModal}></ImageCard> 
</li>
    ))}
</ul>
    )
}