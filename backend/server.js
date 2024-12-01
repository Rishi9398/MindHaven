const express = require('express');
const mysql = require("mysql2"); // MySQL database for login
const bodyParser = require("body-parser"); // Body parser for parsing requests
const dotenv = require('dotenv'); // For environment variables
const cors = require('cors'); // For cross-origin requests
const connectDB = require('./config/db'); // MongoDB connection
const errorHandler = require('./config/errorHandler'); // Custom error handler
const tasksRouter = require('./routers/tasksRouter'); // Tasks API routes
const sosRouter = require('./routers/sosRouter'); // Optional SOS routes
const authRouter = require('./routers/authRouter'); // MongoDB authentication routes

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
    origin: "https://mind-haven-web.vercel.app", // Frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.json()); // Parse request bodies
app.use(errorHandler); // Custom error handler middleware

// MongoDB Connection
connectDB();

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost", // MySQL host
    user: process.env.MYSQL_USER || "root", // MySQL user
    password: process.env.MYSQL_PASSWORD || "password", // MySQL password
    database: process.env.MYSQL_DATABASE || "auth_login", // MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        process.exit(1); // Exit on database connection error
    }
    console.log("Connected to MySQL database");
});

// Routes
app.use('/tasks', tasksRouter); // Tasks API routes
app.use('/sos', sosRouter); // Optional SOS API routes
app.use('/auth', authRouter); // MongoDB authentication routes

// API endpoint for MySQL-based user registration
app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error("Error registering user:", err.message);
            return res.status(500).json({ message: "User registration failed." });
        }
        res.status(201).json({ message: "User registered successfully!" });
    });
});

// API endpoint for MySQL-based user login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error logging in user:", err.message);
            return res.status(500).json({ message: "Login failed." });
        }

        if (results.length > 0) {
            res.status(200).json({
                message: "Login successful!",
                user: results[0], // Send user data
            });
        } else {
            res.status(401).json({ message: "Invalid email or password." });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
