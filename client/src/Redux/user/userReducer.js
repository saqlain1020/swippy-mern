import { SET_USER, UPDATE_USER } from "./userConstants";
let initialState = {
  socialLinks:[],
  tags: []
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...payload.user };
    case UPDATE_USER:
      return { ...state, ...payload.user };
    default:
      return state;
  }
};

export default userReducer;
