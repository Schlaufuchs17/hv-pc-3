import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  text: string;
  user: string;
}

const socket: Socket = io('http://localhost:3000');

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    socket.on('chat message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
    return () => { socket.off('chat message'); }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (input) {
      socket.emit('chat message', { text: input, user: 'User' });
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}><strong>{msg.user}:</strong> {msg.text}</li>
        ))}
      </ul>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default App;
