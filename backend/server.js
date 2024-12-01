const express = require('express');
const mysql = require("mysql2"); 
const bodyParser = require("body-parser"); 
const dotenv = require('dotenv'); 
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const errorHandler = require('./config/errorHandler'); 
const tasksRouter = require('./routers/tasksRouter'); 
const sosRouter = require('./routers/sosRouter'); 
const authRouter = require('./routers/authRouter'); 

// Load environment variables
dotenv.config();

// CORS configuration
const corsOptions = {
    origin: "https://mind-haven-web.vercel.app", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows credentials like cookies or authorization headers
};

// Initialize express app
const app = express();

// Middleware: Apply CORS before other middlewares or routes
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

// Preflight request handler
app.options("*", cors(corsOptions)); // Handle preflight requests

// MongoDB and MySQL Connections
connectDB();
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "rishith",
    database: process.env.MYSQL_DATABASE || "auth_login",
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        process.exit(1); 
    }
    console.log("Connected to MySQL database");
});

// Routes
app.use('/tasks', tasksRouter);
app.use('/sos', sosRouter);
app.use('/auth', authRouter);

// User registration API
app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;

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

// User login API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

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
                user: results[0],
            });
        } else {
            res.status(401).json({ message: "Invalid email or password." });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
