import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const useIsUserLoggedIn = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/auth/status");
        if (response.data.isAuthenticated) {
          const profileResponse = await api.get(
            `/profile/users/${response.data.user.id}`
          );
          setUserProfile(profileResponse.data);
          if (userProfile?.userRank) {
            const rankResponse = await api.get(
              `/tools/permissions/${userProfile.userRank}`
            );
            setUserRank(rankResponse.data);
          }
        }
      } catch (error) {
        setUserProfile(null);
      }
    };
    checkAuthStatus();
  }, []);

  return { isUserLoggedIn: Boolean(userProfile), userProfile, userRank, user };
};

export default useIsUserLoggedIn;
