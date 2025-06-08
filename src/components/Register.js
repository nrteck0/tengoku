import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === email)) {
      setError('Email already in use');
      return;
    }
    const user = { email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/profile');
  };

  const handleSocial = (provider) => {
    const user = { email: `${provider}@example.com`, password: '', provider };
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <button className="btn social" onClick={() => handleSocial('google')}>Sign up with Google</button>
      <button className="btn social" onClick={() => handleSocial('apple')}>Sign up with Apple</button>
      <button className="btn social" onClick={() => handleSocial('facebook')}>Sign up with Facebook</button>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn primary">Next</button>
      </form>
    </div>
  );
}

export default Register;
