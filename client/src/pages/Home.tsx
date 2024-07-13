import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Storage App</h1>
      <Link to="/upload">Upload a File</Link>
      <br />
      <Link to="/files">View Uploaded Files</Link>
    </div>
  );
};

export default Home;
