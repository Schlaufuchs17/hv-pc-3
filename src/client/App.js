// src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import MessageList from './components/MessageList';

const socket = io('http://localhost:3000'); // Conexión con el servidor de Socket.IO

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => socket.off('chat message');
  }, []);

  const handleSendMessage = (msg) => {
    socket.emit('chat message', msg);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <Chat onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
