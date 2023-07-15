import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useIsUserLoggedIn = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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
  }, [isAuthenticated]); // Trigger a re-render when isAuthenticated state changes

  return { isUserLoggedIn, user };
};

export default useIsUserLoggedIn;
