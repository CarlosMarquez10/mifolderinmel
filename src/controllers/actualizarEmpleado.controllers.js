import pool from "../model/conexionDb.js";

export const actualizarEmpleado = async (req, res) => {
  let connection;

  try {
    // Obtener una conexión del pool
    connection = await pool.getConnection();

    // Iniciar la transacción
    await connection.beginTransaction();

    // Obtener el número de cédula de la sesión
    const num_cedula = req.session.num_cedula;

    if (!num_cedula) {
      return res.status(400).send('Número de cédula no disponible en la sesión');
    }

    // Obtener los datos del formulario
    const {
      proyecto_sede,
      nombres,
      apellidos,
      eps,
      fondo_pension,
      licencia,
      categoria_licencia,
      num_licencia_conduccion,
      direccion_empleado,
      barrio_sector,
      ciudad_municipio,
      telefono_personal,
      celular_personal,
      fecha_nacimiento,
      lugar_nacimiento,
      rh,
      num_hijos,
      estado_civil,
      nivel_escolaridad,
      nombre_titulo_aprobado,
      num_matricula_profesional,
      talla_camisa,
      talla_pantalon,
      talla_zapatos,
      nombre_conyuge,
      num_cedula_conyuge,
      fecha_nacimiento_conyuge,
      conte,
      email,
      es_papa_si_no,
    } = req.body;

    // Actualizar la tabla 'empleados'
    const updateEmpleadoQuery = `
      UPDATE empleados 
      SET 
        proyecto_sede = ?, 
        nombres = ?, 
        apellidos = ?, 
        eps = ?, 
        fondo_pension = ?, 
        licencia = ?, 
        categoria_licencia = ?, 
        num_licencia_conduccion = ?, 
        direccion_empleado = ?, 
        barrio_sector = ?, 
        ciudad_municipio = ?, 
        telefono_personal = ?, 
        celular_personal = ?, 
        fecha_nacimiento = ?, 
        lugar_nacimiento = ?, 
        rh = ?, 
        num_hijos = ?, 
        estado_civil = ?, 
        nivel_escolaridad = ?, 
        nombre_titulo_aprobado = ?, 
        num_matricula_profesional = ?, 
        talla_camisa = ?, 
        talla_pantalon = ?, 
        talla_zapatos = ?, 
        nombre_conyuge = ?, 
        num_cedula_conyuge = ?, 
        fecha_nacimiento_conyuge = ?, 
        conte = ?, 
        email = ?, 
        es_papa_si_no = ?
      WHERE num_cedula = ?
    `;

    const empleadoValues = [
      proyecto_sede,
      nombres,
      apellidos,
      eps,
      fondo_pension,
      licencia,
      categoria_licencia,
      num_licencia_conduccion,
      direccion_empleado,
      barrio_sector,
      ciudad_municipio,
      telefono_personal,
      celular_personal,
      fecha_nacimiento,
      lugar_nacimiento,
      rh,
      num_hijos,
      estado_civil,
      nivel_escolaridad,
      nombre_titulo_aprobado,
      num_matricula_profesional,
      talla_camisa,
      talla_pantalon,
      talla_zapatos,
      nombre_conyuge,
      num_cedula_conyuge,
      fecha_nacimiento_conyuge,
      conte,
      email,
      es_papa_si_no,
      num_cedula
    ];

    await connection.query(updateEmpleadoQuery, empleadoValues);

    // Actualizar 'EstadoInfo' en la tabla 'documentos_empleados'
    const updateEstadoInfoQuery = `
      UPDATE documentos_empleados
      SET EstadoInfo = 'completado'
      WHERE cedula = ?
    `;

    await connection.query(updateEstadoInfoQuery, [num_cedula]);

    // Confirmar la transacción
    await connection.commit();

    // Actualizar 'EstadoEmpleado' en la sesión si es necesario
    req.session.Estado = req.session.Estado & ~1; // Desactivar el bit correspondiente a EstadoInfo

    // Redirigir después de actualizar
    res.redirect('/menu');
  } catch (error) {
    if (connection) {
      // Revertir la transacción en caso de error
      await connection.rollback();
    }
    console.error("Error al actualizar la información:", error.message);
    res.status(500).json({
      message: "Error al actualizar la información",
      error: error.message,
    });
  } finally {
    if (connection) {
      // Liberar la conexión
      connection.release();
    }
  }
};
