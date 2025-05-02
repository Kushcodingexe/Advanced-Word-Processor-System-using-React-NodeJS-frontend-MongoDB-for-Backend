import React, { useState } from 'react';
import './App.css';
import AuthPage, { User } from './AuthPage';
import Default from './Default';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {!user ? (
        <AuthPage onAuth={setUser} />
      ) : (
        <Default currentUser={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
