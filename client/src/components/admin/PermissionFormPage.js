import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createRank,
  updateUserRank,
  getRankPermissions,
} from '../../actions/permissions';
import { structuredPermissions } from '../../utils/structuredPermissions';

import PermissionFormInput from './PermissionFormInput';
import PermissionFormClass from './PermissionFormClass';

const PermissionFormPage = ({
  getRankPermissions,
  createRank,
  updateUserRank,
  rankPermissions,
  loading
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
  const isEditing = Boolean(id);

  useEffect(() => {
    // Fetch existing permissions if in edit mode
    if (isEditing) {
      getRankPermissions(id); // Dispatch an action to fetch permissions based on the ID
    }
  }, [id, isEditing, getRankPermissions]);

  useEffect(() => {
    const setNestedPermissions = (rawPermissions) => {
      const nestedPermissions = structuredPermissions(rawPermissions);
  
      setClassData({
        sitePermissions: nestedPermissions.sitePermissions || {},
        usersPermissions: nestedPermissions.usersPermissions || {},
        communitiesPermissions: nestedPermissions.communitiesPermissions || {},
        adminPermissions: nestedPermissions.adminPermissions || {}
      });
    };
    // If in edit mode, wait for rankPermissions to load
    if (isEditing && !rankPermissions) {
      return; // Keep showing loading until rankPermissions is loaded
    }

    if (isEditing && rankPermissions) {
        if (rankPermissions) {
          setNestedPermissions(rankPermissions.field3);
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
    } else {
          const defaultPermissions = [
            "site_leech", "site_upload", "site_vote", "site_submit_requests", "site_advanced_search",
            "site_top10", "site_advanced_top10", "site_album_votes", "site_communities_notify",
            "site_collages_create", "site_collages_manage", "site_collages_subscribe", "site_collages_personal",
            "site_make_bookmarks", "site_edit_wiki", "site_can_invite_always", "site_send_unlimited_invites",
            "site_moderate_requests", "site_delete_artist", "site_moderate_forums", "site_admin_forums",
            "site_forums_double_post", "site_view_flow", "site_view_full_log", "site_view_community_snatchlist",
            "site_recommend_own", "site_manage_recommendations", "site_delete_tag", "site_disable_ip_history",
            "zip_downloader", "site_debug", "site_proxy_images", "site_search_many", "users_edit_usernames",
            "users_edit_ratio", "users_edit_own_ratio", "users_edit_titles", "users_edit_avatars", "users_edit_invites",
            "users_edit_watch_hours", "users_edit_reset_keys", "users_edit_profiles", "users_view_friends",
            "users_reset_own_keys", "users_edit_password", "users_promote_below", "users_promote_to", "users_give_donor",
            "users_warn", "users_disable_users", "users_disable_posts", "users_disable_any", "users_delete_users",
            "users_view_invites", "users_view_seedleech", "users_view_uploaded", "users_view_keys", "users_view_ips",
            "users_view_email", "users_invite_notes", "users_override_paranoia", "users_logout", "users_make_invisible",
            "users_mod", "communities_edit", "communities_delete", "communities_delete_fast", "communities_freeleech",
            "communities_search_fast", "communities_hide_dnu", "communities_fix_ghosts", "admin_manage_news",
            "admin_manage_blog", "admin_manage_polls", "admin_manage_forums", "admin_manage_fls", "admin_reports",
            "admin_advanced_user_search", "admin_create_users", "admin_donor_log", "admin_manage_ipbans", "admin_dnu",
            "admin_clear_cache", "admin_whitelist", "admin_manage_permissions"
          ].reduce((acc, permission) => {
            acc[permission] = false;
            return acc;
          }, {});
          setNestedPermissions(defaultPermissions);
    }
  }, [rankPermissions]);

  if (isEditing && !rankPermissions) {
    return <div>Loading...</div>;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className='linkbox'>
        <Link to='/private/staff/tools/permissions' className='brackets'>Back to Permissions Manager</Link> <Link to='/private/staff/tools' className='brackets'>Back to Toolbox</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <PermissionFormInput inputData={inputData} setInputData={setInputData} />
        <PermissionFormClass classData={classData} setClassData={setClassData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

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
