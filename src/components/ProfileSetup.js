import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (ageNum < 13) {
      setError('You must be 13 or older');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.username === username)) {
      setError('Username taken');
      return;
    }
    const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const reader = { ...current, username, age: ageNum, picture };
    const index = users.findIndex((u) => u.email === current.email);
    if (index !== -1) {
      users[index] = reader;
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(reader));
    navigate('/genres');
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPicture(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="auth-form">
      <h2>Profile Setup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleFile} />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn primary">Next</button>
      </form>
    </div>
  );
}

export default ProfileSetup;
