import React from "react";
import HeroSection from "../components/Dashboard/HeroSection";

import Offer from "../components/Dashboard/Whatweoffer";
import Chatbot from "../components/Shared/Chatbot";
import WhyChoose from "../components/Dashboard/WhyChoose";
import Testimonials from "../components/Dashboard/Testimonials";


const Home = () => {
  return (
    <div className="bg-gray-100 relative">
     
      <HeroSection />
      <Offer/>
      <WhyChoose/>
      <Testimonials/>
      <Chatbot />
    </div>
  );
};

export default Home;

