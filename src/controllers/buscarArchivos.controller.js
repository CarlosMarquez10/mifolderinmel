// src/controllers/buscarArchivos.controller.js

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener __dirname si usas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const mostrarFormulario = (req, res) => {
  res.render('buscar_archivos', { title: 'Buscar Archivos' });
};

export const mostrarArchivos = (req, res) => {
  const cedula = req.body.cedula;
  
  // Validar que la cédula es un número
  if (!/^\d+$/.test(cedula)) {
    return res.status(400).send('Número de cédula inválido.');
  }

  // Construir la ruta a la carpeta de la cédula
  const folderPath = path.join(__dirname, '../Registros', cedula);

  // Verificar que la carpeta existe
  if (!fs.existsSync(folderPath)) {
    return res.status(404).send('No se encontraron archivos para esta cédula.');
  }

  // Leer los archivos en la carpeta
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta:', err);
      return res.status(500).send('Error al leer los archivos.');
    }

    // Filtrar archivos PDF y la imagen de perfil
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Obtener la imagen de perfil (asumimos que es la primera imagen encontrada)
    const profileImage = imageFiles.length > 0 ? imageFiles[0] : null;

    res.render('ver_archivos', {
      title: 'Ver Archivos',
      cedula: cedula,
      files: pdfFiles,
      profileImage: profileImage
    });
  });
};
