const { ObjectId } = require('mongoose').Types;

function convertToObjectId(id) {
  try {
    return ObjectId(id);
  } catch (error) {
    throw new Error('Invalid ID format.');
  }
}
module.exports = convertToObjectId;