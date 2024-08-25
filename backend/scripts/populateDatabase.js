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
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

    // Ensure all IDs are strings
    communications.forEach((communication) => {
      communication.id = String(communication.id);
      console.log(`Preparing to insert: ${JSON.stringify(communication)}`);
    });

    // Insert communications into the database
    const insertedCommunications = await Communication.insertMany(communications);

    // Create a lookup map for the new IDs using the original id as a key
    const idMap = {};
    insertedCommunications.forEach((communication) => {
      console.log(`Inserted communication - Original ID: ${communication.id}, MongoDB ID: ${communication._id}`);
      idMap[communication.id] = communication._id.toString(); // Map original id to MongoDB's ObjectId string
    });

    // Log the idMap to ensure it contains the correct mappings
    console.log("ID Map:", idMap);

    // Debugging: Print the full ID Map before starting the link mapping
    console.log("Full ID Map:", idMap);

    // Populate SubConnections with correct ObjectIds
    const subConnections = sampleData.links.map((link) => {
      const sourceId = idMap[link.source];
      const targetId = idMap[link.target];

      // Debugging: Log the source and target mapping attempts
      console.log(`Attempting to map Source: ${link.source} -> ${idMap[link.source]}`);
      console.log(`Attempting to map Target: ${link.target} -> ${idMap[link.target]}`);

      // Log to check if sourceId and targetId are being correctly retrieved
      console.log(`Mapping for link - Source: ${link.source}, Target: ${link.target}`);
      console.log(`Mapped IDs - Source: ${sourceId}, Target: ${targetId}`);

      if (!sourceId || !targetId) {
        console.error(`Invalid ID mapping - Source: ${link.source}, Target: ${link.target}`);
        console.error("Full ID Map:", idMap); // Log full idMap for more context
        throw new Error(`Invalid ID mapping - Source: ${link.source}, Target: ${link.target}`);
      }

      return {
        source: mongoose.Types.ObjectId(sourceId), // Convert back to ObjectId
        target: mongoose.Types.ObjectId(targetId), // Convert back to ObjectId
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
