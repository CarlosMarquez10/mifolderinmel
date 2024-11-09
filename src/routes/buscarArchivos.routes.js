// src/routes/buscarArchivos.routes.js

import { Router } from 'express';
import { mostrarFormulario, mostrarArchivos } from '../controllers/buscarArchivos.controller.js';

const router = Router();

// Ruta para mostrar el formulario
router.get('/buscar', mostrarFormulario);

// Ruta para procesar el formulario y mostrar archivos
router.post('/mostrar', mostrarArchivos);

export default router;
