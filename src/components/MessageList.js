// src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => (
  <ul className="message-list">
    {messages.map((msg, index) => (
      <li key={index}>{msg}</li>
    ))}
  </ul>
);

export default MessageList;
