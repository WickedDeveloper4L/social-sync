import styles from "./App.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addEmail } from "./redux/getEmailSlice";
const App = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    try {
      dispatch(addEmail(email));
      const response = await fetch("http://localhost:8000/authenticate", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status === 200) {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.main}>
      <span className={styles.welcome}>WELCOME</span>
      <span className={styles.logo}>socialSync</span>

      {!loginModal && (
        <button className={styles.btn} onClick={() => setLoginModal(true)}>
          Login <IoMdLogIn />
        </button>
      )}

      {loginModal && (
        <form action="submit" onSubmit={login} className={styles.loginModal}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.btn}>
            Continue <IoMdLogIn />
          </button>
        </form>
      )}

      <Link className={styles.link} to="/signup">
        Create an Account
      </Link>
    </div>
  );
};

export default App;
