import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message || 'An error has occurred. Please refresh the page and try again.'}</p>
    </div>
  );
}

export default ErrorMessage;