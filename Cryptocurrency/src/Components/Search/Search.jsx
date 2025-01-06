import React, { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ sortByfn, searchValuefn }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    searchValuefn(value);
  };

  
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    sortByfn(value);
  };

  return (
    <div className={styles.searchStyle}>
      <form>
        <input
          type="search"
          name="search"
          className={styles.searchedValue}
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={handleInputChange}
        />
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="id">ID</option>
          <option value="symbol">Symbol</option>
          <option value="name">Name</option>
          <option value="current_price">Current Price</option>
        </select>
      </form>
    </div>
  );
};

export default Search;
