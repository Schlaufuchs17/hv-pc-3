// server/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Permitir el acceso desde el cliente
    methods: ["GET", "POST"]
  }
});

// Configurar Express para servir archivos estáticos desde la compilación de React
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Agrega la directiva de CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:3000;"
  );
  next();
});

// Manejar rutas con React (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Envía el mensaje a todos los usuarios conectados
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
httpServer.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
