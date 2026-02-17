import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TbSearch } from "react-icons/tb";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search term", {
        position: "top-right",
      });
      return;
    }

    onSubmit(query.trim());
    setQuery("");
  };

  return (
    <header className={styles.header}>
      <Toaster position="top-center" reverseOrder={false} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
        <button className={styles.searchButton}>
          <TbSearch className={styles.searchIcon} />
        </button>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
