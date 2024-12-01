const express = require('express');
const mysql = require("mysql2"); //my sql database for login
const bodyParser = require("body-parser");// login bodyparser
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./config/errorHandler');
const tasksRouter = require('./routers/tasksRouter');
const sosRouter = require('./routers/sosRouter'); // Add this if you need SOS routes
const authRouter = require('./routers/authRouter'); // Add authRouter for login and registration

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(errorHandler); // Custom error handler middleware
app.use(bodyParser.json());// bodyparser

// Routes
app.use('/tasks', tasksRouter); // Tasks API routes
app.use('/sos', sosRouter); // SOS API routes (optional, if needed)
app.use('/auth', authRouter); // Authentication routes (login and registration)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rishith", // Replace with your MySQL password
    database: "auth_login",    // Database name
  });
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
  
  // API endpoint for user registration
  app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "User registration failed." });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
  
  // API endpoint for user login
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ message: "Login failed." });
      }
      if (results.length > 0) {
        res.status(200).json({ message: "Login successful!", user: results[0] });
      } else {
        res.status(401).json({ message: "Invalid email or password." });
      }
    });
  });
  
