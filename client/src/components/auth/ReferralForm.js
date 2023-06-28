import React, { useState } from 'react';
import axios from 'axios';
import { SITE_NAME } from '../../config/config';

const ReferralFormStep1 = ({ handleNextStep }) => {
  const [service, setService] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('/api/services/referral/generate-token');
      const generatedToken = response.data.token;
      
      setToken(generatedToken);
      handleNextStep(service, generatedToken);
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };
  
  return (
    <>
      <h1>External Referrals</h1>
      <br />
      <p>
        Gain access to {SITE_NAME} by verifying that you are a member of another service
        that we trust.
      </p>
      <br />
      <h4>The process is as follows:</h4>
      <br />
      <ol>
        <li>Select a service from the list that you're a member of.</li>
        <li>
          {SITE_NAME} will generate a string of characters that you will place in the body of your profile at the service
          of your choice.
        </li>
        <li>Paste the character string anywhere in the body of your profile.</li>
        <li>Enter your username and {SITE_NAME} will verify your membership and issue an invite to you.</li>
        <li>Join {SITE_NAME}!</li>
      </ol>
      <br />
      <h2>Step 1: Paste Your Code</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </>
  );
};

const ReferralFormStep2 = ({ service, token }) => {
  const [username, setUsername] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('/api/services/referral/verify-token', {
        params: {
          service,
          userId: username,
        },
      });
  
      if (response.data.isVerified) {
        setIsVerified(true);
        // Handle successful verification (issue invite, send email, etc.)
      } else {
        setError('There was an error verifying your account. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('There was an error verifying your account. Please try again.');
    }
  };
  

  return (
    <>
      <br />
      {error && <h3>{error}</h3>}
      <h2>Step 2: Join {SITE_NAME}</h2>
      <br />
      <p>
        Copy and paste the code below into the profile of your {service} account. It can go anywhere in your profile
        body (commonly known as "Profile info 1") as long as it is in one piece.
      </p>
      <br />
      <p>{token}</p>
      <br />
      <br />
      <p>Enter the username you use at {service} exactly as it appears on the site. This is critical in verifying your account.</p>
      <br />
      <form onSubmit={handleVerify}>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <br />
        <br />
        <input type="submit" name="submit" value="Verify" className="submit" />
      </form>
    </>
  );
};

const ReferralForm = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [token, setToken] = useState('');
  const SITE_NAME = 'Stellargraph';

  const handleNextStep = (selectedService, generatedToken) => {
    setService(selectedService);
    setToken(generatedToken);
    setStep(2);
  };

  return (
    <>
      {step === 1 && <ReferralFormStep1 handleNextStep={handleNextStep} />}
      {step === 2 && <ReferralFormStep2 service={service} token={token} />}
    </>
  );
};

export default ReferralForm;