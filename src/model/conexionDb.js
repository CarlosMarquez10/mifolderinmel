import mysql from "mysql2/promise"; // Asegúrate de usar la versión de promesas para usar async/await

// Importar variables de entorno
import { da_port, host, User, Password, nameDatabase } from "../config/env.js";

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: host,
    user: User,
    password: Password,
    port: da_port,
    database: nameDatabase,
    waitForConnections: true,
    connectionLimit: 50, // Puedes ajustar el límite según tus necesidades
    queueLimit: 0,
});

export default pool;
