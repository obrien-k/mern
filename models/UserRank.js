const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRankSchema = new Schema({
  field1: {
    type: Number,
    required: true
  },
  field2: {
    type: String,
    required: true
  },
  field3: {
    type: {
      site_leech: { type: Boolean, default: false },
      site_upload: { type: Boolean, default: false },
      site_vote: { type: Boolean, default: false },
      site_submit_requests: { type: Boolean, default: false },
      site_advanced_search: { type: Boolean, default: false },
      site_top10: { type: Boolean, default: false },
      site_advanced_top10: { type: Boolean, default: false },
      site_album_votes: { type: Boolean, default: false },
      site_communities_notify: { type: Boolean, default: false },
      site_collages_create: { type: Boolean, default: false },
      site_collages_manage: { type: Boolean, default: false },
      site_collages_subscribe: { type: Boolean, default: false },
      site_collages_personal: { type: Boolean, default: false },
      site_collages_renamepersonal: { type: Boolean, default: false },
      site_make_bookmarks: { type: Boolean, default: false },
      site_edit_wiki: { type: Boolean, default: false },
      site_can_invite_always: { type: Boolean, default: false },
      site_send_unlimited_invites: { type: Boolean, default: false },
      site_moderate_requests: { type: Boolean, default: false },
      site_delete_artist: { type: Boolean, default: false },
      site_moderate_forums: { type: Boolean, default: false },
      site_admin_forums: { type: Boolean, default: false },
      site_forums_double_post: { type: Boolean, default: false },
      site_view_flow: { type: Boolean, default: false },
      site_view_full_log: { type: Boolean, default: false },
      site_view_community_snatchlist: { type: Boolean, default: false },
      site_recommend_own: { type: Boolean, default: false },
      site_manage_recommendations: { type: Boolean, default: false },
      site_delete_tag: { type: Boolean, default: false },
      site_disable_ip_history: { type: Boolean, default: false },
      zip_downloader: { type: Boolean, default: false },
      site_debug: { type: Boolean, default: false },
      site_proxy_images: { type: Boolean, default: false },
      site_search_many: { type: Boolean, default: false },
      users_edit_usernames: { type: Boolean, default: false },
      users_edit_ratio: { type: Boolean, default: false },
      users_edit_own_ratio: { type: Boolean, default: false },
      users_edit_titles: { type: Boolean, default: false },
      users_edit_avatars: { type: Boolean, default: false },
      users_edit_invites: { type: Boolean, default: false },
      users_edit_watch_hours: { type: Boolean, default: false },
      users_edit_reset_keys: { type: Boolean, default: false },
      users_edit_profiles: { type: Boolean, default: false },
      users_view_friends: { type: Boolean, default: false },
      users_reset_own_keys: { type: Boolean, default: false },
      users_edit_password: { type: Boolean, default: false },
      users_promote_below: { type: Boolean, default: false},
      users_promote_to: { type: Boolean, default: false },
      users_give_donor: { type: Boolean, default: false },
      users_warn: { type: Boolean, default: false },
      users_disable_users: { type: Boolean, default: false },
      users_disable_posts: { type: Boolean, default: false },
      users_disable_any: { type: Boolean, default: false },
      users_delete_users: { type: Boolean, default: false },
      users_view_invites: { type: Boolean, default: false },
      users_view_seedleech: { type: Boolean, default: false },
      users_view_uploaded: { type: Boolean, default: false },
      users_view_keys: { type: Boolean, default: false },
      users_view_ips: { type: Boolean, default: false },
      users_view_email: { type: Boolean, default: false },
      users_invite_notes: { type: Boolean, default: false },
      users_override_paranoia: { type: Boolean, default: false },
      users_logout: { type: Boolean, default: false },
      users_make_invisible: { type: Boolean, default: false },
      users_mod: { type: Boolean, default: false },
      communities_edit: { type: Boolean, default: false },
      communities_delete: { type: Boolean, default: false },
      communities_delete_fast: { type: Boolean, default: false },
      communities_freeleech: { type: Boolean, default: false },
      communities_search_fast: { type: Boolean, default: false },
      communities_hide_dnu: { type: Boolean, default: false },
      communities_fix_ghosts: { type: Boolean, default: false },
      admin_manage_news: { type: Boolean, default: false },
      admin_manage_blog: { type: Boolean, default: false },
      admin_manage_polls: { type: Boolean, default: false },
      admin_manage_forums: { type: Boolean, default: false },
      admin_manage_fls: { type: Boolean, default: false },
      admin_reports: { type: Boolean, default: false },
      admin_advanced_user_search: { type: Boolean, default: false },
      admin_create_users: { type: Boolean, default: false },
      admin_donor_log: { type: Boolean, default: false },
      admin_manage_ipbans: { type: Boolean, default: false },
      admin_dnu: { type: Boolean, default: false },
      admin_clear_cache: { type: Boolean, default: false },
      admin_whitelist: { type: Boolean, default: false },
      admin_manage_permissions: { type: Boolean, default: false }
    },
    default: {}
  },
  field4: {
    type: String,
    default: ''
  },
  field5: {
    type: String,
    default: ''
  },
  field6: {
    type: Number,
    default: 0
  }
});

module.exports = UserRank = mongoose.model('UserRank', UserRankSchema);
