const Communication = require('../models/Communication');

exports.getAllCommunications = async () => {
  return await Communication.find();
};

exports.createCommunication = async (communicationData) => {
  const newCommunication = new Communication(communicationData);
  return await newCommunication.save();
};

exports.updateCommunication = async (id, communicationData) => {
  return await Communication.findByIdAndUpdate(id, communicationData, { new: true });
};

exports.deleteCommunication = async (id) => {
  await Communication.findByIdAndDelete(id);
  return { message: 'Communication deleted successfully' };
};
