import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import SOS from "./pages/SOS";
import Home from "./pages/Home";
import Tasks from "./components/Dashboard/Tasks";
import News from "./pages/News";
import Chatbot from "./components/Shared/Chatbot";
import VideoRecommendation from "./pages/VideoRecommendation";
import Assignment from "./pages/Assignment";
import MoodTracker from "./components/Dashboard/MoodTracker";
import AuthDialog from "./components/Auth/Login"; // Use the AuthDialog for login

const App = () => {
  const [user, setUser] = useState(null); // Centralized user state
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleLoginOpen = () => setAuthDialogOpen(true);
  const handleLoginClose = () => setAuthDialogOpen(false);

  const handleLogout = async () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          user={user}
          onLoginClick={handleLoginOpen}
          onLogoutClick={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video-recommendation" element={<VideoRecommendation />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/assessment" element={<Assignment />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/news" element={<News />} />
            <Route path="/mood" element={<MoodTracker />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onClose={handleLoginClose}
        user={user}
        setUser={setUser}
      />
    </Router>
  );
};

export default App;
