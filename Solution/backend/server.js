const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const assessmentRoutes = require('./routes/assessment');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://fs-assessment-taupe.vercel.app', // First allowed frontend URL
  'https://fs-assessment-c6x0gslqs-arpit-kasaudhan-s-projects.vercel.app', // Second allowed frontend URL
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`)); // Reject the origin
    }
  },
}));
app.use(bodyParser.json());

// Routes
app.use('/api', assessmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
