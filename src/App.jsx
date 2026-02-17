import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './services/unsplash-api.js';
import styles from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchImages(searchQuery, 1);
      setImages(data.results);
      setTotalPages(data.total_pages);
      
      if (data.results.length === 0) {
        setError('No images found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to fetch images. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more images. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 200);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      
      <main className={styles.main}>
        {error && <ErrorMessage message={error} />}
        
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={handleImageClick} />
        )}
        
        {isLoading && <Loader />}
        
        {!isLoading && page < totalPages && images.length > 0 && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
        
        {!isLoading && images.length === 0 && !error && (
          <p className={styles.placeholder}>
            Enter a search term above to find images
          </p>
        )}
      </main>

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;