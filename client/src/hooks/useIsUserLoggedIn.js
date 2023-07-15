import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const useIsUserLoggedIn = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/auth/status");
        if (response.data.isAuthenticated) {
          const profileResponse = await api.get(
            `/api/profile/users/${response.data.user.id}`
          );
          setUserProfile(profileResponse.data);
        }
      } catch (error) {
        setUserProfile(null);
      }
    };

    if (!userProfile) {
      checkAuthStatus();
    }
  }, [userProfile]);

  return { isUserLoggedIn: Boolean(userProfile), userProfile, user };
};

export default useIsUserLoggedIn;
