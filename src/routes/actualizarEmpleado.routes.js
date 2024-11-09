import { Router } from "express";
import { actualizarEmpleado } from "../controllers/actualizarEmpleado.controllers.js"; // Importar la función del controlador

const router = Router();

// Definir la ruta y asignar la función del controlador
router.post('/info', actualizarEmpleado);

export default router;
