import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ dataLength, itemsPerPage, paginate, currentPage }) => {

  let [totalPage, setTotalPage] = useState([]);

  useEffect(() => {
    let pagNumber = [];


    for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i++) {
      pagNumber.push(i);
    }
    setTotalPage(pagNumber);
  }, [dataLength, itemsPerPage]);

  return (
    <div className={styles.mainPaginationBox}>
      <div className={styles.paginationBox}>
        {totalPage.map((page, index) => {
          return (
            <button
              key={index}
              className={page === currentPage ? styles.activePageButton : ""}
              onClick={() => paginate(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination; 
