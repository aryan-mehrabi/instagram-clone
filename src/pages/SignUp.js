import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../actions";
import styles from "./signUp.module.scss";

const SignUp = ({ signUp, userId }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onSubmitForm = event => {
    event.preventDefault();
    if (password === passwordRepeat) {
      signUp(email, password, username);
    }
  };

  useEffect(() => {
    if (userId) {
      navigate("/dashboard")
    }
  }, [userId])

  return (
    <div className={styles["container"]}>
      <div className={styles["login"]}>
        <form onSubmit={onSubmitForm}>
          <h1>Instagram</h1>
          <div>
            <label>username</label>
            <input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>email</label>
            <input
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label>password</label>
            <input
              required
              minLength="6"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div>
            <label>repeat password</label>
            <input
              required
              minLength="6"
              value={passwordRepeat}
              onChange={e => setPasswordRepeat(e.target.value)}
              type="password"
            />
          </div>
          <button>Sign Up</button>
        </form>
        <div className={styles["signup"]}>
          <p>Have an account?</p>
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    userId: state.userId,
  }
}
export default connect(mapStateToProps, { signUp })(SignUp);
