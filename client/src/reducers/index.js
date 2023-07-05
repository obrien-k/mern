import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import forum from './forum';
import communities from './communities';
import permissions from './permissions';
export default combineReducers({
  alert,
  auth,
  forum,
  communities,
  permissions
});
