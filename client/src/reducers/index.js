import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import permissions from "./permissions";
import communities from "./communities";
import artist from "./artist";
import forum from "./forum";

export default combineReducers({
  alert,
  auth,
  user,
  permissions,
  communities,
  artist,
  forum,
});
