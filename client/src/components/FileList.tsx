import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip'; 
import { saveAs } from 'file-saver'; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { DownloadIcon } from 'lucide-react';

interface File {
  id: number;
  originalName: string;
  filename: string;
  size: number;
  createdAt: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedFiles.map(async (id) => {
          await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/file/${id}`);
        })
      );
      setFiles(files.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    } catch (err) {
      console.error('Error deleting selected files', err);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedFiles(prevState =>
      prevState.includes(id) ? prevState.filter(fileId => fileId !== id) : [...prevState, id]
    );
  };

  const handleDownloadSelected = async () => {
    const zip = new JSZip();
    const filesToDownload = files.filter(file => selectedFiles.includes(file.id));
    
    for (const file of filesToDownload) {
      const fileResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/file/${file.id}`, {
        responseType: 'blob',
      });
      zip.file(file.originalName, fileResponse.data);
    }

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, 'selected-files.zip');
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex justify-center items-center bg-slate-300 h-screen'>
      {files.length > 0 ? (
        <div className='bg-white w-[95%] h-[95%] block min-w-[30rem] p-6 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
          <div className="flex justify-end mb-4">
            <Button
              className="text-white hover:text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </Button>
            <Button
              className="text-white hover:text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
              onClick={handleDownloadSelected}
            >
              Download Selected
            </Button>
          </div>
          <div className='overflow-auto h-[80vh]'>
            <Table>
              <TableCaption>A list of your recent files.</TableCaption>
              <TableHeader>
                <TableRow >
                  <TableHead className="w-[2rem]">Select</TableHead>
                  <TableHead className="w-[30rem]">File Name</TableHead>
                  <TableHead>Uploading Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="w-[4rem]"></TableHead>
                  <TableHead className="w-[4rem]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map(file => (
                  <TableRow key={file.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <TableCell className='p-2'>
                      <Checkbox
                        className="form-checkbox h-4 w-4 text-blue-600"
                        checked={selectedFiles.includes(file.id)}
                        onClick={() => handleCheckboxChange(file.id)}
                      />
                    </TableCell>
                    <TableCell className='p-2'>{file.originalName.split('.')[0]}</TableCell>
                    <TableCell className='p-2'>{new Date(file.createdAt).toLocaleString()}</TableCell>
                    <TableCell className='p-2'>{file.originalName.split('.').pop()}</TableCell>
                    <TableCell className='p-2'>{(file.size / (1024 * 1024)).toFixed(2)} MB</TableCell>
                    <TableCell className='p-2'>
                      <a
                        href={`${import.meta.env.VITE_SERVER_URL}/api/file/${file.id}`}
                        download={file.originalName}
                      >
                        <DownloadIcon className='text-blue-800 h-4 '/>
                      </a>
                    </TableCell>
                    <TableCell className='p-2'>
                      <Button
                        className="text-red-700 hover:text-white border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => handleDelete(file.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileList;
