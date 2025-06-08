import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid credentials');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/home');
  };

  const handleSocial = (provider) => {
    const user = { email: `${provider}@example.com`, provider };
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/home');
  };

  return (
    <div className="auth-form">
      <h2>Log In</h2>
      <button className="btn social" onClick={() => handleSocial('google')}>Log in with Google</button>
      <button className="btn social" onClick={() => handleSocial('apple')}>Log in with Apple</button>
      <button className="btn social" onClick={() => handleSocial('facebook')}>Log in with Facebook</button>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
