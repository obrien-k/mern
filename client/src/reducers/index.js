import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import forum from './forum';
import communities from './communities';
export default combineReducers({
  alert,
  auth,
  forum,
  communities
});
