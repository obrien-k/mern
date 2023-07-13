import React, { useEffect, useContext, useState } from "react";
import { Provider } from "react-redux";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import api from "./utils/api";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

import PrivateLayout from "./components/pages/private/layout/PrivateLayout";
import PrivateContent from "./components/pages/private/layout/PrivateContent";
import PrivateHomepage from "./components/pages/private/PrivateHomepage";

import PublicLayout from "./components/pages/public/layout/PublicLayout";
import PublicLanding from "./components/pages/public/PublicLanding";
import RecoveryPage from "./components/auth/Recovery";
import ReferralForm from "./components/auth/ReferralForm";
import store from "./store";

import { UserContextProvider } from "./UserContext";
import jwt_decode from "jwt-decode";
import { UserContext } from "./UserContext";

const PrivateRouteWrapper = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Token is present. Now we need to validate it
      const decodedToken = jwt_decode(token);
      const currentDate = new Date();
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        navigate("/login");
      }
    } else {
      setIsUserLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={[isUserLoggedIn, setIsUserLoggedIn]}>
      {isUserLoggedIn ? children : null}
    </UserContext.Provider>
  );
};

const AuthenticatedRoute = (props) => (
  <UserContextProvider>
    <PrivateRouteWrapper {...props} />
  </UserContextProvider>
);

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <section className="container">
          <Alert />
          <Routes>
            {/* Public Routes */}
            <Route
              path="/recovery"
              element={
                <PublicLayout pageTitle="Stellar">
                  <RecoveryPage />
                </PublicLayout>
              }
            />
            <Route
              path="/referral"
              element={
                <PublicLayout pageTitle="Stellar">
                  <ReferralForm />
                </PublicLayout>
              }
            />
            <Route
              path="/register"
              element={
                <PublicLayout pageTitle="Stellar">
                  <Register />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout pageTitle="Stellar">
                  <Login />
                </PublicLayout>
              }
            />

            {/* Private Routes */}
            <Route
              path="/private/*"
              element={
                <AuthenticatedRoute>
                  <PrivateLayout pageTitle="Stellar">
                    <PrivateContent />
                  </PrivateLayout>
                </AuthenticatedRoute>
              }
            />

            {/* Catch all route */}
            <Route
              path="/*"
              element={
                <PublicLayout pageTitle="Stellar">
                  <PublicLanding />
                </PublicLayout>
              }
            />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
