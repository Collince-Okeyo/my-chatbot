import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import './Chatbot.css'

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleChat = async () => {
    if (!inputText.trim()) return;

    const client = new HfInference(""); // Replace with your API key
    const userMessage = { sender: "user", text: inputText };

    // Add user message to the chat log
    setChatLog((prevChatLog) => [...prevChatLog, userMessage]);
    setInputText("");

    try {
      const output = await client.textGeneration({
        model: "", // Replace with your desired model
        inputs: inputText,
      });

      const botMessage = {
        sender: "bot",
        text: output.generated_text || "No response from model",
      };
      setChatLog((prevChatLog) => [...prevChatLog, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        sender: "bot",
        text: "An error occurred while fetching the response.",
      };
      setChatLog((prevChatLog) => [...prevChatLog, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Ramg Chatbot</h2>
      <div className="chat-log">
        {chatLog.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <textarea
          placeholder="Type your question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleChat} className="chat-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
