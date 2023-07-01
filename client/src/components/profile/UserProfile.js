import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userRank }) => {
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await axios.get(`/api/permissions/${userRank}`);
        const { permissions } = response.data;
        // Determine if user has permissions based on the response
        setHasPermissions(permissions); // Set the state value accordingly
      } catch (error) {
        console.error('Error retrieving user permissions:', error);
      }
    };

    fetchUserPermissions();
  }, [userRank]);

  // Render the UserProfile component with other options
  return (
    <div>
      {/* Render other options */}
      {hasPermissions && <a href="/permissions">Permissions</a>}
    </div>
  );
};

export default UserProfile;
