// server/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
// Definir __filename y __dirname para ES Modules
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
// Definir el path a la carpeta de compilación del cliente
const clientBuildPath = path.join(__dirname, '../dist');
// Configurar Express para servir archivos estáticos desde la carpeta de compilación
app.use(express.static(clientBuildPath));
// Agrega la directiva de CSP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws://localhost:3000;");
    next();
});
// Manejar rutas con React (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
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
