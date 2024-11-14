import React, { useState} from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import { sendMessage} from './controllers/ChatController';
import './styles/ChatApp.css';
import FileUploadButton from './components/FileUploadButton';
import { sendFile } from './controllers/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSend = async () => {
    if (selectedFile) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', message: `Archivo enviado: ${selectedFile.name}` }
      ]);

      try {
        const response = await sendFile(selectedFile); 
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'llm', message: response }
        ]);
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
      }

      setSelectedFile(null);
      setInputText(''); 
    } else if (inputText.trim()) {
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
          selectedFile={selectedFile}
          onFileRemove={handleFileRemove}
        />
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