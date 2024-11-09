// src/routes/descargaExcel.routes.js

import { Router } from "express";
import { generarExcelDb } from "../controllers/ExcelData.controllers.js";

const router = Router();

// Ruta para generar y descargar el Excel
router.get("/ExcelData", generarExcelDb);


export default router;