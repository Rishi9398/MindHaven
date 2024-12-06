import React, { useState, useEffect } from "react";
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
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "../../supabaseClient"; // Import Supabase client

const AuthDialog = ({ open, onClose, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState(""); // Track username
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
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setUser(data.user); // Set authenticated user
        alert("Login successful!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });

        if (error) throw error;
        alert("Registration successful! Please check your email for verification.");
      }
      onClose(); // Close dialog after success
    } catch (error) {
      console.error("Error during API call:", error);
      alert(`Error: ${error.message || "An unexpected error occurred."}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user info
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          <Typography variant="h6">
            {isLogin ? "Nice to see you" : "Create an Account"}
          </Typography>
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {user ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">Welcome back, {user.email}!</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Log out
              </Button>
            </Box>
          ) : (
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
          )}
          {!user && (
            <Typography variant="body2" align="center">
              {isLogin ? "Don’t have an account? " : "Already have an account? "}
              <Link href="#" underline="hover" color="primary" onClick={handleToggle}>
                {isLogin ? "Sign up now" : "Sign in"}
              </Link>
            </Typography>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

const ParentComponent = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {user ? (
        <IconButton color="primary" onClick={handleOpen}>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button variant="contained" onClick={handleOpen}>
          Login
        </Button>
      )}
      <AuthDialog open={open} onClose={handleClose} user={user} setUser={setUser} />
    </>
  );
};


export { AuthDialog };


export default ParentComponent;