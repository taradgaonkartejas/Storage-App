import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/files" element={<FileList />} />
      </Routes>
    </div>
  );
};

export default App;
