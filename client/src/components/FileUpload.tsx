import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const FolderUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully', res.data);
    } catch (err) {
      console.error('Error uploading files', err);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        // {...{ webkitdirectory: '' } as any} // Type assertion to avoid TypeScript errors
      />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FolderUpload;
