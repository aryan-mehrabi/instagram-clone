const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return { ...state, [action.payload.postId]: action.payload };
    case "FETCH_POSTS":
      return {
        ...state,
        ...Object.values(action.payload).reduce((acc, current) => {
          return { ...acc, [current.postId]: current };
        }, {}),
      };
    case "FETCH_USER_POSTS":
      return {
        ...state,
        ...action.payload,
      };
    case "DELETE_POST":
      const { [action.payload]: deletedPost, ...newPosts } = state;
      console.log(newPosts)
      return newPosts;
    default:
      return state;
  }
};

export default postsReducer;
