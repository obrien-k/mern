const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: String,
  consumers: [{
    type: Schema.Types.ObjectId,
    ref: 'Consumer'
  }],
  contributors: [{
    type: Schema.Types.ObjectId,
    ref: 'Contributor'
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  registration_status: {
    type: String,
    enum: ['open', 'invite', 'closed'],
    required: true
  },
  type: {
    type: String,
    enum: ['Music', 'Applications', 'E-Books', 'E-Learning Videos', 'Audiobooks', 'Comedy', 'Comics']
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Community = mongoose.model('Community', communitySchema);

const groupSchema = new Schema({
  name: String,
  description: String,
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  consumers: [{
    type: Schema.Types.ObjectId,
    ref: 'Consumer'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('Group', groupSchema);

const consumerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Consumer = mongoose.model('Consumer', consumerSchema);

const contributorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  contributions: [{
    type: Schema.Types.ObjectId,
    ref: 'Contribution'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = {
  Community,
  Group,
  Consumer,
  Contributor
};
