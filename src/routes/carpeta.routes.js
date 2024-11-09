import { Router } from "express";
import { descargarCarpetaEmpleado } from "../controllers/decargarCarpeta.controllers.js";

const router = new Router();

router.get("/Carpeta", descargarCarpetaEmpleado);

export default router;
