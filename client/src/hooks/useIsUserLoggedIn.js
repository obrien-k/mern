import { useEffect, useState } from "react";
import api from "../utils/api";

const useIsUserLoggedIn = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userRank, setUserRank] = useState(null);

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

  return { isUserLoggedIn: Boolean(userProfile), userProfile, userRank };
};

export default useIsUserLoggedIn;
