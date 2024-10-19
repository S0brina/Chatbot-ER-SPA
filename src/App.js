import React, { useState} from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import { sendMessage } from './controllers/ChatController';
import './styles/ChatApp.css';


function App() {
  const [messages, setMessages] = useState([]);  // Estado para los mensajes del chat
  const [inputText, setInputText] = useState('');  // Estado para el texto del usuario

  // Función para manejar el envío de mensajes al backend
  const handleSend = async () => {
    if (inputText.trim()) {  // Verificar que haya texto para enviar
      // Primero, añadir el mensaje del usuario al estado
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', message: inputText }
      ]);

      try {
        // Enviar el mensaje al backend y recibir la respuesta
        const response = await sendMessage(inputText);

        // Añadir la respuesta del backend al estado
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'llm', message: response }  // Mostrar la respuesta del backend
        ]);
      } catch (error) {
        console.error('Error:', error);
      }

      // Limpiar el input de texto después de enviar
      setInputText('');
    }
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
        <textarea
          placeholder="Escribe tu mensaje"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}  // Actualizar el estado del input
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
