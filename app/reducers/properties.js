import { SET_PROPERTIES } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      const { properties } = action.payload;
      return {
        ...state,
        data: properties,
      };
    default:
      return state;
  }
};