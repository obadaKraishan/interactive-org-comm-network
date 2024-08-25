const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');  // Add this line
const communicationRoutes = require('./routes/communicationRoutes');
const subConnectionRoutes = require('./routes/subConnectionRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());  // Add this line

app.use(express.json({ extended: false }));

// Use routes
app.use('/api/communications', communicationRoutes);
app.use('/api/sub-connections', subConnectionRoutes);

// Handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Interactive Org Comm Network API');
});

// Serve static assets in production (if you are serving the frontend from the same server)
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
