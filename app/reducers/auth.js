import { LOGIN, UPDATE_USER, LOGOUT } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case UPDATE_USER: 
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
};
