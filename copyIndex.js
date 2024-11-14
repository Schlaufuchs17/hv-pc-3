import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cambia esta ruta para que coincida con `src/client`
const sourceDir = path.join(__dirname, 'src', 'client');
const destinationDir = path.join(__dirname, 'dist', 'client');

// Asegúrate de que el destino existe
fs.mkdirSync(destinationDir, { recursive: true });

// Archivos a copiar desde `src/client` a `dist/client`
const filesToCopy = ['index.html', 'style.css'];

filesToCopy.forEach((file) => {
  const source = path.join(sourceDir, file);
  const destination = path.join(destinationDir, file);

  // Verifica si el archivo existe antes de copiar
  if (fs.existsSync(source)) {

    fs.copyFileSync(source, destination);
    console.log(`${file} copiado a dist/client.`);
  } else {
    console.warn(`Advertencia: ${file} no se encontró en ${source}`);
  }
});
