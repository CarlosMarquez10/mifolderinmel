// src/routes/descargaFormato.routes.js

import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// Obtener __dirname si estás usando ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para descargar el archivo
router.get('/formato-hoja-de-vida', (req, res) => {
  // Construir la ruta absoluta al archivo
  const filePath = path.join(__dirname, '../doc/FORMATO UNICO HOJA DE VIDA.xlsx');

  // Enviar el archivo para descarga
  res.download(filePath, 'FORMATO UNICO HOJA DE VIDA.xlsx', (err) => {
    if (err) {
      console.error('Error al enviar el archivo:', err);
      res.status(500).send('Error al descargar el archivo.');
    }
  });
});

export default router;
