import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import axios from "axios";

const openRegistration = process.env.REACT_APP_OPEN_REGISTRATION === "true";
const closeInvite = process.env.REACT_APP_CLOSE_INVITE === "true";

const RegistrationForm = ({ setAlert, register }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [inviteExists, setInviteExists] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlInviteKey = params.get("invite");
    const inviteKeyToCheck = urlInviteKey || invite;

    const checkInvite = async () => {
      if (inviteKeyToCheck) {
        try {
          const response = await axios.get(
            `/api/profile/referral/verify-invite-key?inviteKey=${inviteKeyToCheck}`
          );
          if (response.data.success === true) {
            setInviteExists(true); // Setting inviteExists to true
          } else {
            setInviteExists(false); // Setting inviteExists to false when success is not true
          }
        } catch (error) {
          console.error(error.response.data);
          setInviteExists(false); // Optionally handle error cases by setting inviteExists to false
        }
      }
    };

    if (urlInviteKey) {
      setInvite(urlInviteKey);
    }
    checkInvite();
  }, [invite]);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ username, email, password, invite });
    }
  };

  const renderForm = () => {
    if (openRegistration || (invite && inviteExists)) {
      return (
        <>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          {invite && !inviteExists && <p>Invite does not exist.</p>}
          <br />
          <button type="submit">Register</button>
        </>
      );
    }
    if (openRegistration === false && invite && !inviteExists) {
      return <p>Invite does not exist.</p>;
    }
    if (openRegistration === false && closeInvite === true) {
      return <p>Registration is closed.</p>;
    } else {
      return <p>Tell admin they forgot an edge case.</p>;
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h1>Registration Form</h1>
      {renderForm()}
      <label>
        Invite Key:
        <input
          type="text"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
        />
      </label>
    </form>
  );
};

export default connect(null, { setAlert, register })(RegistrationForm);
