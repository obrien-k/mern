import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicHeader = () => {
  /*
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [siteName, setSiteName] = useState("");*/

  /* todo/move to PrivateHeader
  useEffect(() => {
    // Fetch user data, site name, and notifications from the server
    axios.get("/api/user-data").then((response) => {
      setUserData(response.data.userData);
      setSiteName(response.data.siteName);
      setNotifications(response.data.notifications);
      setNavItems(response.data.navItems);
    });
  }, []);
*/
  const siteName = "Stellar";
  const notifications = [];
  return (
    <header>
      <title>{siteName}</title>
      {notifications.map((notification, index) => (
        <span key={index} className="noty-notification">
          {notification.message}
        </span>
      ))}
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/styles/kuro/style.css"
      />
      <link rel="stylesheet" type="text/css" href="/static/styles/global.css" />
    </header>
  );
};

export default PublicHeader;
