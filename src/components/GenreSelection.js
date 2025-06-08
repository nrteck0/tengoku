import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GENRES = ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life'];

function GenreSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggle = (genre) => {
    setSelected((prev) => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected.length < 3) return;
    const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u) => u.email === current.email);
    const user = { ...current, genres: selected };
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/home');
  };

  return (
    <div className="auth-form">
      <h2>Select Genres (min 3)</h2>
      <form onSubmit={handleSubmit} className="genre-list">
        {GENRES.map((genre) => (
          <label key={genre} className="genre-item">
            <input type="checkbox" checked={selected.includes(genre)} onChange={() => toggle(genre)} />
            {genre}
          </label>
        ))}
        <button type="submit" className="btn primary" disabled={selected.length < 3}>Finish</button>
      </form>
    </div>
  );
}

export default GenreSelection;
