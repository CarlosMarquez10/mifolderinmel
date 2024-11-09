// src/routes/anexos.routes.js

import { Router } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../model/conexionDb.js"; // Asegúrate de importar el pool correctamente
import { buscaEnlace } from "../services/buscarEnlaces.js";
import { checkRequiredDocuments } from '../middleware/checkRequiredDocuments.js';

// Configuración necesaria si usas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configurar el almacenamiento para multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const num_cedula = req.session.num_cedula;

    // Validar que num_cedula es válido
    if (!/^\d+$/.test(num_cedula)) {
      return cb(new Error("Número de cédula inválido"));
    }

    const registrosPath = path.join(__dirname, "..", "Registros", num_cedula);

    try {
      // Asegurarse de que la carpeta existe
      await fs.mkdir(registrosPath, { recursive: true });
      cb(null, registrosPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const num_cedula = req.session.num_cedula;
    const tipoArchivo = req.params.tipoArchivo;

    const codigosArchivo = {
      foto_perfil: "2000",
      certificado_eps: "1",
      certificado_afp: "2",
      certificado_diploma_bachiller: "3_1",
      certificado_titulo_profesional: "3_2",
      tarjeta_conte: "5",
      certificacion_laboral: "8",
      hoja_vida: "13",
      cedula_empleado: "16",
      matricula_profesional: "21",
      carne_vacunacion: "28",
      antecedentes_judiciales: "36",
      contraloria: "36_1",
      policia: "36_2",
      procuraduria: "36_3",
      certificacion_manejo_defensivo: "92",
      formacion_primeros_auxilios: "96",
      carne_vacunacion_covid: "1102",
      rut_actividad_economica_0010: "1109",
    };

    const codigo = codigosArchivo[tipoArchivo] || "9999";
    const extension = path.extname(file.originalname);

    cb(null, `${num_cedula}_${codigo}${extension}`);
  },
});

// Crear una instancia de multer
const upload = multer({ storage: storage });

// Ruta para mostrar la página de anexos
router.get("/", async (req, res) => {
  try {
    const num_cedula = req.session.num_cedula;
    const EstadoEmpleado = req.session.Estado;

    if (!num_cedula) {
      return res.redirect("/");
    }

    // Validar que num_cedula contiene sólo dígitos
    if (!/^\d+$/.test(num_cedula)) {
      return res.status(400).send("Número de cédula inválido");
    }

    // Verifica si el usuario tiene permitido acceder a esta ruta
    if (!(EstadoEmpleado & 2)) {
      return res
        .status(403)
        .send("No tiene permiso para acceder a esta página.");
    }

    // Ruta de la carpeta donde se guardarán los registros
    const registrosPath = path.join(__dirname, "..", "Registros");

    // Ruta de la carpeta específica del usuario
    const usuarioPath = path.join(registrosPath, num_cedula);

    // Verificar si la carpeta del usuario existe
    try {
      await fs.access(usuarioPath);
      // La carpeta existe
    } catch (error) {
      // La carpeta no existe, crearla
      await fs.mkdir(usuarioPath, { recursive: true });
    }

    // Obtener el estado de los archivos desde la base de datos
    const [rows] = await pool.query(
      "SELECT * FROM documentos_empleados WHERE cedula = ?",
      [num_cedula]
    );

    const documentos = rows[0]; // Suponiendo que siempre habrá un registro para la cédula

    // Obtener los enlaces de EPS y AFP
    const enlaces = (await buscaEnlace(num_cedula)) || { EPS: "#", AFP: "#" };

    // Obtener el mensaje de éxito o error de la consulta (si existe)
    const { mensaje } = req.query;

    // Renderizar la vista y pasar los documentos
    res.render("anexos", {
      title: "Cargar Documentos",
      num_cedula,
      documentos,
      mensaje,
      enlaces,
      missingDocumentsNames: [],
    });
  } catch (error) {
    console.error("Error al acceder a la ruta /anexos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta para cargar un archivo específico
router.post(
  "/upload/:tipoArchivo",
  upload.single("archivo"),
  async (req, res) => {
    try {
      const num_cedula = req.session.num_cedula;
      const tipoArchivo = req.params.tipoArchivo; // e.g., 'foto_perfil'

      // Lista de tipos de archivos permitidos
      const tiposPermitidos = [
        "foto_perfil",
        "certificado_eps",
        "certificado_afp",
        "certificado_diploma_bachiller",
        "certificado_titulo_profesional",
        "tarjeta_conte",
        "certificacion_laboral",
        "hoja_vida",
        "cedula_empleado",
        "matricula_profesional",
        "carne_vacunacion",
        "antecedentes_judiciales",
        "contraloria",
        "policia",
        "procuraduria",
        "certificacion_manejo_defensivo",
        "formacion_primeros_auxilios",
        "carne_vacunacion_covid",
        "rut_actividad_economica_0010",
      ];

      if (!tiposPermitidos.includes(tipoArchivo)) {
        return res.status(400).send("Tipo de archivo no permitido");
      }

      // Actualizar el campo correspondiente en la base de datos
      const campoBD = tipoArchivo; // Suponiendo que el nombre del campo en la BD es el mismo
      await pool.query(
        `UPDATE documentos_empleados SET ${campoBD} = 'SI' WHERE cedula = ?`,
        [num_cedula]
      );

      // Redirigir al usuario de vuelta a la página de anexos con un mensaje de éxito
      res.redirect("/anexos?mensaje=Archivo subido exitosamente");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      // Redirigir al usuario de vuelta a la página de anexos con un mensaje de error
      res.redirect("/anexos?mensaje=Error al subir el archivo");
    }
  }
);

// Ruta para finalizar y actualizar EstadoAnexos
router.post("/finalizar", checkRequiredDocuments, async (req, res) => {
  try {
    const num_cedula = req.session.num_cedula;

    // Actualizar EstadoAnexos en la base de datos
    await pool.query(
      "UPDATE documentos_empleados SET EstadoAnexos = ? WHERE cedula = ?",
      ["completado", num_cedula]
    );

    // Actualizar EstadoEmpleado en la sesión
    req.session.Estado = req.session.Estado & ~2; // Desactivar el bit correspondiente a EstadoAnexos

    res.redirect("/menu"); // Redirigir al menú o a la página deseada
  } catch (error) {
    console.error("Error al actualizar EstadoAnexos:", error);
    res.status(500).send("Error al actualizar EstadoAnexos");
  }
});

export default router;
