import React, { useState } from 'react';
import PermissionFormInput from "./PermissionFormInput";
import PermissionFormClass from "./PermissionFormClass";

const PermissionFormPage = ({ permissions }) => {
  const [inputData, setInputData] = useState({
    permissionName: '',
    classLevel: '',
    isSecondary: false,
    showOnStaffPage: false,
    staffPageGroup: 1,
    maxCollages: '',
    additionalForums: '',
  });

  

  const [classData, setClassData] = useState({
    sitePermissions: {
      perm_site_leech: false,
      perm_site_upload: false,
      perm_site_vote: false,
      perm_site_submit_requests: false,
      perm_site_advanced_search: false,
      perm_site_top10: false,
      perm_site_communities_notify: false,
      perm_site_collages_create: false,
      perm_site_collages_manage: false,
      perm_site_collages_delete: false,
      perm_site_collages_subscribe: false,
      perm_site_collages_personal: false,
      perm_site_collages_renamepersonal: false,
      perm_site_advanced_top10: false,
      perm_site_album_votes: false,
      perm_site_make_bookmarks: false,
      perm_site_edit_wiki: false,
      perm_site_can_invite_always: false,
      perm_site_send_unlimited_invites: false,
      perm_site_moderate_requests: false,
      perm_site_delete_artist: false,
      perm_site_debug: false,
      perm_site_database_specifics: false,
      perm_site_proxy_images: false,
      perm_site_search_many: false,
      perm_site_collages_recover: false,
      perm_site_tag_aliases_read: false,
      perm_site_user_stats: false,
      perm_site_unlimit_ajax: false,
      perm_site_disable_ip_history: false,
      perm_zip_downloader: false,
      perm_site_view_flow: false,
      perm_site_view_full_log: false,
      perm_site_view_torrent_snatchlist: false,
      perm_site_recommend_own: false,
      perm_site_manage_recommendations: false,
      perm_site_delete_tag: false,
    },
    usersPermissions: {
      perm_users_edit_usernames: false,
      perm_users_edit_ratio: false,
      perm_users_edit_own_ratio: false,
      perm_users_edit_titles: false,
      perm_users_edit_avatars: false,
      perm_users_edit_invites: false,
      perm_users_edit_watch_hours: false,
      perm_users_edit_reset_keys: false,
      perm_users_edit_profiles: false,
      perm_users_view_friends: false,
      perm_users_reset_own_keys: false,
      perm_users_edit_password: false,
      perm_users_promote_below: false,
      perm_users_promote_to: false,
      perm_users_give_donor: false,
      perm_users_warn: false,
      perm_users_disable_users: false,
      perm_users_disable_posts: false,
      perm_users_disable_any: false,
      perm_users_delete_users: false,
      perm_users_view_invites: false,
      perm_users_view_seedleech: false,
      perm_users_view_uploaded: false,
      perm_users_view_keys: false,
      perm_users_view_ips: false,
      perm_users_view_email: false,
      perm_users_invite_notes: false,
      perm_users_override_paranoia: false,
      perm_users_make_invisible: false,
      perm_users_logout: false,
      perm_users_mod: false,
    },
    communitiesPermissions: {
      perm_communities_edit: false,
      perm_communities_delete: false,
      perm_communities_delete_fast: false,
      perm_communities_freeleech: false,
      perm_communities_search_fast: false,
      perm_communities_add_artist: false,
      perm_edit_unknowns: false,
      perm_communities_edit_vanityhouse: false,
      perm_artist_edit_vanityhouse: false,
      perm_communities_hide_dnu: false,
      perm_communities_fix_ghosts: false,
   },
    adminPermissions: {
      perm_admin_manage_news: false,
      perm_admin_manage_blog: false,
      perm_admin_manage_contest: false,
      perm_admin_manage_polls: false,
      perm_admin_manage_forums: false,
      perm_admin_manage_fls: false,
      perm_admin_manage_user_fls: false,
      perm_admin_manage_applicants: false,
      perm_admin_manage_referrals: false,
      perm_admin_manage_payments: false,
      perm_admin_manage_navigation: false,
      perm_admin_periodic_task_manage: false,
      perm_admin_periodic_task_view: false,
      perm_admin_rate_limit_manage: false,
      perm_admin_rate_limit_view: false,
      perm_admin_view_referrals: false,
      perm_admin_reports: false,
      perm_admin_bp_history: false,
      perm_admin_advanced_user_search: false,
      perm_admin_create_users: false,
      perm_admin_donor_log: false,
      perm_admin_manage_stylesheets: false,
      perm_admin_manage_ipbans: false,
      perm_admin_dnu: false,
      perm_admin_clear_cache: false,
      perm_admin_whitelist: false,
      perm_admin_manage_permissions: false,
      perm_admin_recovery: false,
      perm_admin_schedule: false,
      perm_admin_login_watch: false,
      perm_admin_manage_wiki: false,
      perm_admin_update_geoip: false,
      perm_admin_staffpm_stats: false,
    }
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., make an API call to save the form data
    console.log(inputData, classData);
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

export default PermissionFormPage;
