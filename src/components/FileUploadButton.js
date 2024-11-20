import React, { useRef } from "react";
import axios from "axios";

function FileUploadButton({ onFileUploaded }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['txt', 'docx', 'pdf'].includes(fileType)) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axios.post(
            'https://chatbot-gpt4o-mini.vercel.app/upload-file/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          // Asegúrate de usar el campo correcto de la respuesta
          const resultText = response.data.result; // Leer el campo `result`
          onFileUploaded(resultText); // Pasar el texto procesado al componente padre
        } catch (error) {
          console.error('Error al subir archivo:', error);
          alert('Hubo un error al procesar el archivo. Intenta nuevamente.');
        }
      } else {
        alert('Solo se permiten archivos .txt, .docx o .pdf');
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
