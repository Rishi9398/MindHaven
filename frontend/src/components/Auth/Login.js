import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";  // Import axios

const AuthDialog = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (isLogin) {
        // Login API call
        response = await axios.post(
          "https://mindhavenbackend.vercel.app/api/login",
          { email, password },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        console.log("Login successful:", response?.data); // Use optional chaining to avoid runtime errors
        alert(response?.data?.message || "Login successful!");
      } else {
        // Register API call
        response = await axios.post(
          "https://mindhavenbackend.vercel.app/api/register",
          { username, email, password },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        console.log("Registration successful:", response?.data);
        alert(response?.data?.message || "Registration successful!");
      }

      // Close the dialog on success
      onClose();
    } catch (error) {
      console.error("Error during API call:", error);

      // Handle backend error message or show a generic error in dialog box
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          <Typography variant="h6">
            {isLogin ? "Nice to see you" : "Create an Account"}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
              label={isLogin ? "Email or phone number" : "Email"}
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
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isLogin && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                  mb: 2,
                }}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="#" underline="hover" color="primary">
                  Forgot password?
                </Link>
              </Box>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: "24px",
              }}
            >
              {isLogin ? "Sign in" : "Register"}
            </Button>
          </form>
          <Typography variant="body2" align="center">
            {isLogin
              ? "Don’t have an account? "
              : "Already have an account? "}
            <Link
              href="#"
              underline="hover"
              color="primary"
              onClick={handleToggle}
            >
              {isLogin ? "Sign up now" : "Sign in"}
            </Link>
          </Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AuthDialog;
