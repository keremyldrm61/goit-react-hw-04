import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.item}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={image.urls.small}
              alt={image.alt_description || 'Image'}
              onClick={() => onImageClick(image)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;