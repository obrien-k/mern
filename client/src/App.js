import React, { useEffect, useState } from "react";
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

import PublicLayout from "./components/pages/public/layout/PublicLayout";
import PublicLanding from "./components/pages/public/PublicLanding";
import RecoveryPage from "./components/auth/Recovery";
import ReferralForm from "./components/auth/ReferralForm";
import store from "./store";

const App = () => {
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
                <PrivateLayout pageTitle="Stellar">
                  <PrivateContent />
                </PrivateLayout>
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
