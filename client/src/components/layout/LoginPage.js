import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogged, setKeepLogged] = useState(false);
    const [error, setError] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [isBanned, setIsBanned] = useState(false);
    const [bannedUntil, setBannedUntil] = useState(null);

    useEffect(() => {
        // Check if cookies are enabled
        document.cookie = "cookie_test=1";
        if (document.cookie.indexOf('cookie_test') === -1) {
            alert("You appear to have cookies disabled.");
        }
        document.cookie = "cookie_test=1; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        
        // Autofocus on the username input
        document.getElementById("username").focus();
        
        // Fetch ban status from your API, assuming it provides this info
        // This logic should be handled by the backend.
        // fetchBanStatus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isBanned) {
            setError(`You are banned from logging in for another ${bannedUntil}.`);
            return;
        }
        
        try {
            const response = await axios.post('/api/login', {
                username,
                password,
                keepLogged
            });
            // handle successful login
        } catch (error) {
            // handle login error
            setError(error.response.data.message);
            setAttempts(error.response.data.attempts);
        }
    };

    return (
        <div className="main">
            <div id="logo">
                <a href="/">
                    <img src="../../static/logo.png" alt="stellar" title="stellar" />
                </a>
            </div>
            <div className="auth">
                {!isBanned ? (
                    <form className="auth_form" onSubmit={handleSubmit}>
                        {error && <span className="warning">{error}<br /><br /></span>}
                        {attempts > 0 && (
                            <div>
                                <span>You have <span className="info">{6 - attempts}</span> attempts remaining.</span>
                                <br /><br />
                                <strong>WARNING:</strong> You will be banned for 6 hours after your login attempts run out!
                                <br /><br />
                            </div>
                        )}
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="inputtext"
                                required
                                maxLength="20"
                                pattern="[A-Za-z0-9_?\.]{1,20}"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="inputtext"
                                required
                                pattern=".{6,}"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label title="Keep me logged in" htmlFor="keeplogged">Persistent</label>
                            <input
                                title="Keep me logged in"
                                type="checkbox"
                                id="keeplogged"
                                name="keeplogged"
                                checked={keepLogged}
                                onChange={(e) => setKeepLogged(e.target.checked)}
                            />
                        </div>
                        <div>
                            <input
                                type="submit"
                                name="login"
                                value="Log in"
                                className="submit"
                            />
                        </div>
                        <a href="/recover-password" className="tooltip" title="Recover your password">Password recovery</a>
                    </form>
                ) : (
                    <span className="warning">You are banned from logging in for another {bannedUntil}.</span>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
