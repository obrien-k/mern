import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <UserContext.Provider value={[isUserLoggedIn, setIsUserLoggedIn]}>
      {children}
    </UserContext.Provider>
  );
};
