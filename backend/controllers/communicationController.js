const Communication = require('../models/Communication');

exports.getAllCommunications = async (req, res) => {
  try {
    const communications = await Communication.find().populate('parent'); // Ensure parent is populated
    res.status(200).json(communications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communications' });
  }
};


exports.createCommunication = async (req, res) => {
  try {
    const newCommunication = new Communication(req.body);
    const savedCommunication = await newCommunication.save();
    res.status(201).json(savedCommunication);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create communication' });
  }
};

exports.updateCommunication = async (req, res) => {
  try {
    const updatedCommunication = await Communication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCommunication);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update communication' });
  }
};

exports.deleteCommunication = async (req, res) => {
  try {
    await Communication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Communication deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete communication' });
  }
};
