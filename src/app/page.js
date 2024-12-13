"use client";
import React, { useState } from 'react';
import Chat from './components/Chat';
import UsernameInput from './components/UsernameInput';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <UsernameInput onLogin={handleLogin} />
      ) : (
        <Chat username={username} />
      )}
    </div>

  );
}