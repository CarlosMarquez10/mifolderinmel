import { Router } from 'express';
import { mostrarArchivos } from '../controllers/buscarArchivos.controller.js';

const router = Router();


// Ruta para procesar el formulario y mostrar archivos
router.post('/mostrar', mostrarArchivos);

export default router;