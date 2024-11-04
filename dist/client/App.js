import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
// Conecta con el servidor de Socket.IO
const socket = io('http://localhost:3000');
const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });
        return () => { socket.off('chat message'); };
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (input) {
            socket.emit('chat message', { text: input, user: 'User' });
            setInput('');
        }
    };
    return (_jsxs("div", { className: "chat-container", children: [_jsx("ul", { id: "messages", children: messages.map((msg, index) => (_jsxs("li", { children: [_jsxs("strong", { children: [msg.user, ":"] }), " ", msg.text] }, index))) }), _jsxs("form", { id: "chat-form", onSubmit: handleSubmit, children: [_jsx("input", { id: "chat-input", type: "text", value: input, onChange: (e) => setInput(e.target.value), autoComplete: "off" }), _jsx("button", { type: "submit", children: "Enviar" })] })] }));
};
export default App;
