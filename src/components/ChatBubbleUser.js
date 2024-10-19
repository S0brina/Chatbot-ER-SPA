import React from 'react';
import '../styles/ChatApp.css'; 

const ChatBubbleUser = ({ message }) => {
  return (
    <div className="chat-bubble user-bubble">
      <p>{message}</p>
    </div>
  );
};

export default ChatBubbleUser;
