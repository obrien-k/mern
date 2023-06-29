import React, { useState } from 'react';
import axios from 'axios';

const InviteForm = ({ userID }) => {
  console.log('userID', userID);
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // todo dynamic
    const service = 'WHATCD';
  
    setErrorMessage(''); 
    setSuccessMessage(''); 
  
    try {
      await axios.post('/api/services/referral/create-invite', { service, email, userID, reason });
      
      setSuccessMessage('Invitation sent successfully.');
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'An error occurred while creating the invite.');
    }
  };
  
  

  return (
    <div>
      <h2>
        <a href="/user/1">admin</a> &gt; Invites
      </h2>
      <div className="linkbox">
        <a href="/user/invite-tree" className="brackets">
          Invite tree
        </a>
      </div>
      <div className="box pad">
        <p>
          Please note that selling, trading, or publicly giving away our invitations— or responding to public invite requests— is strictly forbidden, and may result in you and your entire invite tree being banned.
        </p>
        <p>
          Do not send an invite to anyone who has previously had an Orpheus Dev account. Please direct them to # on if they wish to reactivate their account.
        </p>
        <p>
          Remember that you are responsible for ALL invitees, and your account and/or privileges may be disabled due to your invitees' actions. You should know and trust the person you're inviting. If you aren't familiar enough with the user to trust them, do not invite them.
        </p>
        <p>
          <em>Do not send an invite if you have not read or do not understand the information above.</em>
        </p>
      </div>
      <div className="box box2">
        <form className="send_form pad" onSubmit={handleSubmit}>
          <div className="field_div">
            <div className="label">Email address:</div>
            <div className="input">
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} size="60" required />
              <input type="submit" value="Invite" />
            </div>
          </div>
          <div className="field_div">
            <div className="label">Staff Note:</div>
            <div className="input">
              <input type="text" name="reason" value={reason} onChange={(e) => setReason(e.target.value)} size="60" maxLength="255" />
            </div>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </div>
      <h3>Invitee list</h3>
      <div className="box pad">
        <table className="invite_table m_table" width="100%">
          <tbody>
            <tr className="colhead">
              <td className="m_th_left">
                <a href="/user/invite?order=username&amp;sort=desc">Username</a>
              </td>
              <td>
                <a href="/user/invite?order=email&amp;sort=desc">Email</a>
              </td>
              <td>
                <a href="/user/invite?order=joined&amp;sort=asc">Joined</a>
              </td>
              <td>
                <a href="/user/invite?order=lastseen&amp;sort=desc">Last Seen</a>
              </td>
              <td className="m_th_right">
                <a href="/user/invite?order=uploaded&amp;sort=desc">Uploaded</a>
              </td>
              <td className="m_th_right">
                <a href="/user/invite?order=downloaded&amp;sort=desc">Downloaded</a>
              </td>
              <td className="m_th_right">
                <a href="/user/invite?order=ratio&amp;sort=desc">Ratio</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InviteForm;
