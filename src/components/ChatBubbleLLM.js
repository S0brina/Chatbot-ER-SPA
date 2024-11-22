import React from 'react';
import '../styles/ChatApp.css'; 

const ChatBubbleLLM = ({ message }) => {
  return (
    <div className="chat-bubble llm-bubble">
      <p>{message}</p>
    </div>
  );
};

export default ChatBubbleLLM;
