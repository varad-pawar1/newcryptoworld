import React, { useState } from "react"; // Importing React and useState hook
import styles from "./Search.module.css"; // Importing CSS module for styling

const Search = ({ searchValuefn }) => {
  // State for search input
  const [search, setSearch] = useState("");

  // Handle input change event
  const handleInputChange = (e) => {
    const value = e.target.value; // Get the current input value
    setSearch(value); // Update the search state
    searchValuefn(value); // Pass the search value to the parent component's search function
  };

  return (
    <div className={styles.searchStyle}> {/* Container with custom styling */}
      <form>
        <input
          type="search" // Input type for search functionality
          name="search" // Name attribute for form submission (optional)
          className={styles.searchedValue} // Input field styling from CSS module
          placeholder="Search cryptocurrencies..." // Placeholder text
          value={search} // Controlled input value
          onChange={handleInputChange} // Handling input change
        />
      </form>
    </div>
  );
};

export default Search; // Exporting Search component
