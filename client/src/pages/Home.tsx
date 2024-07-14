import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../components/ui/toggle-group";
import FolderUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('upload');

  const handleToggleChange = (value: string) => {
    if (value === '') {
      setSelectedTab(selectedTab);
    } else {
      setSelectedTab(value);
    }
  };

  return (
    <div className=' bg-slate-300 min-h-screen'>
      <div className='absolute z-10 bg-white w-fit rounded-lg p-1 m-4'>
        <ToggleGroup type="single" key={"upload"} value={selectedTab} onValueChange={handleToggleChange}>
          <ToggleGroupItem
            value="upload"
            aria-label="Toggle upload"
            className={`p-0 px-4 ${selectedTab === 'upload' ? 'bg-blue-800 text-white shadow-md' : ''}`}
          >
            <p>Upload File</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="file"
            aria-label="Toggle file"
            className={`p-0 px-4 ${selectedTab === 'file' ? 'bg-blue-800 text-white shadow-md' : ''}`}
          >
            <p>File List</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {/* Render different content based on the selected tab */}
      <div className='absolute inset-0 z-0'>
        {selectedTab === 'upload' && (
          <div className='absolute left-0 top-0 w-full h-full'>
            <FolderUpload />
          </div>
        )}
        {selectedTab === 'file' && (
          <div className='absolute left-0 top-0 w-full h-full'>
            <FileList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
