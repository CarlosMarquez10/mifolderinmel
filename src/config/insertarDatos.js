import mysql from 'mysql2/promise';
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { clearScreenDown } from 'readline';

// Configuración de la conexión a la base de datos
const connectionConfig = {
    host: 'localhost', // Cambia esto por tu host de la base de datos
    user: 'mifolderinmel', // Cambia esto por tu usuario de la base de datos
    password: 'mifolder.2024', // Cambia esto por tu contraseña de la base de datos
    database: 'mifolder', // Cambia esto por tu base de datos
};

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construye la ruta al archivo Excel
const excelFilePath = path.resolve(__dirname, 'BaseDatos_Empleados.xlsx');

// Función para leer el archivo Excel y cargar los datos en la base de datos
const insertDataFromExcel = async () => {
    try {
        const connection = await mysql.createConnection(connectionConfig);

        // Leer el archivo Excel
        const workbook = xlsx.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // console.log(sh)

// Insertar datos en la tabla
for (const row of sheetData) {
    const query = `
        INSERT INTO empleados (
            proyecto_sede, num_cedula, nombres, apellidos, eps, fondo_pension, licencia, categoria_licencia, num_licencia_conduccion,
            direccion_empleado, barrio_sector, ciudad_municipio, telefono_personal, celular_personal, fecha_nacimiento, lugar_nacimiento,
            rh, num_hijos, estado_civil, nivel_escolaridad, nombre_titulo_aprobado, num_matricula_profesional, talla_camisa, talla_pantalon,
            talla_zapatos, nombre_conyuge, num_cedula_conyuge, fecha_nacimiento_conyuge, conte, email, es_papa_si_no
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        row['Proyecto/Sede'] || null, 
        row['N° de cédula'] || null, 
        row['Nombres'] || null, 
        row['Apellidos'] || null, 
        row['EPS'] || null, 
        row['Fondo Pensión'] || null, 
        row['Licencia'] || null, 
        row['categoria Licencia'] || null, 
        row['Nº Licencia conducción'] || null,
        row['Dirección  del empleado'] || null, 
        row['Barrio ó sector'] || null, 
        row['Ciudad / Municipio'] || null, 
        row['Teléfono personal'] || null, 
        row['Celularpersonal'] || null, 
        row['Fecha de nacimiento'] || null, 
        row['Lugar de nacimiento'] || null,
        row['RH'] || null, 
        row['N° de hijos'] || null, 
        row['Estado civil'] || null, 
        row['Nivel de escolaridad'] || null, 
        row['Nombre del título aprobado'] || null, 
        row['N° matrícula profesional'] || null, 
        row['Talla Camisa '] || null, 
        row['Talla Pantalón '] || null,
        row['Talla zapatos'] || null, 
        row['Nombre del cónyuge'] || null, 
        row['N° de cédula del cónyuge'] || null, 
        row['Fecha de nacimiento del cónyuge'] || null, 
        row['CONTE'] || null, 
        row['EMAIL'] || null, 
        row['Es Papà SI o NO'] || null
    ];

    await connection.execute(query, values);
}

        console.log('Datos insertados correctamente.');
        await connection.end();
    } catch (error) {
        console.error('Error al insertar los datos:', error.message);
    }
};

insertDataFromExcel();
