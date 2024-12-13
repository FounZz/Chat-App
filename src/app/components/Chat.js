import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns'; // Library untuk format waktu

let socket;

export default function Chat({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      socket = io('http://192.168.18.230:3001'); // Replace with your actual IP address

      // Ambil pesan sebelumnya dari server dan urutkan berdasarkan timestamp
      socket.on('previousMessages', (previousMessages) => {
        const sortedMessages = previousMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);
      });

      // Tangkap pesan baru dan urutkan berdasarkan timestamp
      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => {
          const updatedMessages = [msg, ...prev];
          return updatedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
      });

      socket.on('userJoined', (msg) => {
        setMessages((prev) => {
          const updatedMessages = [msg, ...prev];
          return updatedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        });
      });

      socket.emit('joinChat', username);

      return () => {
        socket.off('previousMessages');
        socket.off('receiveMessage');
        socket.off('userJoined');
      };
    }
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { user: username, message, timestamp: new Date().toISOString() });
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-1rem)] bg-gray-200">
      <div className="w-full max-w-md h-full flex flex-col p-4 bg-white shadow-md pb-4">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-4 text-blue-500">💬 Anonymous Chat</h1>

        {/* Display Messages (Newest at the top) */}
        <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 p-3 rounded-lg ${msg.user === username ? 'bg-blue-100 self-end' : 'bg-gray-200'}`}
              >
                <p className={`font-semibold ${msg.user === username ? 'text-blue-600' : 'text-gray-700'}`}>{msg.user}</p>
                <p className="text-gray-800 break-words max-w-full">{msg.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(msg.timestamp), 'dd MMM yyyy HH:mm')}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Belum ada pesan.</p>
          )}
        </div>

        {/* Input Message at the Bottom */}
        <div className="mt-auto">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 p-3 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ketik pesan..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
