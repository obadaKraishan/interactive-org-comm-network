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
    type: String, // You might need to reference other documents in the same collection
  },
});

module.exports = mongoose.model('Communication', CommunicationSchema);
