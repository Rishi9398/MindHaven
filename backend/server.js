const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./config/errorHandler');
const tasksRouter = require('./routers/tasksRouter');

const authRouter = require('./routers/authRouter'); // Add authRouter for login and registration


dotenv.config();
connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); // Parse incoming JSON requests
app.use(errorHandler); // Custom error handler middleware

// Routes
app.use('/tasks', tasksRouter); // Tasks API routes
app.use('/auth', authRouter); // Authentication routes (login and registration)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
