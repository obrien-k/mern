const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function arrayLimit(val) {
  return val.length > 0;
}

const groupSchema = new Schema({
  title: {
    type: String,
    maxLength: 100,
    required: true
  },
  tags: {
    type: [{
    type: String,
    maxLength: 25,
    required: true
    }],
    validate: [arrayLimit, '{PATH} must have at least one tag.']
  },
  image: String,
  description: {
    type: String,
    maxLength: 1000,
    required: true
  },
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },
  consumers: [{
    type: Schema.Types.ObjectId,
    ref: 'Consumer'
  }],
  contributors: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'Contributor'
    }],
    validate: [arrayLimit, '{PATH} must have at least one contributor.']
  },
  contributions: [{
    type: Schema.Types.ObjectId,
    ref: 'Contribution'
  }],
  type: {
    type: String,
    enum: ['Music', 'Applications', 'E-Books', 'E-Learning Videos', 'Audiobooks', 'Comedy', 'Comics']
  },
  releaseType: {
    type: String,
    enum: ['Album', 'Single', 'EP', 'Anthology', 'Compilation', 'DJ Mix', 'Live', 'Remix', 'Bootleg', 'Interview', 'Mixtape', 'Demo', 'Concert Recording', 'Unknown']
  },
  year: {
    type: Number,
    min: 1900,
    max: 2100,
    required: true
  },
  isEdition: {
    type: Boolean,
    default: false
  },
  edition:{
    year: {
      type: Number,
      min: 1900,
      max: 2100
    },
    title: String,
    recordLabel: String,
    catalogNumber: String
  }
}, { timestamps: true});

groupSchema.index({ consumers: 1});
groupSchema.index({ contributors: 1});
groupSchema.index({ tags: 1});
groupSchema.index({ contributions: 1});

module.exports = Group = mongoose.model('Group', groupSchema);