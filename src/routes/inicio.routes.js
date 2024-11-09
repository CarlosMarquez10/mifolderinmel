import { Router } from "express";
import { getInicio } from "../controllers/inicio.controllers.js"; // Importar la función del controlador

const router = Router();

// Definir la ruta y asignar la función del controlador
router.get('/', getInicio);

export default router;

