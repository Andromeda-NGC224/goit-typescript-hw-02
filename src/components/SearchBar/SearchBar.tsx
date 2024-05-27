import { IoSearch } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";

import css from "./SearchBar.module.css";
import React, { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (newSearchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(
      'input[name="searchInput"]'
    ) as HTMLInputElement;
    const inputValue = input.value;

    if (!inputValue.trim()) {
      toast.error("Please enter a search word.");
    }
    onSearch(inputValue.trim());
    (event.target as HTMLFormElement).reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="searchInput"
          autoComplete="off"
          placeholder="Search images..."
        />
        <button className={css.btn} type="submit">
          <IoSearch size={26} className={css.iconSearch} />
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
