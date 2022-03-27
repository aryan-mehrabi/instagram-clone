import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchUserPosts,
  followUser,
  unfollowUser,
} from "../actions";
import styles from "./user.module.scss";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import ProfileEdit from "../components/ProfileEdit";

const User = ({
  users,
  authUserId,
  fetchUser,
  fetchUserPosts,
  followUser,
  unfollowUser,
  posts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();
  const { [authUserId]: authUser, [userId]: user } = users;

  useEffect(() => {
    if (authUserId) {
      fetchUser(userId);
      fetchUser(authUserId);
      fetchUserPosts(userId);
    }
  }, [authUserId]);

  useEffect(() => {
    setIsModalOpen(false);
  }, [users]);

  if (!authUserId || !authUser || !user) {
    return <h1>loading...</h1>;
  }

  const followButton = (
    <button
      onClick={() => followUser(authUserId, userId, user.followers)}
      className={styles["follow-button"]}
    >
      Follow
    </button>
  );
  const unfollowButton = (
    <button
      onClick={() => unfollowUser(authUserId, userId, user.followers)}
      className={styles["edit-button"]}
    >
      Unfollow
    </button>
  );
  const editButton = (
    <button
      className={styles["edit-button"]}
      onClick={() => setIsModalOpen(true)}
    >
      EditProfile
    </button>
  );

  const followings = Object.keys(authUser.followings || {});
  const postsArray = Object.values(posts).filter(
    post => post.userId === userId
  );

  const renderedPosts = postsArray.map(post => (
    <div key={post.postId}>
      <img src={post.image} alt="" />
    </div>
  ));

  return (
    <div>
      {isModalOpen && (
        <Modal closeModal={setIsModalOpen}>
          <ProfileEdit setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      <NavBar profilePic={authUser.profilePicture} />
      <main className={styles["main"]}>
        <section className={styles["information"]}>
          <div className={styles["avatar"]}>
            <img src={user.profilePicture} alt="" />
          </div>
          <div className={styles["detail"]}>
            <header>
              <h2>{user.username}</h2>
              {authUserId === userId
                ? editButton
                : followings.includes(userId)
                ? unfollowButton
                : followButton}
            </header>
            <div className={styles["stats"]}>
              <p>
                <span>{postsArray.length}</span> posts
              </p>
              <p>
                <span>{user.followers}</span> follower
              </p>
              <p>
                <span>{Object.keys(user.followings || {}).length}</span>{" "}
                following
              </p>
            </div>
            <p>{user.name}</p>
            <p>{user.bio}</p>
          </div>
        </section>
        <section>
          <div className={styles["posts-container"]}>{renderedPosts}</div>
        </section>
      </main>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    authUserId: state.userId,
    users: state.users,
    posts: state.posts,
  };
};
export default connect(mapStateToProps, {
  fetchUser,
  fetchUserPosts,
  followUser,
  unfollowUser,
})(User);
