import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import WebnovelPage from './components/WebnovelPage';
import ReadingInterface from './components/ReadingInterface';
import UploadWebnovel from './components/UploadWebnovel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/webnovel/:id" element={<WebnovelPage />} />
          <Route path="/read/:id/:chapter" element={<ReadingInterface />} />
          <Route path="/upload" element={<UploadWebnovel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;