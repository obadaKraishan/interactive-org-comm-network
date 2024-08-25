require('dotenv').config();

const mongoose = require('mongoose');
const Communication = require('../models/Communication');
const SubConnection = require('../models/SubConnection');

const departments = require('../../frontend/src/data/departments');
const executiveTeam = require('../../frontend/src/data/executiveTeam');
const teams = require('../../frontend/src/data/teams');
const members = require('../../frontend/src/data/members');
const sampleData = require('../../frontend/src/data/sampleData');

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
  populateDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const populateDatabase = async () => {
  try {
    // Clear existing data
    await Communication.deleteMany({});
    await SubConnection.deleteMany({});

    // Populate Communications
    const communications = [...departments, ...executiveTeam, ...teams, ...members];
    const insertedCommunications = await Communication.insertMany(communications);

    // Create a lookup map for the new IDs
    const idMap = {};
    insertedCommunications.forEach(communication => {
      idMap[communication.id] = communication._id;
    });

    // Log the idMap to ensure it contains the correct mappings
    console.log('ID Map:', idMap);

    // Populate SubConnections with correct ObjectIds
    const subConnections = sampleData.links.map(link => {
      const sourceId = idMap[link.source];
      const targetId = idMap[link.target];

      // Log to check if sourceId and targetId are being correctly retrieved
      console.log(`Mapping for link - Source: ${link.source}, Target: ${link.target}`);
      console.log(`Mapped IDs - Source: ${sourceId}, Target: ${targetId}`);

      if (!sourceId || !targetId) {
        throw new Error(`Invalid ID mapping - Source: ${link.source}, Target: ${link.target}`);
      }

      return {
        source: sourceId,
        target: targetId,
        type: 'communication',
      };
    });

    await SubConnection.insertMany(subConnections);

    console.log('Database populated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating the database:', error);
    mongoose.connection.close();
  }
};
