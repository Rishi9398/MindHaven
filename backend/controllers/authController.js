const Login = require("../models/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Login({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
