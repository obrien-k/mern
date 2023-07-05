import React, { useEffect } from 'react';

const PermissionFormInput = ({ inputData, setInputData }) => {
  // Destructure the inputData object to access the properties
  const {
    permissionName,
    classLevel,
    isSecondary,
    showOnStaffPage,
    staffPageGroup,
    maxCollages,
    additionalForums
  } = inputData;
console.log(JSON.stringify(inputData) + "permissionFormInput");
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInputData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (

      <table className="permission_head layout">
        <tbody>
          <tr>
            <td className="label">Permission name</td>
            <td>
              <input
                type="text"
                name="permissionName"
                id="permissionName"
                value={permissionName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Class level</td>
            <td>
              <input
                type="text"
                name="classLevel"
                id="classLevel"
                value={classLevel}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Secondary class</td>
            <td>
              <input
                type="checkbox"
                name="isSecondary"
                checked={isSecondary}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Show on staff page</td>
            <td>
              <input
                type="checkbox"
                name="showOnStaffPage"
                checked={showOnStaffPage}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Staff page group</td>
            <td>
              <select
                name="staffPageGroup"
                id="staffPageGroup"
                value={staffPageGroup}
                onChange={handleChange}
              >
                <option value="1">KO</option>
                {/* Render the available staff page groups options here */}
              </select>
            </td>
          </tr>
          <tr>
            <td className="label">Maximum number of personal collages</td>
            <td>
              <input
                type="text"
                name="maxCollages"
                size="5"
                value={maxCollages}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Additional forums</td>
            <td>
              <input
                type="text"
                size="30"
                name="additionalForums"
                value={additionalForums}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
  );
};

export default PermissionFormInput;
