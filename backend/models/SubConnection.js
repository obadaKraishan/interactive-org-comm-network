const mongoose = require('mongoose');

const SubConnectionSchema = new mongoose.Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Communication',
    required: true,
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Communication',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('SubConnection', SubConnectionSchema);
