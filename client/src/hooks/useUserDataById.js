import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../actions/user";

const useUserDataById = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  const userState = useSelector((state) => state.user);

  return userState;
};

export default useUserDataById;
