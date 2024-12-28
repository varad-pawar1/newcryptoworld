import { useEffect, useState } from "react"; // Importing necessary hooks from React
import styles from "./Pagination.module.css"; // Importing CSS module for pagination styling

const Pagination = ({ dataLength, itemsPerPage, paginate, currentPage }) => {
  // State to manage the total number of pages
  let [totalPage, setTotalPage] = useState([]); 

  useEffect(() => {
    let pagNumber = [];

    // Calculating total pages based on dataLength and itemsPerPage
    for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i++) {
      pagNumber.push(i); // Push each page number to the array
    }
    setTotalPage(pagNumber); // Updating the total pages
  }, [dataLength, itemsPerPage]); // Dependencies: re-run the effect whenever dataLength or itemsPerPage changes

  return (
    <div className={styles.mainPaginationBox}> {/* Container for pagination */}
      <div className={styles.paginationBox}>
        {totalPage.map((page, index) => {
          return (
            <button
              key={index}
              className={page === currentPage ? styles.activePageButton : ""} 
              onClick={() => paginate(page)} // OnClick event to navigate to a specific page
            >
              {page} 
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination; // Exporting Pagination component
