import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


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

  const handleSend = (message) => {
    const userMessage = { text: message || input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = getBotResponse(message || input);
    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    setInput("");
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Full questions with exact match
    const responses = {
      "how are you": "I'm just a bot, but I'm here to help you feel your best!",
      "how can i manage stress":
        "Managing stress involves regular exercise, mindfulness, deep breathing, and maintaining a balanced diet. Do something you enjoy every day!",
      "what are some tips for better sleep":
        "For better sleep, maintain a consistent sleep schedule, avoid screens before bed, and create a relaxing bedtime routine.",
      "how do i stay motivated":
        "Set realistic goals, celebrate small wins, and remind yourself why you started!",
      "what are healthy eating habits":
        "Healthy eating habits include eating more fruits and vegetables, staying hydrated, and avoiding processed foods.",
      "how do i improve mental health":
        "Improving mental health involves talking to loved ones, practicing mindfulness, seeking therapy, or engaging in activities you love.",
      "what is mindfulness":
        "Mindfulness means staying present in the moment without judgment. It helps reduce stress and improve focus.",
      "how do i deal with anxiety":
        "To deal with anxiety, practice deep breathing, focus on what you can control, and talk to someone you trust.",
      "what are the benefits of exercise":
        "Exercise boosts mood, improves sleep, increases energy, and helps manage stress.",
      "how do i build confidence":
        "Building confidence takes time. Focus on your strengths, set achievable goals, and take small steps toward your dreams.",
      "what is self-care":
        "Self-care is about taking time for yourself—whether that's relaxing, exercising, or doing something you love.",
      "how can i stay positive":
        "Practice gratitude, surround yourself with supportive people, and focus on what makes you happy.",
      "what are the effects of social media on mental health":
        "Social media can both connect and stress us. Take breaks when needed and focus on meaningful interactions.",
      "how do i deal with burnout":
        "Burnout can be managed by prioritizing self-care, setting boundaries, and seeking help when needed.",
      "what are ways to relax":
        "Relaxation techniques include deep breathing, meditation, yoga, or simply spending time in nature.",
      "how can i balance work and life":
        "Balance work and life by setting priorities, taking breaks, and making time for hobbies and loved ones.",
      "how do i boost energy levels naturally":
        "Boost energy by staying hydrated, eating nutritious foods, exercising, and getting enough sleep.",
      "what are signs of depression":
        "Signs include persistent sadness, loss of interest in activities, fatigue, and changes in sleep or appetite. Consider reaching out to a professional for help.",
    };

    if (responses[lowerInput]) {
      return responses[lowerInput];
    }

    
    const keywords = {
      stress: "Managing stress involves regular exercise, mindfulness, deep breathing, and maintaining a balanced diet.",
      sleep: "For better sleep, try maintaining a consistent sleep schedule, avoiding screens before bed, and creating a relaxing bedtime routine.",
      motivate: "Set realistic goals, celebrate small wins, and remind yourself why you started!",
      diet: "Healthy eating habits include eating more fruits and vegetables, staying hydrated, and avoiding processed foods.",
      "mental health": "Improving mental health involves talking to loved ones, practicing mindfulness, seeking therapy, or engaging in activities you love.",
      anxiety: "To deal with anxiety, practice deep breathing, focus on what you can control, and talk to someone you trust.",
      exercise: "Exercise boosts mood, improves sleep, increases energy, and helps manage stress.",
      confidence: "Building confidence takes time. Focus on your strengths, set achievable goals, and take small steps toward your dreams.",
      mindfulness: "Mindfulness means staying present in the moment without judgment. It helps reduce stress and improve focus.",
      "self-care": "Self-care is about taking time for yourself—whether that's relaxing, exercising, or doing something you love.",
      "social media": "Social media can connect us, but it can also cause stress. Take breaks when needed and focus on meaningful interactions.",
      burnout: "Burnout can be managed by prioritizing self-care, setting boundaries, and seeking help when needed.",
      relax: "Relaxation techniques include deep breathing, meditation, yoga, or simply spending time in nature.",
      energy: "Boost energy by staying hydrated, eating nutritious foods, exercising, and getting enough sleep.",
      depression: "Signs of depression include persistent sadness, loss of interest in activities, fatigue, and changes in sleep or appetite. Reach out to a professional for help.",
    };

    for (const keyword in keywords) {
      if (lowerInput.includes(keyword)) {
        return keywords[keyword];
      }
    }

    return "I'm sorry, I don't have an answer for that. Try asking me something else about mental or physical well-being!";
  };

  const suggestedQuestions = [
    "How can I manage stress",
    "What are some tips for better sleep",
    "How do I stay motivated",
    "What are healthy eating habits",
    "How do I improve mental health",
    "What is mindfulness",
  ];

  return (
    <>
      {/* Chat Icon */}
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

            {/* Suggested Questions */}
            <div className="p-4 border-t bg-gray-100">
              <p className="mb-2 text-gray-600">You can ask:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    {question}
                  </button>
                ))}
              </div>
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
                onClick={() => handleSend()}
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
