import React, { useState } from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import { sendMessage } from './controllers/ChatController';
import './styles/ChatApp.css';
import FileUploadButton from './components/FileUploadButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleFileUpload = (fileText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'llm', message: `Texto procesado del archivo:\n${fileText}` },
    ]);
  };

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', message: inputText }, // Add user message
    ]);

    try {
      const response = await sendMessage(inputText);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'llm', message: response }, // Add LLM response message
      ]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInputText(''); // Clear user input
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) =>
          msg.type === 'user' ? (
            <ChatBubbleUser key={index} message={msg.message} />
          ) : (
            <ChatBubbleLLM
              key={index}
              message={
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="markdown"
                >
                  {msg.message}
                </ReactMarkdown>
              }
            />
          )
        )}
      </div>
      <div className="input-container">
        <FileUploadButton onFileUploaded={handleFileUpload} />
        <textarea
          placeholder="Escribe tu mensaje o selecciona un archivo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="2"
        />
        <button className="send-button" onClick={handleSend}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;