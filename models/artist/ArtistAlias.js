const mongoose = require('mongoose');

const ArtistAliasSchema = new mongoose.Schema({
  "artistID": 123,
  "name": "artist_name",
  "redirect": 0,
  "userID": 456
});

module.exports = ArtistAlias = mongoose.model('artistAlias', ArtistAliasSchema);
