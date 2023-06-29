const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRankSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  field1: {
    type: Number,
    required: true
  },
  field2: {
    type: String,
    required: true
  },
  field3: {
    site_leech: Number,
    site_upload: Number,
    site_vote: Number,
    site_submit_requests: Number,
    site_advanced_search: Number,
    site_top10: Number,
    site_torrents_notify: Number,
    site_collages_create: Number,
    site_collages_manage: Number,
    site_collages_subscribe: Number,
    site_collages_personal: Number,
    site_collages_renamepersonal: Number,
    site_advanced_top10: Number,
    site_album_votes: Number,
    site_make_bookmarks: Number,
    site_edit_wiki: Number,
    forums_polls_create: Number,
    site_delete_tag: Number,
    zip_downloader: Number,
    torrents_edit: Number,
    torrents_add_artist: Number,
    edit_unknowns: Number,
    MaxCollages: String,
    // ... add other properties as needed
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

module.exports = UserRank = mongoose.model('userRank', UserRankSchema);
