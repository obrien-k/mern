const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB..');
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB Connected..');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};
module.exports = connectDB;
