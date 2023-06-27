import React, { useState } from "react";
import axios from "axios"; // Assuming you are using axios for HTTP requests

const LoginWith2FA = ({ onRecoverySuccess }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleRecoveryStep1 = async () => {
    try {
      const response = await axios.post("/api/recover", { email });
      if (response.data.success) {
        setKey(response.data.key);
        setError("Email sent with further instructions.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRecoveryStep2 = async () => {
    try {
      const response = await axios.post("/api/recover/step2", { key, password, verifyPassword });
      if (response.data.success) {
        onRecoverySuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (twoFARequired) {
        const response = await axios.post("/api/", {
          act: '2fa',
          '2fa': twoFACode,
        });
        // Handle success, redirect or whatever you want
      } else {
        const response = await axios.post("/api/", {
          username,
          password,
        });

        if (response.data.requires2FA) {
          setTwoFARequired(true);
        } else {
          // Handle success, redirect or whatever you want
        }
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      {key ? (
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="Verify Password"
          />
          <button onClick={handleRecoveryStep2}>Submit</button>
        </div>
      ) : twoFARequired ? (
        <div>
          <input
            type="text"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            placeholder="2FA Code"
          />
          <button onClick={handleSubmit}>Submit 2FA Code</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <button onClick={handleRecoveryStep1}>Recover Password</button>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )};

const TwoFactorRecovery = ({ onTwoFactorRecoverySuccess }) => {
  const [recoveryKey, setRecoveryKey] = useState("");
  const [error, setError] = useState("");

  const handleTwoFactorRecovery = async () => {
    try {
      const response = await axios.post("/api/2fa/recover", { recoveryKey });
      if (response.data.success) {
        onTwoFactorRecoverySuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={recoveryKey}
        onChange={(e) => setRecoveryKey(e.target.value)}
        placeholder="2FA Recovery Key"
      />
      <button onClick={handleTwoFactorRecovery}>Recover</button>
      {error && <div>{error}</div>}
    </div>
  );
};

const AuthPage = () => {
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [twoFactorRecoverySuccess, setTwoFactorRecoverySuccess] = useState(false);

  return (
    <div>
      {!recoverySuccess && (
        <LoginWith2FA onRecoverySuccess={() => setRecoverySuccess(true)} />
      )}
      {!twoFactorRecoverySuccess && (
        <TwoFactorRecovery
          onTwoFactorRecoverySuccess={() => setTwoFactorRecoverySuccess(true)}
        />
      )}
      {recoverySuccess && <div>Password recovery successful!</div>}
      {twoFactorRecoverySuccess && <div>Two-factor recovery successful!</div>}
    </div>
  );
};

export default AuthPage;
