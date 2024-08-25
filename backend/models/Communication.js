const mongoose = require('mongoose');

const CommunicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  brief: {
    type: String,
  },
  details: {
    type: String,
  },
  parent: {
    type: String, // Use ObjectId if referencing other documents
  },
});

module.exports = mongoose.model('Communication', CommunicationSchema);
