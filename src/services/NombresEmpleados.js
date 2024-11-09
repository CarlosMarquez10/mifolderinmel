import pool from '../model/conexionDb.js'

// buscard con el nuemro de usuario que se va a pasar por parametro a la funcion en la base de datos

export const buscarUsuarioPorCedula = async (cedula) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleados WHERE num_cedula = ?', [cedula])
    return rows[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

