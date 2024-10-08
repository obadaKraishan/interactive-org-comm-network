require("dotenv").config();

const mongoose = require("mongoose");
const Communication = require("../models/Communication");
const SubConnection = require("../models/SubConnection");

// Importing data from the uploaded files
const departments = require("../../frontend/src/data/departments.js");
const executiveTeam = require("../../frontend/src/data/executiveTeam.js");
const teams = require("../../frontend/src/data/teams.js");
const members = require("../../frontend/src/data/members.js");
const sampleData = require("../../frontend/src/data/sampleData.js");

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
    populateDatabase();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const populateDatabase = async () => {
  try {
    // Clear existing data
    await Communication.deleteMany({});
    await SubConnection.deleteMany({});

    // Combine all communication entities
    const communications = [
      ...departments,
      ...executiveTeam,
      ...teams,
      ...members,
    ];

    // Insert communications into the database and create a lookup map for IDs
    const idMap = {};
    const insertedCommunications = await Communication.insertMany(
      communications.map((communication) => {
        const parentId = communication.parent ? idMap[communication.parent] : null;
        return { ...communication, id: String(communication.id), parent: parentId ? new mongoose.Types.ObjectId(parentId.toString()) : null };
      })
    );

    // Populate the ID map with the new MongoDB ObjectId values, using names or titles as keys
    insertedCommunications.forEach((communication) => {
      idMap[communication.name] = communication._id.toString(); // Map original name to MongoDB's ObjectId string
    });

    // Log the idMap to ensure it contains the correct mappings
    console.log("ID Map:", idMap);

    // Populate SubConnections with correct ObjectIds
    const subConnections = sampleData.links.map((link) => {
      const sourceName = sampleData.nodes.find(node => node.id === link.source).name;
      const targetName = sampleData.nodes.find(node => node.id === link.target).name;

      const sourceId = idMap[sourceName];
      const targetId = idMap[targetName];

      // Debugging: Log the source and target mapping attempts
      console.log(`Attempting to map Source: ${sourceName} -> ${sourceId}`);
      console.log(`Attempting to map Target: ${targetName} -> ${targetId}`);

      if (!sourceId || !targetId) {
        console.error(`Invalid ID mapping - Source: ${sourceName}, Target: ${targetName}`);
        console.error("Full ID Map:", idMap); // Log full idMap for more context
        throw new Error(`Invalid ID mapping - Source: ${sourceName}, Target: ${targetName}`);
      }

      return {
        source: new mongoose.Types.ObjectId(sourceId.toString()), // Correctly create ObjectId instances
        target: new mongoose.Types.ObjectId(targetId.toString()), // Correctly create ObjectId instances
        type: "communication",
      };
    });

    await SubConnection.insertMany(subConnections);

    console.log("Database populated successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating the database:", error);
    mongoose.connection.close();
  }
};
