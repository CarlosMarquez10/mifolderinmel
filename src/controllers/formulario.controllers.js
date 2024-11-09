import pool from "../model/conexionDb.js";

export const RegistroNuevo = async (req, res) => {
  try {
    const num_cedula = req.session.num_cedula;
    const EstadoEmpleado = req.session.Estado;

    if (!num_cedula) {
        return res.redirect('/');
    }

    // Verifica si el usuario tiene permitido acceder a esta ruta
    if (!(EstadoEmpleado & 1)) {
        // Si no tiene permiso, redirige o muestra un mensaje de error
        return res.status(403).send('No tiene permiso para acceder a esta página.');
    }

    const [rows] = await pool.query("SELECT * FROM empleados WHERE num_cedula = ?", [num_cedula]);

    res.render("formulario", { title: "Formulario de Registro", empleados: rows });
  } catch (error) {
      console.error("Error connecting to the database:", error.message);
      if (!res.headersSent) {
          res.status(500).json({ message: "Hay un error", error: error.message });
      }
  }
};

