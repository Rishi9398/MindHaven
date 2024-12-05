const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection function
const errorHandler = require("./config/errorHandler"); // Custom error handler
const tasksRouter = require("./routers/tasksRouter"); // Tasks API routes
const sosRouter = require("./routers/sosRouter"); // SOS API routes (optional)
const authRouter = require("./routers/authRouter"); // Authentication routes
const userRoutes = require("./routes/users"); // User management routes
const authRoutes = require("./routes/auth"); // Additional authentication routes

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Apply middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(errorHandler); // Handle custom errors

// Define API routes
app.use("/api/tasks", tasksRouter); // Tasks API endpoints
app.use("/api/sos", sosRouter); // SOS API endpoints (optional)
app.use("/api/auth", authRouter); // Authentication routes (login/register)
app.use("/api/users", userRoutes); // User management routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
