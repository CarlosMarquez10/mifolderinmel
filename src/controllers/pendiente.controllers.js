import pool from "../model/conexionDb.js";

// Función que consulta la información de empleados pendientes
export const empleadosPendientes = async (req, res) => {
  try {
    // Consulta los empleados que están pendientes, incluyendo EstadoInfo y EstadoAnexos
    const [rows] = await pool.query(
      `SELECT e.*, d.EstadoInfo, d.EstadoAnexos
       FROM empleados e
       LEFT JOIN documentos_empleados d ON e.num_cedula = d.cedula
       WHERE IFNULL(d.EstadoInfo, '') != 'completado' OR IFNULL(d.EstadoAnexos, '') != 'completado'`
    );

    const empleadosPendientes = rows;

    // Agrupar empleados por proyecto_sede
    const empleadosPorProyecto = {};

    empleadosPendientes.forEach(empleado => {
      const proyecto = empleado.proyecto_sede || 'Pendiente';
      if (!empleadosPorProyecto[proyecto]) {
        empleadosPorProyecto[proyecto] = [];
      }
      empleadosPorProyecto[proyecto].push(empleado);
    });

    // Envía la información a la vista
    res.render('pendientes', {
      title: 'Empleados Pendientes',
      empleadosPorProyecto: empleadosPorProyecto
    });

  } catch (e) {
    console.error('Error en la consulta de empleados pendientes', e);
    res.status(500).send('Error en la consulta de empleados pendientes');
  }
};
