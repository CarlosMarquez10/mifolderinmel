import { Router } from "express";
import { empleadosPendientes } from "../controllers/pendiente.controllers.js";
const router = Router();

// Ruta para la pagina de de pendientes por realizar los Registros y actualizacion.
router.get("/empleados", empleadosPendientes);

export default router;
