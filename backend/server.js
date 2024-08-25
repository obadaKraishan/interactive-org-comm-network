const express = require('express');
const connectDB = require('./config/db');
const communicationRoutes = require('./routes/communicationRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json({ extended: false }));

// Use routes
app.use('/api/communications', communicationRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
