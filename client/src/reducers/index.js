import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import profile from "./profile";
import permissions from "./permissions";
import communities from "./communities";
import artist from "./artist";
import forum from "./forum";

export default combineReducers({
  alert,
  auth,
  user,
  profile,
  permissions,
  communities,
  artist,
  forum,
});
