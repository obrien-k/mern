import React, { createContext, useState, useEffect } from "react";
import api from "./utils/api";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/auth/status");
        if (response.data.isAuthenticated) {
          const profileResponse = await api.get(
            `/api/profile/users/${response.data.user.id}`
          );
          setMyProfile(profileResponse.data);
        }
        setIsUserLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsUserLoggedIn(false);
        setMyProfile(null);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider
      value={{ isUserLoggedIn, myProfile, setIsUserLoggedIn, setMyProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
