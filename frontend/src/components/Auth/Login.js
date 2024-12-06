import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { supabase } from "../../supabaseClient";

const Login = ({ open, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Only for registration
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Handle Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setUser(data.user); // Update user state after login
        alert("Login successful!");
      } else {
        // Handle Registration
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } }, // Include username in registration
        });
        if (error) throw error;
        alert("Registration successful! Please check your email for verification.");
      }
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error during authentication:", error);
      alert(`Authentication failed: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative", p: 3 }}>
        <DialogTitle>{isLogin ? "Login to MindHaven" : "Register for MindHaven"}</DialogTitle>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Box component="form" noValidate>
            {!isLogin && (
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />
            )}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleAuth}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Register here" : "Login here"}
              </Button>
            </Typography>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default Login;
