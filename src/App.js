import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import WebnovelPage from './components/WebnovelPage';
import ReadingInterface from './components/ReadingInterface';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/webnovel/:id" element={<WebnovelPage />} />
          <Route path="/read/:id/:chapter" element={<ReadingInterface />} />
          <Route path="/" element={<Home />} />
          {/* Add more routes here as we expand the app */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;