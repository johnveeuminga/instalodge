import { combineReducers } from 'redux';

import auth from './auth';
import homeOwners from './homeOwners';
import properties from './properties';

export default combineReducers({
  auth,
  homeOwners,
  properties,
});
