import React from 'react';
import { Link } from 'react-router-dom';

const PublicLanding = () => {
  const SHOW_PUBLIC_INDEX = true; // Replace with your logic
  const OPEN_REGISTRATION = true; // Replace with your logic
  const OPEN_EXTERNAL_REFERRALS = true; // Replace with your logic
  const RECOVERY = true; // Replace with your logic

  if (!SHOW_PUBLIC_INDEX) {
    window.location.href = 'login.php';
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
    </>
  );
};

export default PublicLanding;
