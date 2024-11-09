import { Router } from "express";
import { consultarEmpleado } from "../controllers/consultarCedulaEmpleado.controllers.js";

const router = Router();

// Ruta para consultar empleado por cédula (manejo de POST)
router.post("/empleado", consultarEmpleado);

export default router;
