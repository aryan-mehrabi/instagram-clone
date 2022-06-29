import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BiHeart, BiComment, BiDotsHorizontalRounded } from "react-icons/bi";
import styles from "./postCard.module.scss";
import Modal from "./Modal";
import { deletePost } from "../actions";
import { calculateTimeAgo } from "../helpers";

const PostCard = ({ post, userId, deletePost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [isModalOpen]);

  const settings = (
    <>
      <div className={styles["header"]}>
        <h3>Post Settings</h3>
      </div>
      <div className={styles["body"]}>
        <button
          onClick={() => setStep(step + 1)}
          className={styles["delete-post"]}
        >
          DELETE POST
        </button>
      </div>
    </>
  );
  const deleteAlert = (
    <>
      <div className={styles["header"]}>
        <h3>Are you sure you wanna delete this post?</h3>
      </div>
      <div className={styles["body"]}>
        <div>
          <button
            onClick={() => setStep(step - 1)}
            className={styles["cancel"]}
          >
            Cancel
          </button>
          <button
            onClick={() => deletePost(userId, post.postId)}
            className={styles["delete"]}
          >
            DELETE
          </button>
        </div>
      </div>
    </>
  );
  return (
    <>
      {isModalOpen && (
        <Modal closeModal={setIsModalOpen}>
          <div className={styles["delete-dialog"]}>
            {step === 0 ? settings : deleteAlert}
          </div>
        </Modal>
      )}
      <div className={styles["card"]}>
        <div className={styles["card__header"]}>
          <Link to={`/${post.userId}`}>
            <img src={post.creatorPic} alt="" />
            {post.username}
          </Link>
          {post.userId === userId && (
            <BiDotsHorizontalRounded onClick={() => setIsModalOpen(true)} />
          )}
        </div>
        <div>
          <img className={styles.post} src={post.image} alt="" />
        </div>
        <div className={styles["card__footer"]}>
          <div className={styles["like"]}>
            <BiHeart />
            <BiComment />
          </div>
          <div className={styles["details"]}>
            <p>25 likes</p>
            <p>
              <Link to={`/${post.userId}`}>{post.username} </Link>
              {post.description}
            </p>
            {/* <div className={styles["comment"]}>
              <p>
                <Link to="">user </Link> yo
              </p>
              <p>
                <span>user</span>yo
              </p>
              <p>
                <span>user</span>yo
              </p>
            </div> */}
            <p>{calculateTimeAgo(post.createdTime)}</p>
          </div>
          <div className={styles["post-comment"]}>
            <input type="text" placeholder="Add a comment" />
            <button>Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userId,
  };
};
export default connect(mapStateToProps, { deletePost })(PostCard);
