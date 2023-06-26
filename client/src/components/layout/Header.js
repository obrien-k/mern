import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Header = () => {
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [siteName, setSiteName] = useState('');

  useEffect(() => {
    // Fetch user data, site name, and notifications from the server
    axios.get('/api/user-data').then(response => {
      setUserData(response.data.userData);
      setSiteName(response.data.siteName);
      setNotifications(response.data.notifications);
      setNavItems(response.data.navItems);
    });
  }, []);

  return (
    <header>
      <title>{siteName}</title>
      {/* Similar meta tags, links and scripts here */}
      {/* Use fetched data for rendering logic similar to the PHP file */}
      {notifications.map((notification, index) => (
        <span key={index} className="noty-notification">{notification.message}</span>
      ))}
    </header>
  );
};

export default Header;
