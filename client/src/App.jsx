import styles from "./App.module.scss";
const App = () => {
  return (
    <div className={styles.main}>
      <span className={styles.welcome}>WELCOME</span>
      <span className={styles.logo}>socialSync</span>
      <a href="https://localhost:8000/auth/google" className={styles.btn}>
        Sign in
      </a>
    </div>
  );
};

export default App;
