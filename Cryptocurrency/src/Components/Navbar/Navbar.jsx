import styles from "./Navbar.module.css";
import Search from "../Search/Search";

const Navbar = ({ searchValuefn, sortByfn }) => {
  return (
    <div className={styles.nav}>
      {/* <h1 onClick={() => (window.location.reload())}>Crypto-World</h1> */}
      <h1>Crypto-World</h1>

      <Search searchValuefn={searchValuefn} sortByfn={sortByfn} />
    </div>
  );
};

export default Navbar; 
