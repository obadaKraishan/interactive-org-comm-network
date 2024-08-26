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
    type: mongoose.Schema.Types.ObjectId, // Updated to reference another Communication document
    ref: 'Communication', // Added reference
  },
});

module.exports = mongoose.model('Communication', CommunicationSchema);
