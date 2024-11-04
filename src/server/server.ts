import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const clientBuildPath = path.join(__dirname, './dist/client');

app.use(express.static(clientBuildPath));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:3000;"
  );
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

httpServer.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
