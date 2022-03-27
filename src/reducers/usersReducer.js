const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, [action.payload.userId]: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        [action.payload.userId]: {
          ...state[action.payload.userId],
          ...action.payload,
        },
      };
    case "FOLLOW_USER":
      const {
        [action.payload.followerUserId]: followerUser,
        [action.payload.followingUserId]: followingUser,
      } = state;
      if (
        followerUser.followings &&
        !Object.keys(followerUser.followings).length
      ) {
        followerUser.followings[action.payload.followingUserId] = true;
      } else {
        followerUser.followings = { [action.payload.followingUserId]: true };
      }
      followingUser.followers++;
      return { ...state, [action.payload.followerUserId]: followerUser };
    case "UNFOLLOW_USER":
      const {
        [action.payload.followerUserId]: unfollowerUser,
        [action.payload.followingUserId]: unfollowingUser,
      } = state;
      unfollowingUser.followers--;
      delete unfollowerUser.followings[action.payload.followingUserId];
      return { ...state, [action.payload.followerUserId]: unfollowerUser };
    default:
      return state;
  }
};

export default usersReducer;
