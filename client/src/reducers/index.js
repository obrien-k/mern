import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import forum from './forum';
export default combineReducers({
  alert,
  auth,
  forum
});
