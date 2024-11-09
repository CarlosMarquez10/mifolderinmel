// importar el paquete mysql2/promise
import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const connectionConfig = {
    host: 'localhost', // Cambia esto por tu host de la base de datos
    user: 'mifolderinmel', // Cambia esto por tu usuario de la base de datos
    password: 'mifolder.2024', // Cambia esto por tu contraseña de la base de datos
    database: 'mifolder', // Cambia esto por tu base de datos
};

// Función para insertar los números de cédula en la tabla documentos_empleados
const insertCedulas = async () => {
    try {
        // Conectar a la base de datos
        const connection = await mysql.createConnection(connectionConfig);

        // Leer los números de cédula de la tabla empleados
        const [rows] = await connection.execute('SELECT num_cedula FROM empleados');

        // Mostrar cuántas cédulas se encontraron
        console.log(`Se encontraron ${rows.length} cédulas en la tabla empleados.`);

        // Insertar cada cédula en la tabla documentos_empleados
        for (const row of rows) {
            const cedula = row.num_cedula;

            // Intentar insertar la cédula
            try {
                const query = `
                    INSERT INTO documentos_empleados (cedula)
                    VALUES (?)
                `;

                await connection.execute(query, [cedula]);

                console.log(`Cédula ${cedula} insertada en documentos_empleados.`);
            } catch (insertError) {
                // Si ocurre un error, verificar si es por entrada duplicada
                if (insertError.code === 'ER_DUP_ENTRY') {
                    console.log(`La cédula ${cedula} ya existe en documentos_empleados. Se omitirá.`);
                } else {
                    console.error(`Error al insertar la cédula ${cedula}:`, insertError.message);
                }
            }
        }

        console.log('Proceso completado.');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar o procesar los datos:', error.message);
    }
};

insertCedulas();
