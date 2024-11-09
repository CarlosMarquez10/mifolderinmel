// app.js

import express from "express";
import session from 'express-session';
import path from "path";
import { fileURLToPath } from "url";
import { Port } from "./config/env.js";
import { buscarUsuarioPorCedula } from "./services/NombresEmpleados.js";
import inicioRoutes from "./routes/inicio.routes.js";
import formulario from "./routes/formulario.routes.js";
import actualizarEmpleado from "./routes/actualizarEmpleado.routes.js";
import consultarCedula from "./routes/consultarCedulaEmpleado.routes.js";
import anexosRoutes from "./routes/anexos.routes.js"; // Importar las rutas de anexos
import datosPendiente  from "./routes/pendientes.routes.js";
import descargasExelPte from "./routes/descargaExcel.routes.js"
import descargasExelData from "./routes/ExcelData.routes.js"
import descargasCarpeta from "./routes/carpeta.routes.js"
import descargaFormatoRoutes from "./routes/descargaFormato.routes.js";
import buscarArchivosRoutes from "./routes/buscarArchivos.routes.js";
import archivosRoutes from "./routes/archivos.routes.js";
import archivosData from "./routes/mostrardato.routes.js";
import descargaInstructivo from "./routes/descargaInstructivo.routes.js";



const app = express();

// Configuración del middleware de sesión
app.use(session({
  secret: 'mifolderInmel.2024',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configuración necesaria si usas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar ejs como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Usar las rutas de inicio
app.use("/", inicioRoutes);
// Ruta de formulario
app.use("/formulario", formulario);
app.use("/actualizar", actualizarEmpleado);
app.use("/consultar", consultarCedula);
app.use("/anexos", anexosRoutes); // Usar las rutas de anexos
app.use('/pendientes', datosPendiente); // esta ruta devolvera la consulta de la tabla decumentos_empleados y el cruce de de la tabla de empleados
app.use('/descarga', descargasExelPte);
app.use('/descarga', descargasExelData);
app.use('/descarga', descargasCarpeta);
app.use('/descargas', descargaFormatoRoutes);
app.use('/descarga', descargaInstructivo);
app.use("/empleado", buscarArchivosRoutes);
app.use("/archivos", archivosData);
app.use('/archivos', archivosRoutes);

app.get('/menu', async (req, res) => {
  const num_cedula = req.session.num_cedula;
  const EstadoEmpleado = req.session.Estado;
  const operario = await buscarUsuarioPorCedula(num_cedula);
  
  if (!num_cedula) {
    return res.redirect('/');
  }

  res.render("menu", {
    title: "Menú",
    num_cedula: num_cedula,
    EstadoEmpleado: EstadoEmpleado,
    operarioDato: operario
  });
});


app.listen(Port, () => {
  console.log(`Server listening on port ${Port}`);
});
