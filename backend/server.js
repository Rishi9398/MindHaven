require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./config/errorHandler');
const tasksRouter = require('./routers/tasksRouter');
const authRouter = require('./routers/authRouter');

const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


dotenv.config();
connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(errorHandler); 

// Routes
app.use('/tasks', tasksRouter); // Tasks API routes
app.use('/auth', authRouter); // Authentication routes (login and registration)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
