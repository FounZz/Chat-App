import { useState } from 'react';

export default function UsernameInput({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Masukkan Username</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-4 rounded-lg mb-6 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Masukkan nama kamu..."
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}