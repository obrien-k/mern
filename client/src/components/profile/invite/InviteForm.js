import React, { useState } from 'react';
import axios from 'axios';

const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the URL to match your Express route
      const response = await axios.post('http://localhost:3000/api/services/referral/create-invite', {
        service,
        email,
        username,
      });

      console.log('Response:', response.data);
      // Handle success case
    } catch (error) {
      console.error('Error:', error);
      // Handle error case
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Create Invite</button>
    </form>
  );
};

export default InviteForm;
