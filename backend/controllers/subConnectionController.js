const SubConnection = require('../models/SubConnection');

exports.getAllSubConnections = async (req, res) => {
  try {
    const subConnections = await SubConnection.find()
      .populate('source')
      .populate('target');
    res.status(200).json(subConnections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sub-connections' });
  }
};

exports.createSubConnection = async (req, res) => {
  try {
    const newSubConnection = new SubConnection(req.body);
    const savedSubConnection = await newSubConnection.save();
    res.status(201).json(savedSubConnection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sub-connection' });
  }
};

exports.updateSubConnection = async (req, res) => {
  try {
    const updatedSubConnection = await SubConnection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSubConnection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sub-connection' });
  }
};

exports.deleteSubConnection = async (req, res) => {
  try {
    await SubConnection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Sub-connection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sub-connection' });
  }
};
