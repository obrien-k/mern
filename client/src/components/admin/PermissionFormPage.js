import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createRank,
  updateUserRank,
  getRankPermissions
} from '../../actions/permissions';
import { permissionsStructured } from '../../utils/permissionsStructured';

import PermissionFormInput from './PermissionFormInput';
import PermissionFormClass from './PermissionFormClass';

const PermissionFormPage = ({
  getRankPermissions,
  createRank,
  updateUserRank,
  rankPermissions,
  permissionToEdit
}) => {
  const [inputData, setInputData] = useState({
    permissionName: '',
    classLevel: '',
    isSecondary: false,
    showOnStaffPage: false,
    staffPageGroup: 1,
    maxCollages: '',
    additionalForums: ''
  });

  const [classData, setClassData] = useState({
    sitePermissions: {},
    usersPermissions: {},
    communitiesPermissions: {},
    adminPermissions: {}
  });

  const { id } = useParams();

  // Inside PermissionFormPage component

useEffect(() => {
  if (id) {
    console.log('Fetching rank permissions for ID:', id);
    getRankPermissions(id);
  }
}, [id, getRankPermissions]);

useEffect(() => {
  console.log('rankPermission changed:', rankPermissions);

  if (rankPermissions) {
    const nestedPermissions = permissionsStructured(rankPermissions.field3);
    console.log('nestedPermissions:', nestedPermissions);

    setClassData({
      sitePermissions: nestedPermissions.sitePermissions || {},
      usersPermissions: nestedPermissions.usersPermissions || {},
      communitiesPermissions: nestedPermissions.communitiesPermissions || {},
      adminPermissions: nestedPermissions.adminPermissions || {}
    });

    setInputData({
      permissionName: rankPermissions.field2 || '',
      classLevel: rankPermissions.field1 || '',
      isSecondary: rankPermissions.isSecondary || false,
      showOnStaffPage: rankPermissions.field6 || false,
      staffPageGroup: rankPermissions.staffPageGroup || 1,
      maxCollages: rankPermissions.maxCollages || '',
      additionalForums: rankPermissions.additionalForums || ''
    });
  }
}, [rankPermissions]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { sitePermissions, usersPermissions, communitiesPermissions, adminPermissions } = classData;

    const payload = {
      field1: inputData.classLevel,
      field2: inputData.permissionName,
      field6: inputData.showOnStaffPage,
      field3: {
        ...sitePermissions,
        ...usersPermissions,
        ...communitiesPermissions,
        ...adminPermissions
      }
    };

    if (payload.field1 && payload.field2) {
      if (id) {
        // Use the appropriate ID for updating an existing rank
        updateUserRank(id, payload);
      } else {
        createRank(payload);
      }
    } else {
      console.error('Class level and name are required fields.');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PermissionFormInput inputData={inputData} setInputData={setInputData} />
        <PermissionFormClass classData={classData} setClassData={setClassData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Add prop types to improve code reliability
PermissionFormPage.propTypes = {
getRankPermissions: PropTypes.func.isRequired,
createRank: PropTypes.func.isRequired,
updateUserRank: PropTypes.func.isRequired,
rankPermissions: PropTypes.object,
permissionToEdit: PropTypes.object
};

const mapStateToProps = state => ({
  rankPermissions: state.permissions.rankPermissions, // assuming the reducer puts the fetched data in rankPermission
});

const mapDispatchToProps = dispatch => ({
  getRankPermissions: (id) => dispatch(getRankPermissions(id)),
  createRank: (rankData) => dispatch(createRank(rankData)),
  updateUserRank: (id, rankData) => dispatch(updateUserRank(id, rankData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionFormPage);
