import React, { useState } from 'react';
import axios from 'axios';

interface LoginPageProps {
  onLogin: (user: { username: string; email: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async () => {
    if (!username || !email) return alert('Enter username and email');
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, email });
      onLogin({ username, email });
      setStatus(res.data.success ? 'Login successful!' : 'User created and logged in.');
    } catch {
      setStatus('Login failed.');
    }
  };

  console.log('Rendering LoginPage');
  return (
    <div style={{ margin: '40px' }}>
      <h2>🔐 Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br /><br />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <p>{status}</p>
    </div>
  );
};

export default LoginPage;