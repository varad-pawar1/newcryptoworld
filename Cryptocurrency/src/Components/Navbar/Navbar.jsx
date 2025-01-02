import styles from "./Navbar.module.css"; // Importing CSS module for Navbar styling
import Search from "../Search/Search"; // Importing Search component

const Navbar = ({ searchValuefn, sortByfn }) => {
  return (
    <div className={styles.nav}> {/* Navbar container with custom styling */}
      {/* Clicking on the title redirects to the homepage */}
      {/* <h1 onClick={() => (window.location.reload())}>Crypto-World</h1> */}
      <h1>Crypto-World</h1>

      {/* Passing searchValuefn function to Search component for handling search functionality */}
      <Search searchValuefn={searchValuefn} sortByfn={sortByfn} />
    </div>
  );
};

export default Navbar; // Exporting Navbar component
