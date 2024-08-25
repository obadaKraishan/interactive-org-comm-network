const mongoose = require('mongoose');
const Communication = require('../models/Communication');
const SubConnection = require('../models/SubConnection');

const departments = require('../../frontend/src/data/departments');
const executiveTeam = require('../../frontend/src/data/executiveTeam');
const teams = require('../../frontend/src/data/teams');
const members = require('../../frontend/src/data/members');
const sampleData = require('../../frontend/src/data/sampleData');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const populateDatabase = async () => {
  try {
    // Clear existing data
    await Communication.deleteMany({});
    await SubConnection.deleteMany({});

    // Populate Communications
    const communications = [...departments, ...executiveTeam, ...teams, ...members];
    await Communication.insertMany(communications);

    // Populate SubConnections
    const subConnections = sampleData.links.map(link => ({
      source: link.source,
      target: link.target,
      type: 'communication',
    }));
    await SubConnection.insertMany(subConnections);

    console.log('Database populated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating the database:', error);
  }
};

populateDatabase();
