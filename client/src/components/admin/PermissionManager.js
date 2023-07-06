import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const PermissionManager = () => {
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetchPermissions();
        const cancelToken = api.CancelToken.source();

        api.get('/tools/permissions', { cancelToken: cancelToken.token })
        .then(response => {
            setPermissions(response.data);
        })
        .catch(error => {
            if (!api.isCancel(error)) {
            console.error(error);
            setError('Failed to load data.');
            }
        });

        return () => {
        cancelToken.cancel('Request canceled by cleanup');
        };
        
    }, []);

    const fetchPermissions = async () => {
        const response = await api.get('/tools/permissions/');
        setPermissions(response.data);
    };

    const handleEdit = async (id) => {
      if (window.confirm('Are you sure you want to edit this permission class?')) {
          await api.put(`/tools/permissions/${id}`);
          fetchPermissions();
      }
  };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this permission class?')) {
            await api.delete(`/tools/permissions/${id}`);
            fetchPermissions();
        }
    };

    return (
        <div className='thin'>
            <div className='linkbox'>
                <Link to='/private/staff/tools/permissions/new' className='brackets'>Create New Permission Class</Link> <Link to='/private/staff/tools' className='brackets'>Back to Toolbox</Link>
            </div>
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
                            <td>{permission.field2}</td>
                            <td>{permission.field1}</td>
                            <td>{permission.userCount}</td>
                            <td>
                                <Link to={`/private/staff/tools/permissions/${permission._id}/edit`} className='brackets'>Edit</Link>
                                <span onClick={() => handleDelete(permission._id)} className='brackets'>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermissionManager;