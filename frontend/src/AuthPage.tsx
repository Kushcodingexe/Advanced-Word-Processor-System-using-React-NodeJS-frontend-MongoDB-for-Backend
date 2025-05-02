import React, { useState } from 'react';
import axios from 'axios';

export interface User {
  username: string;
  email: string;
}

interface AuthPageProps {
  onAuth: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const [mode, setMode]     = useState<'login'|'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus]     = useState<string|null>(null);

  const toggleMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!username || !password || (mode === 'signup' && !email)) {
      return setStatus('Please fill all required fields.');
    }
    try {
      const url = `http://localhost:5000/api/${mode}`;
      const payload = mode === 'login'
        ? { username, password }
        : { username, email, password };
      const res = await axios.post(url, payload);
      if (!res.data.success) {
        // server returned { success:false, error: '…' }
        return setStatus(res.data.error);
      }
      onAuth(res.data.user);
    } catch (err: any) {
      // network or unexpected
      console.error('AuthPage error:', err);
      const msg =
        err.response?.data?.error ||
        err.message ||
        'Unknown network/server error';
      setStatus(msg);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 360, margin: 'auto' }}>
      <h2>{mode === 'login' ? '🔐 Log In' : '🆕 Sign Up'}</h2>
      <input
        style={{ width:'100%', padding:8, marginBottom:10 }}
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {mode === 'signup' && (
        <input
          style={{ width:'100%', padding:8, marginBottom:10 }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      )}
      <input
        style={{ width:'100%', padding:8, marginBottom:20 }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ padding:'8px 16px' }}>
        {mode === 'login' ? 'Log In' : 'Sign Up'}
      </button>
      <button onClick={toggleMode} style={{ padding:'8px 16px', marginLeft:10 }}>
        Switch to {mode === 'login' ? 'Sign Up' : 'Log In'}
      </button>
      {status && (
        <p style={{ marginTop:20, color:'red', whiteSpace:'pre-wrap' }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default AuthPage;
