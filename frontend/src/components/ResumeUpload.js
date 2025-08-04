import React, { useState } from 'react';

const ResumeUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Upload Your Resume</h3>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
        style={{ marginBottom: '10px' }}
      />
      {selectedFile && (
        <div style={{ marginTop: '10px' }}>
          <p>Selected: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;