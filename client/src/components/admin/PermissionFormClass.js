import React from 'react';

const PermissionFormClass = ({ classData, setClassData }) => {
console.log(classData);
  const {
    sitePermissions,
    usersPermissions,
    communitiesPermissions,
    adminPermissions,
  } = classData;
  console.log(classData);
  const renderCheckboxes = (permissions, section) => (
    Object.keys(permissions).map(key => (
      <div key={key}>
        <input
          type="checkbox"
          name={key}
          id={key}
          checked={permissions[key]}
          onChange={(e) => setClassData({
            ...classData,
            [section]: { ...permissions, [key]: e.target.checked }
          })}
        />
        <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
        <br />
      </div>
    ))
  );

  return (
    <div className="permissions">
      <div className="permission_container">
        <table>
          <tbody>
            <tr className="colhead">
              <td>Site</td>
            </tr>
            <tr>
              <td>
                {renderCheckboxes(sitePermissions, 'sitePermissions')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <div className="permission_container">
          <table>
            <tbody>
              <tr className="colhead">
                <td>Users</td>
              </tr>
              <tr>
                <td>
                  {renderCheckboxes(usersPermissions, 'usersPermissions')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="permission_container">
          <table>
            <tbody>
              <tr className="colhead">
                <td>Communities</td>
              </tr>
              <tr>
                <td>
                {renderCheckboxes(communitiesPermissions, 'communitiesPermissions')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="permission_container">
          <table>
            <tbody>
              <tr className="colhead">
                <td>Admin</td>
              </tr>
              <tr>
                <td>
                  {renderCheckboxes(adminPermissions, "adminPermissions")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="submit_container">
          <button type="submit">Save Permission Class</button>
        </div>
    </div>
  );
};

export default PermissionFormClass;