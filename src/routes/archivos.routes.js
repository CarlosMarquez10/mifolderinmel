// src/routes/archivos.routes.js

import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();

// Obtener __dirname si usas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para servir archivos estáticos (PDFs e imágenes)
router.get('/registros/:cedula/:archivo', (req, res) => {
  const cedula = req.params.cedula;
  const archivo = req.params.archivo;

  // Validar que la cédula y el nombre del archivo son válidos
  if (!/^\d+$/.test(cedula) || !/^[\w\-. ]+$/.test(archivo)) {
    return res.status(400).send('Parámetros inválidos.');
  }

  // Construir la ruta al archivo
  const filePath = path.join(__dirname, '../Registros', cedula, archivo);

  // Verificar que el archivo existe y está dentro del directorio permitido
  const resolvedPath = path.resolve(filePath);
  const allowedPath = path.resolve(path.join(__dirname, '../Registros', cedula));

  if (!resolvedPath.startsWith(allowedPath)) {
    return res.status(403).send('Acceso no autorizado.');
  }

  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).send('Archivo no encontrado.');
  }

  // Enviar el archivo
  res.sendFile(resolvedPath);
});

export default router;
