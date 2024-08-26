const SubConnection = require('../models/SubConnection');

// Get all sub-connections
exports.getAllSubConnections = async (req, res) => {
  try {
    const subConnections = await SubConnection.find()
      .populate('source', '_id name')  // populate only necessary fields
      .populate('target', '_id name');
    res.status(200).json(subConnections);
  } catch (error) {
    console.error('Error fetching sub-connections:', error);
    res.status(500).json({ error: 'Failed to fetch sub-connections' });
  }
};

// Create a new sub-connection
exports.createSubConnection = async (req, res) => {
  try {
    const newSubConnection = new SubConnection(req.body);
    const savedSubConnection = await newSubConnection.save();
    res.status(201).json(savedSubConnection);
  } catch (error) {
    console.error('Error creating sub-connection:', error);
    res.status(500).json({ error: 'Failed to create sub-connection' });
  }
};

// Update an existing sub-connection
exports.updateSubConnection = async (req, res) => {
  try {
    const updatedSubConnection = await SubConnection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSubConnection);
  } catch (error) {
    console.error('Error updating sub-connection:', error);
    res.status(500).json({ error: 'Failed to update sub-connection' });
  }
};

// Delete a sub-connection
exports.deleteSubConnection = async (req, res) => {
  try {
    await SubConnection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Sub-connection deleted successfully' });
  } catch (error) {
    console.error('Error deleting sub-connection:', error);
    res.status(500).json({ error: 'Failed to delete sub-connection' });
  }
};
