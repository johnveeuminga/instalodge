import { ADD_HOMEOWNER, SEARCH_HOMEOWNERS, SET_HOMEOWNERS } from "../constants/actionTypes";

const defaultState = {
  homeowners: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_HOMEOWNER: 
      const { homeowner } = action.payload;
      return {
        homeowners: [
          ...state.homeowners,
          homeowner,
        ],
      }
    case SEARCH_HOMEOWNERS:
      const { val } = action.payload;        
      return {
        homeowners: [ ...state.homeowners],
        searchString: val,
      }
    case SET_HOMEOWNERS:
      const { homeowners } = action.payload;
      return {
        ...state,
        homeowners,
      }
    default: 
      return state;
  }
};