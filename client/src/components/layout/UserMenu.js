import React from 'react';

const UserMenu = ({ user, pageId }) => {
  const { username, bonusPoints, bytesUploaded, bytesDownloaded, requiredRatio, flTokens, hasUnlimitedInvites } = user;

  // Placeholder for formatSize function
  const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

   // Alerts and ModBar (simulating server-side array logic)
   const [alerts, setAlerts] = useState([]);
   const [modBar, setModBar] = useState([]);
 
   // Simulate fetching data from the server and setting alerts and modBar.
   useEffect(() => {
     // Example, populate the arrays with data fetched from an API.
     setAlerts(['New staff blog post!']);
     setModBar(['Toolbox']);
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
              <a href="/invite">Invite</a>
            </li>
            <li id="nav_donate">
              <a href="/donate">Donate</a>
            </li>
            <li id="nav_forums" className={addClass(pageId, ['forums'], 'active')}>
              <a href="forums.php">Forums</a>
            </li>
            <li id="nav_irc" className={addClass(pageId, ['chat'], 'active')}>
              <a href="wiki.php?action=article&name=irc">IRC</a>
            </li>
          </ul>
          <ul id="userinfo_stats">
            <li id="stats_seeding">
              <a href={`/torrents/seeding/${username}`}>Up:</a>
              <span className="stat" title={formatSize(bytesUploaded)}>{formatSize(bytesUploaded)}</span>
            </li>
            <li id="stats_leeching">
              <a href={`/torrents/leeching/${username}`}>Down:</a>
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
      </div>
      <div>
        {alerts.map((alert, index) => (
          <div key={index} className="alert">{alert}</div>
        ))}
        {modBar.map((item, index) => (
          <div key={index} className="modbar-item">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
