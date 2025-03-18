const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./src/db/db");
const authRoutes = require('./src/routes/authRoute');
const airesponseRoute = require('./src/routes/airesponseRoute');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/airesponse', airesponseRoute);


// remove later
app.get('/api/seed', (req, res) => {
  res.sendFile(path.join(__dirname, 'seed_data.json'));
});

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
