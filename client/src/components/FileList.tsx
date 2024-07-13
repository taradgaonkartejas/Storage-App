import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface File {
  id: number;
  originalName: string;
  filename: string;
  createdAt: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/file`);
      console.log(res.data);

      if (Array.isArray(res.data)) {
        setFiles(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setError('Unexpected response format.');
      }
    } catch (err) {
      console.error('Error fetching files', err);
      setError('Error fetching files.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/file/${id}`);
      setFiles(files.filter(file => file.id !== id));
    } catch (err) {
      console.error('Error deleting file', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Uploaded Files</h2>
      {files.length > 0 ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              {file.originalName} (uploaded on {new Date(file.createdAt).toLocaleString()})
              <a
                href={`${import.meta.env.VITE_SERVER_URL}/api/file/${file.id}`}
                download={file.originalName}
                style={{ marginLeft: '10px' }}
              >
                Download
              </a>
              <button onClick={() => handleDelete(file.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileList;
