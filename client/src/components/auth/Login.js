import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [isBanned, setIsBanned] = useState(false);
  const [bannedUntil, setBannedUntil] = useState(null);

  useEffect(() => {
    document.cookie = "cookie_test=1";
    if (document.cookie.indexOf("cookie_test") === -1) {
      alert("You appear to have cookies disabled.");
    }
    document.cookie = "cookie_test=1; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }, []);

  useEffect(() => {
    // This is the new useEffect block to handle ban logic
    if (isBanned) {
      const currentTime = new Date().getTime();
      const remainingTime = bannedUntil - currentTime;
      if (remainingTime > 0) {
        setTimeout(() => {
          setIsBanned(false);
          setAttempts(0);
        }, remainingTime);
      } else {
        setIsBanned(false);
        setAttempts(0);
      }
    }
  }, [isBanned, bannedUntil]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isBanned) {
      setError(
        `You are banned from logging in until ${new Date(
          bannedUntil
        ).toLocaleString()}.`
      );
      return;
    }

    const wasSuccessful = await login(email, password); // Make sure login returns true/false based on success

    if (!wasSuccessful) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsBanned(true);
        setBannedUntil(new Date().getTime() + 6 * 60 * 60 * 1000);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/private");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth">
      {!isBanned ? (
        <form className="form" onSubmit={onSubmit}>
          {error && (
            <span className="warning">
              {error}
              <br />
              <br />
            </span>
          )}
          {attempts > 0 && (
            <div>
              <span>
                You have <span className="info">{6 - attempts}</span> attempts
                remaining.
              </span>
              <br />
              <br />
              <strong>WARNING:</strong> You will be banned for 6 hours after
              your login attempts run out!
              <br />
              <br />
            </div>
          )}
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <div>
            <label title="Keep me logged in" htmlFor="keeplogged">
              Persistent
            </label>
            <input
              title="Keep me logged in"
              type="checkbox"
              id="keeplogged"
              name="keeplogged"
              checked={keepLogged}
              onChange={(e) => setKeepLogged(e.target.checked)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      ) : (
        <span className="warning">
          You are banned from logging in for another {bannedUntil}.
        </span>
      )}
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
