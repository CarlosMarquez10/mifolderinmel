import pool from "../model/conexionDb.js";

export const consultarEmpleado = async (req, res) => {
    try {
        const num_cedula = req.body.num_cedula; // Cédula ingresada por el usuario

        // Consulta para verificar si la cédula existe en la tabla documentos_empleados
        const [rows] = await pool.query("SELECT * FROM documentos_empleados WHERE cedula = ?", [num_cedula]);

        if (rows.length === 0) {
            // La cédula no se encontró en la base de datos
            return res.render("modalvalidacionRegistro", {
                title: "Cédula no encontrada",
                modalMessage: "La cédula no existe, comuníquese con el CGO.",
                showCloseButton: true,
                showMenuButton: false
            });
        }

        // Almacena la cédula en la sesión
        req.session.num_cedula = num_cedula;

        // Inicializa Estado en 0
        let Estado = 0;

        // Continúa con la lógica existente...
        const empleado = rows[0];
        if (empleado.EstadoInfo === "completado" && empleado.EstadoAnexos === "completado") {
            // Ambos estados están completados
            Estado = 0; // Ninguna opción habilitada
            // Mostrar modal informando que ya se realizó lo solicitado
            return res.render("modalvalidacionRegistro", {
                title: "Formulario de Registro",
                empleados: rows,
                modalMessage: "Ya ha realizado todo lo solicitado por la empresa.",
                showCloseButton: true,
                showMenuButton: false
            });
        } else {
            // Mostrar modal informando qué falta por completar
            let modalMessage = "Falta completar: ";
            if (empleado.EstadoInfo !== "completado") {
                modalMessage += "la actualización de la información. ";
                Estado += 1; // Sumar 1 si EstadoInfo no está completado
            }
            if (empleado.EstadoAnexos !== "completado") {
                modalMessage += "la carga de archivos solicitados.";
                Estado += 2; // Sumar 2 si EstadoAnexos no está completado
            }

            // Almacenar Estado en la sesión
            req.session.Estado = Estado;

            return res.render("modalvalidacionRegistro", {
                title: "Formulario de Registro",
                empleados: rows,
                modalMessage,
                showCloseButton: false,
                showMenuButton: true
            });
        }
    } catch (error) {
        console.error("Error conectando a la base de datos:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ message: "Hay un error", error: error.message });
        }
    }
};



