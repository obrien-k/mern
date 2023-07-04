const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group:{
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  release_description: {
    type: String,
    maxLength: 1000,
    required: true
  },
  createdAt: {
    type: Date,
    index: true,
  },
  updatedAt: {
    type: Date,
    index: true,
  },
  consumers: [{
    type: Schema.Types.ObjectId,
    ref: 'Consumer'
  }],
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'Contributor'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  sizeInBytes: Number,
  type: {
    type: String,
    enum: ['txt', 'wav', 'pdf', 'wmv', 'ogg', 'lua', 'jpg', 'png']
  }
}, { timestamps: true });

module.exports = Contribution = mongoose.model('Contribution', contributionSchema);