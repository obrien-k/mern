import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PermissionManager = () => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        const response = await axios.get('/api/permissions');
        setPermissions(response.data);
    };

    const handleEdit = async (id) => {
      if (window.confirm('Are you sure you want to edit this permission class?')) {
          await axios.put(`/api/permissions/${id}`);
          fetchPermissions();
      }
  };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this permission class?')) {
            await axios.delete(`/api/permissions/${id}`);
            fetchPermissions();
        }
    };

    return (
        <div>
            <table width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>User Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map(permission => (
                        <tr key={permission._id}>
                            <td>{permission.name}</td>
                            <td>{permission.level}</td>
                            <td>{permission.userCount}</td>
                            <td>
                                <button onClick={() => handleEdit(permission._id)}>Edit</button>
                                <button onClick={() => handleDelete(permission._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermissionManager;