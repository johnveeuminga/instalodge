import { 
  SET_PROPERTIES, 
  SET_PROPERTY,
  SET_USER_PROPERTY,
  SET_USER_PROPERTY_PHOTOS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      const { properties } = action.payload;
      return {
        ...state,
        data: properties,
      };
    case SET_PROPERTY:
      const { property } = action.payload;
      return {
        ...state,
        selected: property,
      }
    case SET_USER_PROPERTY:
      const { userProperty } = action.payload;
      return {
        ...state,
        userProperty,
      }
    case SET_USER_PROPERTY_PHOTOS:
      const { userPropertyPhotos } = action.payload;
      const userPropertyRec = state.userProperty;

      if (userPropertyRec) {
        return {
          ...state,
          userProperty: {
            ...userPropertyRec,
            photos: userPropertyPhotos,
          }
        }
      }

      return state;
    default:
      return state;
  }
};