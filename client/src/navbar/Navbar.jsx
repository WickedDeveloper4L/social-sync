import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.main}>
      <span className={styles.title}>Contacts</span>

      <div className={styles.details}>
        <div className={styles.texts}>
          <span className={styles.name}>Ahia kleine Chris</span>
          <span className={styles.email}>chriskleine433@gmail.com</span>
        </div>
        <img
          className={styles.profile_image}
          src="https://i.ibb.co/GsxwRg3/shearlingjacket.jpg"
          alt="shearlingjacket"
          border="0"
        />
      </div>
    </div>
  );
};

export default Navbar;
