import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loader from "../Loader/Loader.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import { fetchImg } from "../api.js";
import css from './App.module.css'





export default function App() {

  const [imgData, setImgData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(``)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currantImg, setCurrantImg] = useState(null);

  function openModal(imgOnClick) {
    setCurrantImg(imgOnClick)
    setIsOpen(true);
  }

  function closeModal() {
    setCurrantImg(null)
    setIsOpen(false);
  }


  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleSearch = (newSearchText) => {
    setQuery(newSearchText)
    setPage(1)
    setImgData([])
  }


  useEffect(() => {
  if (query === ``) {
        return
      }
  async function findImg() {
    try {
      setIsLoading(true)
      const data = await fetchImg(query, page)
      setImgData(prevImg => {
        return [...prevImg, ...data]
      })
    // пришел массив с 6 обьектами
      } catch (error) {
        setIsError(true)
      } finally {
      setIsLoading(false)
      
      }
  }
  findImg()
}, [query, page]);

  return (
    <div className={css.appContainer}>
      <SearchBar onSearch={handleSearch}></SearchBar>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {imgData.length > 0 && <ImageGallery images={imgData} onOpenModal={openModal}></ImageGallery>}
      {imgData.length > 0 && <LoadMoreBtn onClick={handleLoadMore}></LoadMoreBtn>}
      {modalIsOpen && <ImageModal isOpen={modalIsOpen} onCloseModal={closeModal} image={currantImg}></ImageModal>}
    </div>
  )
}
