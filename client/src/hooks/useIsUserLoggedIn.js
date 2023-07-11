import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../actions/user";

const useIsUserLoggedIn = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentDate = new Date();
      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        setIsUserLoggedIn(true);
        if (!userState.user) {
          // if there's a valid token and user is not loaded yet, load the user
          dispatch(getUserById(decodedToken.user._id));
        }
      } else {
        setIsUserLoggedIn(false);
      }
    } else {
      setIsUserLoggedIn(false);
    }
  }, [dispatch, userState.user]);

  return { isUserLoggedIn, user: userState.user, error: userState.error };
};

export default useIsUserLoggedIn;
