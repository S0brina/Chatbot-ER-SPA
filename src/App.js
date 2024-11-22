import React, { useState } from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import Header from './components/Header';
import { sendMessage } from './controllers/ChatController';
import './styles/ChatApp.css';
import FileUploadButton from './components/FileUploadButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const simulateStreaming = (responseText, updateCallback, speed = 5) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= responseText.length) {
        updateCallback(responseText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  };

  const normalizeMarkdown = (text) => {
    return text.replace(/(\r?\n\s*){2,}/g, '\n');
  };

  const handleFileUpload = (fileText) => {
    const normalizedText = normalizeMarkdown(fileText);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'llm', message: `Texto procesado del archivo:\n${normalizedText}` },
    ]);
  };

  const handleSend = async () => {
    const normalizedInput = normalizeMarkdown(inputText);

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', message: normalizedInput },
    ]);

    try {
      const response = await sendMessage(inputText);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'llm', message: '' },
      ]);

      simulateStreaming(response, (streamedText) => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].message = streamedText;
          return newMessages;
        });
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'llm', message: 'Error al procesar la solicitud.' },
      ]);
    }

    setInputText('');
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
            placeholder="Escribe un proceso manual o carga uno que ya tengas"
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