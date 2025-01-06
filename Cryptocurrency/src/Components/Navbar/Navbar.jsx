import styles from "./Navbar.module.css";
import Search from "../Search/Search";

const Navbar = ({ searchValuefn, sortByfn }) => {
  return (
    <div className={styles.nav}>
      {/* Clicking on the title redirects to the homepage */}
      {/* <h1 onClick={() => (window.location.reload())}>Crypto-World</h1> */}
      <h1>Crypto-World</h1>

      {/* Passing searchValuefn function to Search component for handling search functionality */}
      <Search searchValuefn={searchValuefn} sortByfn={sortByfn} />
    </div>
  );
};

export default Navbar; 
