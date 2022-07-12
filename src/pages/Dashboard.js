import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logOut, fetchUser } from "../actions";
import styles from "./dashboard.module.scss";
import { fetchPosts } from "../actions";
import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const Dashboard = ({ userId, logOut, user, fetchUser, fetchPosts, posts }) => {
  const onClickLogOut = event => {
    event.preventDefault();
    logOut();
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchPosts();
    }
  }, [userId]);

  if (!userId || !user) {
    return (
      <div className={styles["fallback"]}>
        <div className={styles["container"]}>
          <h3>You are not signed in.</h3>
          <Link className={styles["button"]} to="/">Sign In</Link>
        </div>
      </div>
    );
  }

  const renderedPosts = Object.values(posts)
    .filter(
      post =>
        post.userId === userId ||
        Object.keys(user.followings || {})?.includes(post.userId)
    )
    .sort((a, b) => b.createdTime - a.createdTime)
    .map(post => <PostCard key={post.postId} post={post} />);

  return (
    <div>
      <NavBar profilePic={user.profilePicture} />
      <main className={styles["main"]}>
        <div className={styles["card-container"]}>{renderedPosts}</div>
        <aside>
          <div className={styles["user"]}>
            <img src={user.profilePicture} alt="" />
            <div>
              <p>{user.username}</p>
              <p>{user.name}</p>
            </div>
            <button onClick={onClickLogOut}>logout</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.userId,
    user: state.users[state.userId],
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { logOut, fetchUser, fetchPosts })(
  Dashboard
);
