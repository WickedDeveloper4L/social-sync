import styles from "./search.module.scss";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className={styles.main}>
      <input className={styles.searchbar} type="text" placeholder="Search" />
      <BiSearch className={styles.icon} />
    </div>
  );
};

export default Search;
