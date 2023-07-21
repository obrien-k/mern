//UserContext.js
import React, { createContext } from "react";
import useIsUserLoggedIn from "./hooks/useIsUserLoggedIn";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { isUserLoggedIn, userProfile, userRank } = useIsUserLoggedIn();

  return (
    <UserContext.Provider
      value={{ isUserLoggedIn, myProfile: userProfile, myRank: userRank }}
    >
      {children}
    </UserContext.Provider>
  );
};
