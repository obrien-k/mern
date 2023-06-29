

db.permissions.insertMany([  {
  _id: 2,
  field1: 100,
  field2: 'User',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_album_votes: 1,
    site_edit_wiki: 1,
    torrents_add_artist: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 3,
  field1: 150,
  field2: 'Member',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    zip_downloader: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 4,
  field1: 200,
  field2: 'Power User',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    forums_polls_create: 1,
    zip_downloader: 1,
    torrents_add_artist: 1,
    MaxCollages: '1'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 5,
  field1: 250,
  field2: 'Elite',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    forums_polls_create: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    torrents_edit: 1,
    edit_unknowns: 1,
    MaxCollages: '3'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 19,
  field1: 201,
  field2: 'Artist',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_recommend_own: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 9
},
{
  _id: 20,
  field1: 202,
  field2: 'Donor',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    MaxCollages: '1'
  },
  field4: '',
  field5: '',
  field6: 10
},
{
  _id: 42,
  field1: 205,
  field2: 'Donor',
  field3: {
    site_vote: 1,
    site_submit_requests: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    zip_downloader: 1,
    torrents_add_artist: 1,
    MaxCollages: '1'
  },
  field4: '',
  field5: '',
  field6: 10
},
{
  _id: 23,
  field1: 255,
  field2: 'First Line Support',
  field3: {
    site_collages_personal: 1,
    site_advanced_top10: 1,
    MaxCollages: '1'
  },
  field4: '1',
  field5: '28',
  field6: 1
},
{
  _id: 41,
  field1: 257,
  field2: 'Recruiter',
  field3: {
    site_send_unlimited_invites: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 30,
  field1: 300,
  field2: 'Interviewer',
  field3: {
    MaxCollages: '0'
  },
  field4: '',
  field5: '30',
  field6: 1
},
{
  _id: 31,
  field1: 310,
  field2: 'Torrent Celebrity',
  field3: {
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 32,
  field1: 320,
  field2: 'Designer',
  field3: {
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    forums_polls_create: 1,
    zip_downloader: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '5'
  },
  field4: '',
  field5: '33',
  field6: 1
},
{
  _id: 33,
  field1: 330,
  field2: 'Security Team',
  field3: {
    site_send_unlimited_invites: 1,
    forums_polls_create: 1,
    MaxCollages: '5'
  },
  field4: '1',
  field5: '',
  field6: 1
},
{
  _id: 34,
  field1: 340,
  field2: 'IRC Team',
  field3: {
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 35,
  field1: 350,
  field2: 'Shadow Team',
  field3: {
    site_advanced_search: 1,
    site_top10: 1,
    site_advanced_top10: 1,
    site_can_invite_always: 1,
    site_send_unlimited_invites: 1,
    site_disable_ip_history: 1,
    users_edit_profiles: 1,
    users_view_friends: 1,
    users_disable_users: 1,
    users_disable_posts: 1,
    users_disable_any: 1,
    users_view_invites: 1,
    users_view_email: 1,
    users_mod: 1,
    admin_advanced_user_search: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 36,
  field1: 360,
  field2: 'Alpha Team',
  field3: {
    admin_reports: 1,
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 37,
  field1: 370,
  field2: 'Bravo Team',
  field3: {
    MaxCollages: '0'
  },
  field4: '',
  field5: '',
  field6: 1
},
{
  _id: 38,
  field1: 380,
  field2: 'Charlie Team',
  field3: {
    site_vote: 1,
    site_submit_requests: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_moderate_requests: 1,
    site_delete_artist: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    site_tag_aliases_read: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    torrents_fix_ghosts: 1,
    MaxCollages: '2'
  },
  field4: '',
  field5: '31',
  field6: 1
},
{
  _id: 39,
  field1: 395,
  field2: 'Delta Team',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_can_invite_always: 1,
    MaxCollages: '1'
  },
  field4: '',
  field5: '35',
  field6: 1
},
{
  _id: 25,
  field1: 400,
  field2: 'Torrent Master',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    forums_polls_create: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    torrents_edit: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '6'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 29,
  field1: 450,
  field2: 'Power TM',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    forums_polls_create: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    torrents_edit: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '5'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 28,
  field1: 500,
  field2: 'Elite TM',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_send_unlimited_invites: 1,
    forums_polls_create: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    torrents_edit: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '6'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 26,
  field1: 601,
  field2: 'VIP',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_send_unlimited_invites: 1,
    forums_polls_create: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    torrents_edit: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    MaxCollages: '6'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 27,
  field1: 605,
  field2: 'Legend',
  field3: {
    MaxCollages: '1'
  },
  field4: '',
  field5: '',
  field6: 0
},
{
  _id: 21,
  field1: 800,
  field2: 'Forum Moderator',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_send_unlimited_invites: 1,
    forums_polls_create: 1,
    site_moderate_forums: 1,
    site_admin_forums: 1,
    site_delete_tag: 1,
    site_disable_ip_history: 1,
    zip_downloader: 1,
    site_proxy_images: 1,
    site_search_many: 1,
    site_forums_double_post: 1,
    project_team: 1,
    site_tag_aliases_read: 1,
    users_edit_titles: 1,
    users_edit_avatars: 1,
    users_warn: 1,
    users_disable_posts: 1,
    users_override_paranoia: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    admin_reports: 1,
    MaxCollages: '6'
  },
  field4: '1',
  field5: '',
  field6: 0
  },
{
  _id: 22,
  field1: 850,
  field2: 'Torrent Moderator',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_send_unlimited_invites: 1,
    site_delete_artist: 1,
    forums_polls_create: 1,
    site_moderate_forums: 1,
    site_admin_forums: 1,
    site_view_torrent_snatchlist: 1,
    site_delete_tag: 1,
    site_disable_ip_history: 1,
    zip_downloader: 1,
    site_proxy_images: 1,
    site_search_many: 1,
    site_forums_double_post: 1,
    project_team: 1,
    site_tag_aliases_read: 1,
    users_edit_avatars: 1,
    users_edit_reset_keys: 1,
    users_view_friends: 1,
    users_warn: 1,
    users_disable_users: 1,
    users_disable_posts: 1,
    users_view_seedleech: 1,
    users_view_uploaded: 1,
    users_view_keys: 1,
    users_view_ips: 1,
    users_view_email: 1,
    users_invite_notes: 1,
    users_override_paranoia: 1,
    users_mod: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_delete_fast: 1,
    torrents_search_fast: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    torrents_fix_ghosts: 1,
    admin_reports: 1,
    admin_advanced_user_search: 1,
    admin_clear_cache: 1,
    admin_whitelist: 1,
    MaxCollages: '6'
  },
  field4: '1',
  field5: '',
  field6: 0
},
{
  _id: 11,
  field1: 900,
  field2: 'Moderator',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_delete: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_send_unlimited_invites: 1,
    site_moderate_requests: 1,
    site_delete_artist: 1,
    forums_polls_create: 1,
    site_moderate_forums: 1,
    site_admin_forums: 1,
    site_view_torrent_snatchlist: 1,
    site_delete_tag: 1,
    site_disable_ip_history: 1,
    zip_downloader: 1,
    site_proxy_images: 1,
    site_search_many: 1,
    site_forums_double_post: 1,
    project_team: 1,
    site_tag_aliases_read: 1,
    users_edit_titles: 1,
    users_edit_avatars: 1,
    users_edit_invites: 1,
    users_edit_reset_keys: 1,
    users_view_friends: 1,
    users_warn: 1,
    users_disable_users: 1,
    users_disable_posts: 1,
    users_disable_any: 1,
    users_view_invites: 1,
    users_view_seedleech: 1,
    users_view_uploaded: 1,
    users_view_keys: 1,
    users_view_ips: 1,
    users_view_email: 1,
    users_invite_notes: 1,
    users_override_paranoia: 1,
    users_mod: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_delete_fast: 1,
    torrents_freeleech: 1,
    torrents_search_fast: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    torrents_fix_ghosts: 1,
    admin_manage_fls: 1,
    admin_reports: 1,
    admin_advanced_user_search: 1,
    admin_clear_cache: 1,
    admin_whitelist: 1,
    MaxCollages: '6'
  },
  field4: '1',
  field5: '',
  field6: 0
},
{
  _id: 24,
  field1: 950,
  field2: 'Developer',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_can_invite_always: 1,
    site_send_unlimited_invites: 1,
    forums_polls_create: 1,
    site_view_flow: 1,
    site_view_full_log: 1,
    site_view_torrent_snatchlist: 1,
    site_recommend_own: 1,
    site_manage_recommendations: 1,
    site_delete_tag: 1,
    zip_downloader: 1,
    site_forums_double_post: 1,
    MaxCollages: '1'
  },
  field4: '1',
  field5: '35',
  field6: 0
},
{
  _id: 40,
  field1: 980,
  field2: 'Administrator',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_delete: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_can_invite_always: 1,
    site_send_unlimited_invites: 1,
    site_moderate_requests: 1,
    site_delete_artist: 1,
    forums_polls_create: 1,
    forums_polls_moderate: 1,
    site_moderate_forums: 1,
    site_admin_forums: 1,
    site_view_flow: 1,
    site_view_full_log: 1,
    site_view_torrent_snatchlist: 1,
    site_recommend_own: 1,
    site_manage_recommendations: 1,
    site_delete_tag: 1,
    site_disable_ip_history: 1,
    zip_downloader: 1,
    site_proxy_images: 1,
    site_search_many: 1,
    site_collages_recover: 1,
    site_forums_double_post: 1,
    site_tag_aliases_read: 1,
    users_edit_ratio: 1,
    users_edit_titles: 1,
    users_edit_avatars: 1,
    users_edit_invites: 1,
    users_edit_watch_hours: 1,
    users_edit_reset_keys: 1,
    users_edit_profiles: 1,
    users_view_friends: 1,
    users_reset_own_keys: 1,
    users_edit_password: 1,
    users_promote_below: 1,
    users_warn: 1,
    users_disable_users: 1,
    users_disable_posts: 1,
    users_disable_any: 1,
    users_delete_users: 1,
    users_view_invites: 1,
    users_view_seedleech: 1,
    users_view_uploaded: 1,
    users_view_keys: 1,
    users_view_ips: 1,
    users_view_email: 1,
    users_invite_notes: 1,
    users_override_paranoia: 1,
    users_mod: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_delete_fast: 1,
    torrents_freeleech: 1,
    torrents_search_fast: 1,
    torrents_hide_dnu: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    admin_manage_news: 1,
    admin_manage_blog: 1,
    admin_manage_polls: 1,
    admin_manage_forums: 1,
    admin_manage_fls: 1,
    admin_reports: 1,
    admin_advanced_user_search: 1,
    admin_create_users: 1,
    admin_donor_log: 1,
    admin_manage_ipbans: 1,
    admin_dnu: 1,
    admin_clear_cache: 1,
    admin_whitelist: 1,
    admin_manage_permissions: 1,
    admin_schedule: 1,
    admin_login_watch: 1,
    admin_manage_wiki: 1,
    admin_update_geoip: 1,
    site_collages_recover: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    forums_polls_create: 1,
    forums_polls_moderate: 1,
    project_team: 1,
    torrents_edit_vanityhouse: 1,
    artist_edit_vanityhouse: 1,
    site_tag_aliases_read: 1
  },
  field4: '1',
  field5: '',
  field6: 0
},
{
  _id: 15,
  field1: 1000,
  field2: 'Sysop',
  field3: {
    site_leech: 1,
    site_upload: 1,
    site_vote: 1,
    site_submit_requests: 1,
    site_advanced_search: 1,
    site_top10: 1,
    site_advanced_top10: 1,
    site_album_votes: 1,
    site_torrents_notify: 1,
    site_collages_create: 1,
    site_collages_manage: 1,
    site_collages_delete: 1,
    site_collages_subscribe: 1,
    site_collages_personal: 1,
    site_collages_renamepersonal: 1,
    site_make_bookmarks: 1,
    site_edit_wiki: 1,
    site_can_invite_always: 1,
    site_send_unlimited_invites: 1,
    site_moderate_requests: 1,
    site_delete_artist: 1,
    forums_polls_create: 1,
    site_moderate_forums: 1,
    site_admin_forums: 1,
    site_view_flow: 1,
    site_view_full_log: 1,
    site_view_torrent_snatchlist: 1,
    site_recommend_own: 1,
    site_manage_recommendations: 1,
    site_delete_tag: 1,
    site_disable_ip_history: 1,
    zip_downloader: 1,
    site_debug: 1,
    site_proxy_images: 1,
    site_search_many: 1,
    users_edit_usernames: 1,
    users_edit_ratio: 1,
    users_edit_own_ratio: 1,
    users_edit_titles: 1,
    users_edit_avatars: 1,
    users_edit_invites: 1,
    users_edit_reset_keys: 1,
    users_edit_profiles: 1,
    users_view_friends: 1,
    users_reset_own_keys: 1,
    users_edit_password: 1,
    users_promote_below: 1,
    users_promote_to: 1,
    users_give_donor: 1,
    users_warn: 1,
    users_disable_users: 1,
    users_disable_posts: 1,
    users_disable_any: 1,
    users_delete_users: 1,
    users_view_invites: 1,
    users_view_seedleech: 1,
    users_view_uploaded: 1,
    users_view_keys: 1,
    users_view_ips: 1,
    users_view_email: 1,
    users_invite_notes: 1,
    users_override_paranoia: 1,
    users_logout: 1,
    users_mod: 1,
    torrents_edit: 1,
    torrents_delete: 1,
    torrents_delete_fast: 1,
    torrents_freeleech: 1,
    torrents_search_fast: 1,
    torrents_add_artist: 1,
    edit_unknowns: 1,
    torrents_edit_vanityhouse: 1,
    artist_edit_vanityhouse: 1,
    site_tag_aliases_read: 1
  },
  field4: '1',
  field5: '',
  field6: 0
}
]);
