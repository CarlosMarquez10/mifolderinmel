// src/services/excelService.js

import ExcelJS from 'exceljs';

export const crearExcel = async (data) => {
  // Crear un nuevo libro de trabajo
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Empleados_Pendientes');

  // Definir las columnas
  worksheet.columns = [
    { header: 'Cédula', key: 'num_cedula', width: 15 },
    { header: 'Nombres', key: 'nombres', width: 25 },
    { header: 'Apellidos', key: 'apellidos', width: 25 },
    { header: 'Proyecto/Sede', key: 'proyecto_sede', width: 20 },
    // Agrega más columnas según tus necesidades
    { header: 'Estado Info', key: 'EstadoInfo', width: 15 },
    { header: 'Estado Anexos', key: 'EstadoAnexos', width: 15 },
  ];

  // Agregar las filas de datos
  data.forEach((empleado) => {
    worksheet.addRow({
      num_cedula: empleado.num_cedula,
      nombres: empleado.nombres || empleado.nombre, // Ajusta según tus campos
      apellidos: empleado.apellidos || empleado.apellido, // Ajusta según tus campos
      proyecto_sede: empleado.proyecto_sede,
      EstadoInfo: empleado.EstadoInfo || 'Pendiente',
      EstadoAnexos: empleado.EstadoAnexos || 'Pendiente',
      // Agrega más campos si es necesario
    });
  });

  // Opcional: Aplicar estilos
  worksheet.getRow(1).font = { bold: true };

  return workbook;
};


export const crearExcelDb = async (data) => {
  // Crear un nuevo libro de trabajo
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Empleados_Database');

  // Definir las columnas
  worksheet.columns = [
    { header: 'Cédula', key: 'num_cedula', width: 20 },
    { header: 'Proyecto sede', key: 'proyecto_sede', width: 20 },
    { header: 'Nombres', key: 'nombres', width: 20 },
    { header: 'Apellidos', key: 'apellidos', width: 20 },
    { header: 'Eps', key: 'eps', width: 20 },
    { header: 'Fondo pension', key: 'fondo_pension', width: 20 },
    { header: 'Licencia', key: 'licencia', width: 20 },
    { header: 'Categoria licencia', key: 'categoria_licencia', width: 20 },
    { header: 'Num licencia conduccion', key: 'num_licencia_conduccion', width: 20 },
    { header: 'Direccion empleado', key: 'direccion_empleado', width: 20 },
    { header: 'Barrio sector', key: 'barrio_sector', width: 20 },
    { header: 'Ciudad municipio', key: 'ciudad_municipio', width: 20 },
    { header: 'Telefono personal', key: 'telefono_personal', width: 20 },
    { header: 'Celular personal', key: 'celular_personal', width: 20 },
    { header: 'Fecha nacimiento', key: 'fecha_nacimiento', width: 20 },
    { header: 'Lugar nacimiento', key: 'lugar_nacimiento', width: 20 },
    { header: 'Rh', key: 'rh', width: 20 },
    { header: 'Num hijos', key: 'num_hijos', width: 20 },
    { header: 'Estado civil', key: 'estado_civil', width: 20 },
    { header: 'Nivel escolaridad', key: 'nivel_escolaridad', width: 20 },
    { header: 'Nombre titulo aprobado', key: 'nombre_titulo_aprobado', width: 20 },
    { header: 'Num matricula profesional', key: 'num_matricula_profesional', width: 20 },
    { header: 'Talla camisa', key: 'talla_camisa', width: 20 },
    { header: 'Talla pantalon', key: 'talla_pantalon', width: 20 },
    { header: 'Talla zapatos', key: 'talla_zapatos', width: 20 },
    { header: 'Nombre conyuge', key: 'nombre_conyuge', width: 20 },
    { header: 'Num cedula conyuge', key: 'num_cedula_conyuge', width: 20 },
    { header: 'Fecha nacimiento conyuge', key: 'fecha_nacimiento_conyuge', width: 20 },
    { header: 'Conte', key: 'conte', width: 20 },
    { header: 'Email', key: 'email', width: 20 },
    { header: 'Es papa si no', key: 'es_papa_si_no', width: 20 },
    { header: 'Cedula', key: 'cedula', width: 20 },
    { header: 'Fecha registro', key: 'fecha_registro', width: 20 },
    { header: 'Certificado eps', key: 'certificado_eps', width: 20 },
    { header: 'Certificado afp', key: 'certificado_afp', width: 20 },
    { header: 'Certificados estudio', key: 'certificados_estudio', width: 20 },
    { header: 'Tarjeta conte', key: 'tarjeta_conte', width: 20 },
    { header: 'Certificacion Diploma Bachiller', key: 'certificado_diploma_bachiller', width: 20 },
    { header: 'Certificacion Titulo Profesional', key: 'certificado_titulo_profesional', width: 20 },
    { header: 'Hoja vida', key: 'hoja_vida', width: 20 },
    { header: 'Cedula empleado', key: 'cedula_empleado', width: 20 },
    { header: 'Matricula profesional', key: 'matricula_profesional', width: 20 },
    { header: 'Carne vacunacion', key: 'carne_vacunacion', width: 20 },
    { header: 'Antecedentes judiciales', key: 'antecedentes_judiciales', width: 20 },
    { header: 'Contraloria', key: 'contraloria', width: 20 },
    { header: 'Policia', key: 'policia', width: 20 },
    { header: 'Procuraduria', key: 'procuraduria', width: 20 },
    { header: 'Certificacion manejo defensivo', key: 'certificacion_manejo_defensivo', width: 20 },
    { header: 'Formacion primeros auxilios', key: 'formacion_primeros_auxilios', width: 20 },
    { header: 'Carne vacunacion covid', key: 'carne_vacunacion_covid', width: 20 },
    { header: 'Rut actividad economica 0010', key: 'rut_actividad_economica_0010', width: 20 },
    { header: 'Foto perfil', key: 'foto_perfil', width: 20 },
    { header: 'Estadoinfo', key: 'EstadoInfo', width: 20 },
    { header: 'Estadoanexos', key: 'EstadoAnexos', width: 20 }
];


  // Agregar las filas de datos
  data.forEach((empleado) => {
    worksheet.addRow({
      num_cedula: empleado.num_cedula || "",
      proyecto_sede: empleado.proyecto_sede || "",
      nombres: empleado.nombres || "",
      apellidos: empleado.apellidos || "",
      eps: empleado.eps || "",
      fondo_pension: empleado.fondo_pension || "",
      licencia: empleado.licencia || "",
      categoria_licencia: empleado.categoria_licencia || "",
      num_licencia_conduccion: empleado.num_licencia_conduccion || "",
      direccion_empleado: empleado.direccion_empleado || "",
      barrio_sector: empleado.barrio_sector || "",
      ciudad_municipio: empleado.ciudad_municipio || "",
      telefono_personal: empleado.telefono_personal || "",
      celular_personal: empleado.celular_personal || "",
      fecha_nacimiento: empleado.fecha_nacimiento || "",
      lugar_nacimiento: empleado.lugar_nacimiento || "",
      rh: empleado.rh || "",
      num_hijos: empleado.num_hijos || "",
      estado_civil: empleado.estado_civil || "",
      nivel_escolaridad: empleado.nivel_escolaridad || "",
      nombre_titulo_aprobado: empleado.nombre_titulo_aprobado || "",
      num_matricula_profesional: empleado.num_matricula_profesional || "",
      talla_camisa: empleado.talla_camisa || "",
      talla_pantalon: empleado.talla_pantalon || "",
      talla_zapatos: empleado.talla_zapatos || "",
      nombre_conyuge: empleado.nombre_conyuge || "",
      num_cedula_conyuge: empleado.num_cedula_conyuge || "",
      fecha_nacimiento_conyuge: empleado.fecha_nacimiento_conyuge || "",
      conte: empleado.conte || "",
      email: empleado.email || "",
      es_papa_si_no: empleado.es_papa_si_no || "",
      cedula: empleado.cedula || "",
      fecha_registro: empleado.fecha_registro || "",
      certificado_eps: empleado.certificado_eps || "",
      certificado_afp: empleado.certificado_afp || "",
      certificado_diploma_bachiller: empleado.certificado_diploma_bachiller || "",
      certificado_titulo_profesional: empleado.certificado_titulo_profesional || "",
      tarjeta_conte: empleado.tarjeta_conte || "",
      certificacion_laboral: empleado.certificacion_laboral || "",
      hoja_vida: empleado.hoja_vida || "",
      cedula_empleado: empleado.cedula_empleado || "",
      matricula_profesional: empleado.matricula_profesional || "",
      carne_vacunacion: empleado.carne_vacunacion || "",
      antecedentes_judiciales: empleado.antecedentes_judiciales || "",
      contraloria: empleado.contraloria || "",
      policia: empleado.policia || "",
      procuraduria: empleado.procuraduria || "",
      certificacion_manejo_defensivo: empleado.certificacion_manejo_defensivo || "",
      formacion_primeros_auxilios: empleado.formacion_primeros_auxilios || "",
      carne_vacunacion_covid: empleado.carne_vacunacion_covid || "",
      rut_actividad_economica_0010: empleado.rut_actividad_economica_0010 || "",
      foto_perfil: empleado.foto_perfil || "",
      EstadoInfo: empleado.EstadoInfo || "",
      EstadoAnexos: empleado.EstadoAnexos || ""
});

  });

  // Opcional: Aplicar estilos
  worksheet.getRow(1).font = { bold: true };

  return workbook;
};
