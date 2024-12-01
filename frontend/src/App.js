import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import SOS from "./pages/SOS.js";
import Home from "./pages/Home";
import Tasks from "./components/Dashboard/Tasks";
import News from "./pages/News"; 
import Chatbot from "./components/Shared/Chatbot";
import VideoRecommendation from "./pages/VideoRecommendation";
import Assignment from "./pages/Assignment";
import MoodTracker from "./components/Dashboard/MoodTracker.js";



const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video-recommendation" element={<VideoRecommendation />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/assessment" element={<Assignment/>}/>    
            <Route path="/sos" element={<SOS />} />        
            <Route path="/chat" element={<Chatbot/>} />
            <Route path="/news" element={<News />} /> 
            <Route path="/mood" element={<MoodTracker/>}/>-
            
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
