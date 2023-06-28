import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({});
  const [pushOptions, setPushOptions] = useState({});
  const [apiKey, setApiKey] = useState("");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    const userId = 1; // TODO Programattically set this
    // Fetch settings from Express API
    axios.get('/api/notification-settings')
      .then(response => {
        setSettings(response.data.settings);
        setPushOptions(response.data.pushOptions);
      });
  }, []);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleDeviceIdChange = (event) => {
    setDeviceId(event.target.value);
  };

  const testPush = () => {
    toast.success("Test push notification");
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Push notifications</strong>
            </td>
            <td>
              <select value={pushService} onChange={handlePushServiceChange}>
                <option value="0">Disable push notifications</option>
                <option value="2">Prowl</option>
                <option value="4">Super Toasty</option>
                <option value="5">Pushover</option>
                <option value="6">PushBullet</option>
              </select>
              {pushService !== "0" && (
                <div>
                  <label htmlFor="apiKey">API key</label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                  />
                  <label htmlFor="deviceId">Device ID</label>
                  <select value={deviceId} onChange={handleDeviceIdChange}>
                    <option value="">Select Device</option>
                    {/* TODO Populate actual device IDs */}
                  </select>
                  <button onClick={testPush}>Test push</button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default NotificationSettings;