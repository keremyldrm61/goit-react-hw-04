import { useEffect } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
    >
      <button className={styles.closeButton} onClick={onClose}>
        <FiX size={24} />
      </button>

      <div className={styles.content}>
        <img
          className={styles.image}
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
        />

        <div className={styles.info}>
          {image.description && (
            <p className={styles.description}>{image.description}</p>
          )}

          <div className={styles.details}>
            <div className={styles.author}>
              <strong>Author:</strong> {image.user.name}
            </div>

            {image.likes && (
              <div className={styles.likes}>
                <strong>Likes:</strong> {image.likes}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
