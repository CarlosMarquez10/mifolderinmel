// src/controllers/descargaExcel.controller.js

import pool from "../model/conexionDb.js";
import { crearExcel } from "../services/excelService.js";
import path from "path";

export const generarExcel = async (req, res) => {
  try {
    // Realizar la consulta a la base de datos
    const [rows] = await pool.query(
      `SELECT e.*, d.EstadoInfo, d.EstadoAnexos
       FROM empleados e
       LEFT JOIN documentos_empleados d ON e.num_cedula = d.cedula`
    );

    // Generar el archivo Excel con los datos
    const workbook = await crearExcel(rows);

    // Escribir el archivo en un buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Establecer las cabeceras para la descarga
    res.setHeader('Content-Disposition', 'attachment; filename="Empleados_Pendientes.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Enviar el buffer al cliente
    res.send(buffer);

  } catch (error) {
    console.error('Error al generar el archivo Excel:', error);
    res.status(500).json({ message: "Error al generar el archivo Excel" });
  }
};

