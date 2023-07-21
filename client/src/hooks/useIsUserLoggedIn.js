import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

const useIsUserLoggedIn = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (user) {
          const profileResponse = await api.get(`profile/users/${user.id}`);
          setUserProfile(profileResponse.data);
          if (user.userRank) {
            const rankResponse = await api.get(
              `tools/permissions/${user.userRank}`
            );
            setUserRank(rankResponse.data);
          }
        }
      } catch (error) {
        setUserProfile(null);
      }
    };

    if (!userProfile) {
      checkAuthStatus();
    }
  }, [user, userProfile]);

  return { isUserLoggedIn: Boolean(userProfile), user, userProfile, userRank };
};

export default useIsUserLoggedIn;
