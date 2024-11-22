import React, { useRef } from "react";
import axios from "axios";
import { uploadFile } from '../controllers/ChatController';

function FileUploadButton({ onFileUploaded }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const resultText = await uploadFile(file);
        onFileUploaded(resultText);
      } catch (error) {
        console.error('Error al subir archivo:', error);
        alert('Hubo un error al procesar el archivo. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="file-upload-container">
      <button
        className="file-upload-button"
        onClick={() => fileInputRef.current.click()}
      >
        📎
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".txt,.docx,.pdf"
      />
    </div>
  );
}

export default FileUploadButton;
