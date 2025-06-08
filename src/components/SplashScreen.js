import React from 'react';
import { Link } from 'react-router-dom';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <h1>Tengoku</h1>
      <p>Read your favorite comics and novels</p>
      <div className="splash-actions">
        <Link to="/register" className="btn primary">Sign Up</Link>
        <Link to="/login" className="btn">Log In</Link>
      </div>
    </div>
  );
}

export default SplashScreen;
