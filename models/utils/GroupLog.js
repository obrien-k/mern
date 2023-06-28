const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupLogSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    autoIncrement: true
  },
  GroupID: {
    type: Number,
    required: true
  },
  CommunityID: {
    type: Number,
    required: true
  },
  UserID: {
    type: Number,
    required: true,
    default: 0
  },
  Info: {
    type: String
  },
  Time: {
    type: Date,
    required: true,
    default: '0000-00-00 00:00:00'
  },
  Hidden: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = GroupLog = mongoose.model('GroupLog', groupLogSchema);
