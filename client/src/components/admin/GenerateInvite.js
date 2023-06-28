// TODO
import React, { useState } from 'react';
import axios from 'axios';

const GenerateInvite = () => {
    const [interviewerId, setInterviewerId] = useState('');
    const [email, setEmail] = useState('');
    const [inviteUrl, setInviteUrl] = useState(null);

    const handleGenerateInvite = async () => {
        try {
            const response = await axios.get('/api/generateInvite', {
                params: { interviewer_id: interviewerId, email }
            });
            setInviteUrl(response.data.invite_url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Interviewer ID"
                value={interviewerId}
                onChange={(e) => setInterviewerId(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleGenerateInvite}>Generate Invite</button>
            
            {inviteUrl && <div>Invite URL: {inviteUrl}</div>}
        </div>
    );
};

export default GenerateInvite;
