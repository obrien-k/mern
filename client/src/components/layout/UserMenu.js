import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import ReferralForm from '../auth/ReferralForm'; // update to Inviteform
import PrivateHomepage from '../pages/PrivateHomepage';

const UserMenu = ({ user, pageId }) => {
  const { username, bonusPoints, bytesUploaded, bytesDownloaded, requiredRatio, flTokens, hasUnlimitedInvites } = user;

  // Placeholder for formatSize function
  const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

   // Alerts and ModBar (simulating server-side array logic)
   const [alerts, setAlerts] = useState([]);
   const [modBar, setModBar] = useState([]);
   const [useAdvancedSearch, setUseAdvancedSearch] = useState(false);
 
   // Simulate fetching data from the server and setting alerts and modBar.
   useEffect(() => {
     // Example, populate the arrays with data fetched from an API.
     setAlerts(['New staff blog post!']);
     setModBar(['Toolbox']);
     const loggedUserSearchType = true; // fetch from server
     setUseAdvancedSearch(loggedUserSearchType);
   }, []);
   
   const addClass = (pageId, pages, className) => pages.includes(pageId) ? className : '';
 
   return (
     <div id="wrapper">
      <h1 className="hidden">SITE_NAME</h1>
      <div id="header">
        <div id="logo">
          <a href="/">Home</a>
        </div>
        <div id="userinfo">
          <ul id="userinfo_username">
            <li id="nav_userinfo">
              <a href={`/user/${username}`} className="username">{username}</a>
            </li>
            <li id="nav_useredit">
              <a href={`/user/edit/${username}`}>Edit</a>
            </li>
            <li id="nav_logout">
              <a href="/logout">Logout</a>
            </li>
          </ul>
          <ul id="userinfo_major">
            <li id="nav_upload">
              <a href="/upload" title="Upload">Upload</a>
            </li>
            <li id="nav_bonus">
              <a href="/bonus" title={`Bonus (${bonusPoints})`}>Bonus ({bonusPoints})</a>
            </li>
            <li id="nav_invite">
              <Link to="/invite">Invite</Link>
            </li>
            <li id="nav_donate">
              <a href="/donate">Donate</a>
            </li>
            <li id="nav_forums" className={addClass(pageId, ['forums'], 'active')}>
              <a href="forums.js">Forums</a>
            </li>
            <li id="nav_irc" className={addClass(pageId, ['chat'], 'active')}>
              <a href="wiki.js?action=article&name=irc">IRC</a>
            </li>
          </ul>
          <ul id="userinfo_stats">
            <li id="stats_seeding">
              <a href={`/communities/seeding/${username}`}>Up:</a>
              <span className="stat" title={formatSize(bytesUploaded)}>{formatSize(bytesUploaded)}</span>
            </li>
            <li id="stats_leeching">
              <a href={`/communities/leeching/${username}`}>Down:</a>
              <span className="stat" title={formatSize(bytesDownloaded)}>{formatSize(bytesDownloaded)}</span>
            </li>
            <li id="stats_ratio">
              Ratio: <span className="stat">{(bytesUploaded / bytesDownloaded).toFixed(2)}</span>
            </li>
            {requiredRatio && (
              <li id="stats_required">
                <a href="/rules#ratio">Required:</a>
                <span className="stat">{requiredRatio.toFixed(2)}</span>
              </li>
            )}
            {flTokens > 0 && (
              <li id="fl_tokens">
                <a href="/wiki/tokens">Tokens:</a>
                <span className="stat">{flTokens}</span>
              </li>
            )}
          </ul>
        </div>
        <div id="menu">
          <h4 className="hidden">Site Menu</h4>
          <ul>
            <li id="nav_index" className={addClass(pageId, ['index'], 'active')}>
              <Link to="/index.js">Home</Link>
            </li>
            <li id="nav_communities" className={addClass(pageId, ['communities'], 'active')}>
              <Link to="/communities.js">Communities</Link>
            </li>
            <li id="nav_collages" className={addClass(pageId, ['collages'], 'active')}>
              <Link to="/collages.js">Collages</Link>
            </li>
            <li id="nav_requests" className={addClass(pageId, ['requests'], 'active')}>
              <Link to="/requests.js">Requests</Link>
            </li>
            <li id="nav_forums" className={addClass(pageId, ['forums'], 'active')}>
              <Link to="/forums.js">Forums</Link>
            </li>
            <li id="nav_irc" className={addClass(pageId, ['chat'], 'active')}>
              <Link to="/wiki.js?action=article&name=irc">IRC</Link>
            </li>
            <li id="nav_top10" className={addClass(pageId, ['top10'], 'active')}>
              <Link to="/top10.js">Top 10</Link>
            </li>
            <li id="nav_rules" className={addClass(pageId, ['rules'], 'active')}>
              <Link to="/rules.js">Rules</Link>
            </li>
            <li id="nav_wiki" className={addClass(pageId, ['wiki'], 'active')}>
              <Link to="/wiki.js">Wiki</Link>
            </li>
            <li id="nav_staff" className={addClass(pageId, ['staff'], 'active')}>
              <Link to="/staff.js" title="Staff">Staff</Link>
            </li>
          </ul>
        </div>
        <div id="searchbars">
                <ul>
                    <li id="searchbar_communities">
                        <form className="search_form" name="communities" action="communities.js" method="get">
                            {useAdvancedSearch && (
                                <input type="hidden" name="action" value="advanced" />
                            )}
                            <input
                                id="communitiessearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'communities' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'communities')}
                                defaultValue="Communities"
                                placeholder="Communities"
                                type="text"
                                name={useAdvancedSearch ? 'groupname' : 'searchstr'}
                                size="17"
                            />
                        </form>
                    </li>
                    <li id="searchbar_artists">
                        <form className="search_form" name="artists" action="artist.js" method="get">
                            <input
                                id="artistsearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'Artists' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'Artists')}
                                defaultValue="Artists"
                                placeholder="Artists"
                                type="text"
                                name="artistname"
                                size="17"
                            />
                        </form>
                    </li>
                    <li id="searchbar_requests">
                        <form className="search_form" name="requests" action="requests.js" method="get">
                            <input
                                id="requestssearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'Requests' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'Requests')}
                                defaultValue="Requests"
                                placeholder="Requests"
                                type="text"
                                name="search"
                                size="17"
                            />
                        </form>
                    </li>
                    <li id="searchbar_forums">
                        <form className="search_form" name="forums" action="forums.js" method="get">
                            <input type="hidden" name="action" value="search" />
                            <input
                                id="forumssearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'Forums' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'Forums')}
                                defaultValue="Forums"
                                placeholder="Forums"
                                type="text"
                                name="search"
                                size="17"
                            />
                        </form>
                    </li>
                    <li id="searchbar_log">
                        <form className="search_form" name="log" action="log.js" method="get">
                            <input
                                id="logsearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'Log' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'Log')}
                                defaultValue="Log"
                                placeholder="Log"
                                type="text"
                                name="search"
                                size="17"
                            />
                        </form>
                    </li>
                    <li id="searchbar_users">
                        <form className="search_form" name="users" action="user.js" method="get">
                            <input type="hidden" name="action" value="search" />
                            <input
                                id="userssearch"
                                spellCheck="false"
                                onFocus={(e) => e.target.value === 'Users' && (e.target.value = '')}
                                onBlur={(e) => e.target.value === '' && (e.target.value = 'Users')}
                                defaultValue="Users"
                                placeholder="Users"
                                type="text"
                                name="search"
                                size="20"
                            />
                        </form>
                    </li>
                    </ul>
            </div>
      </div>
      <div>
        {alerts.map((alert, index) => (
          <div key={index} className="alert">{alert}</div>
        ))}
        {modBar.map((item, index) => (
          <div key={index} className="modbar-item">{item}</div>
        ))}
      </div>
      <Routes location={window.location}>
        <Route path="/" element={<PrivateHomepage/>} />
        <Route path="/invite" element={<ReferralForm/>} />
      </Routes>
    </div>
  );
};

export default UserMenu;
