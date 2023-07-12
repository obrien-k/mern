import React, { useState } from "react";
import { Link } from "react-router-dom";

const PublicLanding = () => {
  const SHOW_PUBLIC_INDEX = true; // Replace with your logic
  const OPEN_REGISTRATION = true; // Replace with your logic
  const OPEN_EXTERNAL_REFERRALS = true; // Replace with your logic
  const RECOVERY = true; // Replace with your logic

  const [showContent, setShowContent] = useState(SHOW_PUBLIC_INDEX);

  return (
    <>
      <div className="main">
        <div className="poetry">
          The latest hotness, but we didn't start the fire.
          <br />
          <br />
          <span className="important" style={{ color: "#FF0000" }}>
            <strong>
              Stellar is pre-alpha, if you're here by accident, expect data
              loss!
            </strong>
          </span>
          <br />
          <br />
        </div>
      </div>

      <div className="actions">
        <span className="action-bar">
          <Link to="/login">Enter</Link>
          {OPEN_REGISTRATION && (
            <Link
              to="/register"
              title="Obtain an account by supplying an invite code"
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
