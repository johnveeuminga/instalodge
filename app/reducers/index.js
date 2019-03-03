import { combineReducers } from 'redux';

import auth from './auth';
import homeOwners from './homeOwners';

export default combineReducers({
  auth,
  homeOwners,
})
