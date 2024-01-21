import { useState } from "react";
import styles from "./signup.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmail } from "../redux/getEmailSlice";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addEmail(email));
      const response = await fetch(
        "http://localhost:8000/authenticate/signup",
        {
          method: "post",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(response.data);
      setSignupSuccess(true);
      console.log(signupSuccess);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Get Started</h1>
      <form action="POST" className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          className={styles.input}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          className={styles.input}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className={styles.btn}>
          Sign up
        </button>
        <button className={styles.btn}>back to Sign In</button>
      </form>
    </div>
  );
};

export default Signup;
