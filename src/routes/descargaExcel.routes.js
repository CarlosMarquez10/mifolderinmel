// src/routes/descargaExcel.routes.js

import { Router } from "express";
import { generarExcel } from "../controllers/descargarExcel.controllers.js";

const router = Router();

// Ruta para generar y descargar el Excel
router.get("/ExcelPte", generarExcel);


export default router;