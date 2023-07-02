import React from 'react';
import { Link } from 'react-router-dom';

const Toolbox = ({userId}) => {
    return (
        <div id="content">
            <div className="permissions">
                {/* begin left column */}
                <div className="permission_container">
                    <div className="permission_subcontainer">
                        <table className="layout">
                            <thead>
                                <tr className="colhead">
                                    <td>Administration</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><Link to="/private/staff/tools/permissions">Permissions manager</Link></td></tr>
                                <tr><td><a href="private/tools/staff_groups">Staff page group manager</a></td></tr>
                                {/* ... other links */}
                            </tbody>
                        </table>
                    </div>
                    {/* ... other subcontainers */}
                </div>
                {/* begin middle column */}
                <div className="permission_container">
                    <div className="permission_subcontainer">
                        <table className="layout">
                            <thead>
                                <tr className="colhead">
                                    <td>User management</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><a href="/private/tools/create_user">Create user</a></td></tr>
                                {/* ... other links */}
                            </tbody>
                        </table>
                    </div>
                    {/* ... other subcontainers */}
                </div>
                {/* begin right column */}
                <div className="permission_container">
                    <div className="permission_subcontainer">
                        <table className="layout">
                            <thead>
                                <tr className="colhead">
                                    <td>Site Information</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><a href="/private/tools/economic_stats">Economic stats</a></td></tr>
                                {/* ... other links */}
                            </tbody>
                        </table>
                    </div>
                    {/* ... other subcontainers */}
                </div>
            </div>
        </div>
    );
};

export default Toolbox;