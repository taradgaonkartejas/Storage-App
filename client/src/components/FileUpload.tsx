import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './ui/button';

const FolderUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progressDialog, setProgressDialog] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileUpload = async () => {
    setProgressDialog(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/file/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success('Files uploaded successfully', {
        position: 'bottom-right',
        hideProgressBar: true,
        autoClose: 1500,
        theme: 'light',
        transition: Bounce,
      });
    } catch (err) {
      toast.error('Error uploading files', {
        position: 'bottom-right',
        hideProgressBar: true,
        autoClose: 1500,
        theme: 'light',
        transition: Bounce,
      });
    } finally {
      setProgressDialog(false);
    }
  };

  return (
    <>
      {progressDialog && (
        <div className="absolute bg-white bg-opacity-90 z-10 h-full w-full flex items-center justify-center rounded-lg">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Uploading Files</span>
            <svg
              className="animate-spin h-8 w-8 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center bg-slate-300 h-screen">
        <div className="block min-w-[30rem] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 000-6h-.025A5.56 5.56 0 0016 6.5 5.5 5.5 0 005.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 000 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Any file type
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <Button
            className="m-3 mx-0 py-2.5 px-5 text-sm font-medium w-full text-white focus:outline-none bg-blue-800 !rounded-lg hover:bg-blue-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleFileUpload}
          >
            Upload
          </Button>
          <ToastContainer />
          {files.length > 0 && (
            <div className="mt-4">
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                   <li key={index} className="text-gray-500 dark:text-gray-400">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FolderUpload;
