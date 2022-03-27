const userIdReducer = (state = "", action) => {
  switch (action.type) {
    case "LOG_OUT":
      return ""
    case "LOG_IN":
      return action.payload
    case "SIGN_UP":
      return action.payload
    default:
      return state;
  }
}

export default userIdReducer