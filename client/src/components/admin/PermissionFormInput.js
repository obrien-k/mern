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

  // Fetch available staff page groups from API
  useEffect(() => {
    const fetchStaffPageGroups = async () => {
      try {
        const response = await fetch('/api/tools/permissions');
        const data = await response.json();
        // TODO: handle updating the staffPageGroup options here.
      } catch (error) {
        console.error('Error fetching staff page groups:', error);
      }
    };
    fetchStaffPageGroups();
  }, []);

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
                name="name"
                id="name"
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
                name="level"
                id="level"
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
                name="secondary"
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
                name="displaystaff"
                checked={showOnStaffPage}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label">Staff page group</td>
            <td>
              <select
                name="staffgroup"
                id="staffgroup"
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
                name="maxcollages"
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
                name="forums"
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
