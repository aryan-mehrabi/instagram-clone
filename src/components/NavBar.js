import React, { useEffect, useState } from "react";
import { BiHome, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./navBar.module.scss";
import NewPost from "../pages/NewPost";
import Modal from "./Modal";

const NavBar = ({ profilePic, posts, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(false);
  }, [posts]);

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={setIsModalOpen}>
          <NewPost />
        </Modal>
      )}
      <nav>
        <div className={styles["nav-container"]}>
          <Link to="/">
            <h2>Instagram</h2>
          </Link>
          <div className={styles["menu"]}>
            <Link to="/">
              <BiHome />
            </Link>
            <div onClick={() => setIsModalOpen(true)}>
              <BiPlus />
            </div>
            <Link to={`/${userId}`}>
              <img src={profilePic} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = state => {
  return {
    posts: state.posts,
    userId: state.userId,
  };
};
export default connect(mapStateToProps)(NavBar);
