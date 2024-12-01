import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Add welcome message on chatbot initialization
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: "Hi! I'm MindHaven's chatbot. I'm here to assist you with health and well-being queries. How can I help you today?",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = await fetchBotResponse(input);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    setInput("");
  };

  const fetchBotResponse = async (userInput) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const GOOGLE_AI_URL = `https://aistudio.googleapis.com/v1/sessions:detectIntent?key=${API_KEY}`;

    try {
      const response = await fetch(GOOGLE_AI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queryInput: {
            text: {
              text: userInput,
              languageCode: "en-US",
            },
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.queryResult) {
        return data.queryResult.fulfillmentText || "Sorry, I didn't understand that.";
      }

      console.error("Error from API:", data.error);
      return "I'm sorry, I couldn't process your query.";
    } catch (error) {
      console.error("Error fetching response from server:", error);
      return "Oops! Something went wrong. Please try again later.";
    }
  };

  return (
    <>
      {/* Chat Icon to Open Chatbot */}
      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        💬
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative">
            {/* Chatbot Header */}
            <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
              <h2 className="text-lg font-bold">Chat with MindHaven</h2>
              <button
                className="text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex p-4 border-t">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
