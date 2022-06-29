import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref as refStorage,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  auth,
  writeNewPost,
  setData,
  getData,
  updateData,
} from "../api/Firebase";

export const authChanged = userId => {
  if (userId) {
    return { type: "LOG_IN", payload: userId };
  } else {
    return { type: "LOG_OUT" };
  }
};

export const logOut = () => async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error.message;
  }
};

export const logIn = (email, password) => async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error.message;
  }
};

export const signUp = (email, password, username) => async () => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setData(response.user.uid, "users", {
      userId: response.user.uid,
      username,
      profilePicture: process.env.REACT_APP_DEFAULT_PROFILE_PICTURE_UR,
      followers: 0,
    });
  } catch (error) {
    const errorMessage = error.message;
    throw errorMessage;
  }
};

export const fetchPosts = () => async dispatch => {
  const response = await getData(`posts`);
  if (response.exists()) {
    dispatch({ type: "FETCH_POSTS", payload: response.val() });
  }
};

export const fetchUserPosts = userId => async dispatch => {
  const response = await getData(`user-posts/${userId}`);
  if (response.exists()) {
    dispatch({ type: "FETCH_USER_POSTS", payload: response.val() });
  }
};

export const createPost =
  (file, description, userId, user) => async dispatch => {
    const refrence = refStorage(getStorage(), `posts/${file.name}`);
    try {
      await uploadBytes(refrence, file);
      const imageURL = await getDownloadURL(refrence);
      const response = await writeNewPost(
        user.username,
        userId,
        imageURL,
        description,
        user.profilePicture
      );
      dispatch({ type: "CREATE_POST", payload: response });
    } catch (error) {
      throw error.message;
    }
  };

export const deletePost = (userId, postId) => async dispatch => {
  const updates = {};
  updates[`/posts/${postId}`] = null;
  updates[`/user-posts/${userId}/${postId}`] = null;
  try {
    await updateData(updates);
  } catch (error) {
    throw error;
  }
  dispatch({ type: "DELETE_POST", payload: postId });
};

export const fetchUser = userId => async dispatch => {
  const response = await getData(`users/${userId}`);
  if (response.exists()) {
    dispatch({ type: "FETCH_USER", payload: response.val() });
  }
};

export const updateUserData = (userId, name, bio, file) => async dispatch => {
  const updates = {};
  updates[`/users/${userId}/name`] = name;
  updates[`/users/${userId}/bio`] = bio;
  try {
    await updateData(updates);
  } catch (error) {
    throw error;
  }
  dispatch({ type: "UPDATE_USER", payload: { name, bio, userId } });
};

export const followUser =
  (followerUserId, followingUserId, followingUserFollowers) =>
  async dispatch => {
    const updates = {};
    updates[`/users/${followerUserId}/followings/${followingUserId}`] = true;
    updates[`/users/${followingUserId}/followers`] = followingUserFollowers + 1;
    try {
      await updateData(updates);
    } catch (error) {
      throw error;
    }
    dispatch({
      type: "FOLLOW_USER",
      payload: { followerUserId, followingUserId },
    });
  };

export const unfollowUser =
  (followerUserId, followingUserId, followingUserFollowers) =>
  async dispatch => {
    const updates = {};
    updates[`/users/${followerUserId}/followings/${followingUserId}`] = null;
    updates[`/users/${followingUserId}/followers`] = followingUserFollowers - 1;
    try {
      await updateData(updates);
    } catch (error) {
      throw error;
    }
    dispatch({
      type: "UNFOLLOW_USER",
      payload: { followerUserId, followingUserId },
    });
  };
