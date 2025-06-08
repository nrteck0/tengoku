import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import WebnovelPage from './components/WebnovelPage';
import ReadingInterface from './components/ReadingInterface';
import UploadWebnovel from './components/UploadWebnovel';
import SplashScreen from './components/SplashScreen';
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import GenreSelection from './components/GenreSelection';

function App() {
  const isLoggedIn = Boolean(localStorage.getItem('currentUser'));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <SplashScreen />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/genres" element={<GenreSelection />} />
          <Route path="/webnovel/:id" element={<WebnovelPage />} />
          <Route path="/read/:id/:chapter" element={<ReadingInterface />} />
          <Route path="/upload" element={<UploadWebnovel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;