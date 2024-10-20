import React, { useState} from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import { sendMessage } from './controllers/ChatController';
import './styles/ChatApp.css';
import FileUploadButton from './components/FileUploadButton';

function App() {
  const [messages, setMessages] = useState([]);  
  const [inputText, setInputText] = useState('');  
  const [selectedFile, setSelectedFile] = useState(null);  

  const handleSend = async () => {
    if (inputText.trim()) { 
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', message: inputText }
      ]);

      try {
        const response = await sendMessage(inputText);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'llm', message: response } 
        ]);
      } catch (error) {
        console.error('Error:', error);
      }

      setInputText('');
      setSelectedFile(null); 
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    const fileType = file.name.split('.').pop().toLowerCase();
    setInputText(`${file.name} (${fileType})`);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setInputText(''); 
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          msg.type === 'user' ? (
            <ChatBubbleUser key={index} message={msg.message} />
          ) : (
            <ChatBubbleLLM key={index} message={msg.message} />
          )
        ))}
      </div>
      <div className="input-container">
        <FileUploadButton
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          selectedFile={selectedFile}
        />
        <textarea
          placeholder="Escribe tu mensaje"
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
