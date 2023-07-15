import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../actions/user";

const useUserById = (userId) => {
  const dispatch = useDispatch();
  console.log(userId);

  const user = useSelector((state) => (state.user.users || {})[userId]);
  const loadingUsers = useSelector((state) => state.loadingUsers);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (userId && !user) {
      console.log(`Fetching user with id: ${userId}`);
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId, user]);

  return { user, isLoading: loadingUsers, errorMessage: error };
};

export default useUserById;
