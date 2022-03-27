import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import userIdReducer from "./userIdReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  userId: userIdReducer,
  users: usersReducer,
  posts: postsReducer,
});
