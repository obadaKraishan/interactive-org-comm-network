const express = require('express');
const connectDB = require('./config/db');
const communicationRoutes = require('./routes/communicationRoutes');
const subConnectionRoutes = require('./routes/subConnectionRoutes'); // Add this line

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json({ extended: false }));

// Use routes
app.use('/api/communications', communicationRoutes);
app.use('/api/sub-connections', subConnectionRoutes); // Add this line

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
