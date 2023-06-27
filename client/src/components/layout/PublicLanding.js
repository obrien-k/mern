import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import RecoveryPage from '../auth/Recovery';

const PublicLanding = () => {
  const SHOW_PUBLIC_INDEX = true; // Replace with your logic
  const OPEN_REGISTRATION = true; // Replace with your logic
  const OPEN_EXTERNAL_REFERRALS = true; // Replace with your logic
  const RECOVERY = true; // Replace with your logic

  const [showContent, setShowContent] = useState(SHOW_PUBLIC_INDEX);

  // Get the current location
  const location = useLocation();

  if (!showContent) {
    window.location.href = '/login'; // Redirect to the login page
    return null;
  }

  return (
    <>
      <div id="logo">
        <img
          src="static/styles/public/images/loginlogo.png"
          alt="stellar"
          title="stellar"
        />
      </div>

      <div className="main">
        <div className="poetry">
          The latest hotness, but we didn't start the fire.
        </div>
      </div>

      <div className="actions">
        <span className="action-bar">
          <Link to="/login">Enter</Link>
          {OPEN_REGISTRATION && (
            <Link
              to="/register"
              title="Obtain an account by supplying a valid email address"
            >
              Register
            </Link>
          )}
          {OPEN_EXTERNAL_REFERRALS && (
            <Link
              to="/referral"
              title="Obtain an account by proving your membership on a site we trust"
            >
              Referral
            </Link>
          )}
          {RECOVERY && (
            <Link
              to="/recovery"
              title="Obtain a new account by proving your membership on the previous site"
            >
              Recovery
            </Link>
          )}
        </span>
      </div>

      {/* Render the login, register, and recovery components */}
      <Routes location={location}>
        <Route path="/login" component={<Login />} />
        <Route path="/register" component={<Register />} />
        <Route path="/recovery" component={<RecoveryPage />} />
      </Routes>
    </>
  );
};

export default PublicLanding;
