import { LOGIN, UPDATE_USER } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case UPDATE_USER: 
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};
