const mongoose = require("mongoose");

// Define the schema for user login and registration
const loginSchema = new mongoose.Schema({
  username: { type: String, required: false }, // Optional for login
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the model
const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
