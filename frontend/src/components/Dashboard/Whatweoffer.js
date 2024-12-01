import React from "react";
import { useNavigate } from "react-router-dom";

const WhatWeOffer = ({ toggleChatbot }) => {
  const navigate = useNavigate();

  return (
    <section
      className="py-14 px-6 md:px-20 lg:px-40 bg-blue-700 rounded-lg"
      style={{ background: "#4C67BE" }}
    >
      <h2 className="text-white text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
        What We Offer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Video Recommendations Card */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col relative cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate("/video-recommendation")}
        >
          <div className="absolute top-6 right-6 w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full">
            <img src="/icon/Videorec.svg" alt="Video Icon" className="w-10 h-10" />
          </div>
          <h3 className="text-black text-xl md:text-2xl font-bold mb-4">
            Video Recommendations
          </h3>
          <p className="text-gray-600 text-base md:text-lg">
            Calm minds through guided videos
          </p>
        </div>

        {/* SOS Help Card */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col relative cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate("/sos")}
        >
          <div className="absolute top-6 right-6 w-16 h-16 bg-green-100 flex items-center justify-center rounded-full">
            <img src="/icon/soshelp.svg" alt="SOS Icon" className="w-10 h-10" />
          </div>
          <h3 className="text-black text-xl md:text-2xl font-bold mb-4">SOS Help</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Emergency help for emotional distress
          </p>
        </div>

        {/* ChatBot Card */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col relative cursor-pointer hover:shadow-xl transition"
          onClick={toggleChatbot}
        >
          <div className="absolute top-6 right-6 w-16 h-16 bg-purple-100 flex items-center justify-center rounded-full">
            <img src="/icon/chatbot.svg" alt="ChatBot Icon" className="w-10 h-10" />
          </div>
          <h3 className="text-black text-xl md:text-2xl font-bold mb-4">ChatBot</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Crisis Support at your fingertips
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
