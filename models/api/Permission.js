const mongoose = require('mongoose');
const { Schema } = mongoose;
const permissionSchema = new mongoose.Schema({
  name: String,
  level: Number,
  userCount: Number
});

const Permission = mongoose.model('Permission', permissionSchema);