import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../actions";
import styles from "./home.module.scss";

const Home = ({ userId, logIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, [userId]);

  const onSubmitForm = event => {
    event.preventDefault();
    logIn(email, password);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["login"]}>
        <form onSubmit={onSubmitForm}>
          <h1>Instagram</h1>
          <div>
            <label>Email</label>
            <input
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className={styles["signup"]}>
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    userId: state.userId,
  };
};
export default connect(mapStateToProps, { logIn })(Home);
