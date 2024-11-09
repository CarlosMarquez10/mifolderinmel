import { Router } from "express";
import { RegistroNuevo } from "../controllers/formulario.controllers.js";

const router = Router();

// Ruta para crear un nuevo registro pero para subir los anexos
router.get('/Registro', RegistroNuevo)

export default router;