import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import axios from 'axios';

const RegistrationForm = ({ setAlert, register }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invite, setInvite] = useState('');
  const [inviteExists, setInviteExists] = useState(false);

  useEffect(() => {
    const checkInvite = async () => {
      if (invite) {
        try {
          const response = await axios.get(`/api/services/referral/verify-token?invite=${invite}`);
          setInviteExists(response.data.exists);
        } catch (error) {
          console.error(error.response.data);
        }
      }
    };

    checkInvite();
  }, [invite]);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      register({ username, email, password, invite });
    }
  };

  const renderForm = () => {
    if (!invite || (invite && inviteExists)) {
      return (
        <>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          {invite && !inviteExists && <p>Invite does not exist.</p>}
          <br />
          <button type="submit">Register</button>
        </>
      );
    } else {
      return (
        <p>Invite does not exist.</p>
      );
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h1>Registration Form</h1>
      {renderForm()}
      <label>
        Invite Key:
        <input type="text" value={invite} onChange={(e) => setInvite(e.target.value)} />
      </label>
    </form>
  );
};

export default connect(null, { setAlert, register })(RegistrationForm);
