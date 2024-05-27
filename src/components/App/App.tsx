import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import Loader from "../Loader/Loader.js";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "../ImageModal/ImageModal.js";
import { fetchImg } from "../api.js";
import css from "./App.module.css";
import { ImageInterface } from "./App.types.js";

export default function App() {
  const [imgData, setImgData] = useState<ImageInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(``);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [currantImg, setCurrantImg] = useState<ImageInterface | null>(null);

  function openModal(imgOnClick: ImageInterface): void {
    setCurrantImg(imgOnClick);
    setIsOpen(true);
  }

  function closeModal(): void {
    setCurrantImg(null);
    setIsOpen(false);
  }

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleSearch = (newSearchText: string): void => {
    setQuery(newSearchText);
    setPage(1);
    setImgData([]);
  };

  useEffect(() => {
    if (query === ``) {
      return;
    }
    async function findImg() {
      try {
        setIsLoading(true);
        const data: ImageInterface[] = await fetchImg(query, page);

        setImgData((prevImg) => {
          return [...prevImg, ...data];
        });
        // пришел массив с 6 обьектами
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    findImg();
  }, [query, page]);

  return (
    <div className={css.appContainer}>
      <SearchBar onSearch={handleSearch}></SearchBar>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {imgData.length > 0 && (
        <ImageGallery images={imgData} onOpenModal={openModal}></ImageGallery>
      )}
      {imgData.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore}></LoadMoreBtn>
      )}
      {modalIsOpen && currantImg && (
        <ImageModal
          isOpen={modalIsOpen}
          onCloseModal={closeModal}
          image={currantImg}
        ></ImageModal>
      )}
    </div>
  );
}
