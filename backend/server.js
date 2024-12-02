const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./config/errorHandler');
const tasksRouter = require('./routers/tasksRouter');
const sosRouter = require('./routers/sosRouter'); // Add this if you need SOS routes
const authRouter = require('./routers/authRouter'); // Add authRouter for login and registration


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(errorHandler); // Custom error handler middleware

// Routes
app.use('/tasks', tasksRouter); // Tasks API routes
app.use('/auth', authRouter); // Authentication routes (login and registration)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
