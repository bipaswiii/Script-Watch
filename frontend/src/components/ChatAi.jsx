import React, { useState, useEffect, useRef } from "react";
import Section from "./Section";
import { GradientLight } from "./design/Benifits";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDYZzLdmRGK0Ev7az3u4csgs1jnb5tTZF8";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatAi = () => {
  const [chatSession, setChatSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageScrollRef = useRef(null);

  useEffect(() => {
    const initChat = async () => {
      // Initialize chat session (if needed)
      // This can be adapted based on your specific use case with the Google Generative AI
      setChatSession({ history: [] }); // Placeholder for chat session initialization
    };
    initChat();
  }, []);

  const scrollToBottom = () => {
    messageScrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      // Send user message to the AI model
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const aiMessage = response.text();

      // Update messages with user and AI messages
      setMessages([...messages, { role: "user", text: userMessage }]);
      setMessages([...messages, { role: "gemini", text: aiMessage }]);
    } catch (error) {
      displayError(error.toString());
    } finally {
      setIsLoading(false);
      setUserMessage("");
      scrollToBottom();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  const displayError = (message) => {
    alert(message); // Replace with more sophisticated error handling
  };

  return (
    <Section className="pt-[12rem] -mt-[5.25rem]">
      <h1 className="flex justify-center font-mono text-lg ">
        {" "}
        Scan your detected script and question further to me
      </h1>
      <GradientLight />
      <div className="container md:max-w-[87rem] relative z-2  md:h-[500px]">
        <div className="bg-primary shadow-md rounded-lg p-6 h-full">
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4 mb-4 border rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`my-2 p-3 rounded-lg font-extrabold  ${
                    message.role === "user"
                      ? "bg-blue-500 text-black self-end"
                      : "bg-primamry text-indigo-400 self-start "
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messageScrollRef} />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow p-2 rounded-lg border md:h-[100px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-800 text-black bg-primary"
                placeholder="Enter your prompt"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="ml-4 px-4 py-2 bg-primary h-full text-white rounded-lg hover:bg-slate-950 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ChatAi;
