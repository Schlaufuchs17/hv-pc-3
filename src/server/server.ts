import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware para asegurar que los archivos JavaScript se sirvan con el tipo MIME correcto
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Servir archivos estáticos desde la carpeta client
app.use(express.static(path.join(__dirname, '../client')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
