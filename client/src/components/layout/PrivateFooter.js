import React, { useEffect, useState } from 'react';
import Subscriptions from '../toast/Subscriptions';

const PrivateFooter = ({ options, userSessions, scriptStartTime, siteLaunchYear, siteName }) => {

    const [load, setLoad] = useState([]);
    const [lastActive, setLastActive] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      setLoad(sysGetLoadAvg());
  
      if (Array.isArray(userSessions) && userSessions.length > 1) {
          for (const session of userSessions) {
              if (session.sessionID !== scriptStartTime) {
                  setLastActive(session);
                  break;
              }
          }
      }
  
      const timer = setInterval(() => {
          setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
  }, [userSessions, scriptStartTime]);
  

    const sysGetLoadAvg = () => {
        // Implement this function to get the system load or use an appropriate library
        return [0, 0, 0];
    };

    const yearString = siteLaunchYear !== new Date().getFullYear() ? `${siteLaunchYear}-${new Date().getFullYear()}` : siteLaunchYear.toString();

    return (
        <div id="footer">
            {options?.disclaimer && (
                <div id="disclaimer_container" className="thin" style={{ textAlign: "center", marginBottom: "20px" }}>
                    {/* Disclaimer text */}
                </div>
            )}

            <p>Site and design &copy; {yearString} {siteName}</p>

            {lastActive && (
                <p>
                    <a href="user.php?action=sessions">
                        <span className="tooltip" title="Manage sessions">Last activity: </span>
                        {lastActive.lastUpdate}
                        <span className="tooltip" title="Manage sessions"> from {lastActive.ip}.</span>
                    </a>
                </p>
            )}

            <p>
                <strong>Time:</strong> <span>{((new Date().getTime() - scriptStartTime) * 1000).toFixed(5)} ms</span>
                <strong>Used:</strong> <span>{(4096 / 1024 / 1024).toFixed(2)} MB</span>
                <strong>Load:</strong> <span>{4}</span>
                <strong>Date:</strong> <span id="site_date">{currentTime.toLocaleDateString()}</span>, <span id="site_time">{currentTime.toLocaleTimeString()}</span>
            </p>
            <Subscriptions />
            {/* Extra divs, for stylesheet developers to add imagery */}
            <div id="extra1"><span></span></div>
            <div id="extra2"><span></span></div>
            <div id="extra3"><span></span></div>
            <div id="extra4"><span></span></div>
            <div id="extra5"><span></span></div>
            <div id="extra6"><span></span></div>

        </div>
    );
};

export default PrivateFooter;
