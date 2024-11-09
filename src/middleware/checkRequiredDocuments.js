// src/middleware/checkRequiredDocuments.js

import pool from '../model/conexionDb.js';

export const checkRequiredDocuments = async (req, res, next) => {
  try {
    const num_cedula = req.session.num_cedula;

    if (!num_cedula) {
      return res.redirect('/');
    }

    // Lista de documentos requeridos y sus nombres amigables
    const requiredDocuments = [
      'foto_perfil',
      'certificado_eps',
      'certificado_afp',
      'certificado_diploma_bachiller',
      'certificacion_laboral',
      'hoja_vida',
      'cedula_empleado',
      'carne_vacunacion',
      'carne_vacunacion_covid',
      'contraloria',
      'policia',
      'procuraduria',
      'rut_actividad_economica_0010'
    ];

    const documentFriendlyNames = {
      'foto_perfil': 'Fotografía',
      'certificado_eps': 'Certificado de la EPS',
      'certificado_afp': 'Certificado de la AFP',
      'certificado_diploma_bachiller': 'Diploma de bachiller',
      'certificacion_laboral': 'Certificación laboral',
      'hoja_vida': 'Hoja de vida',
      'cedula_empleado': 'Cédula de empleado',
      'carne_vacunacion': 'Carné de vacunación',
      'carne_vacunacion_covid': 'Carné de vacunación COVID',
      'contraloria': 'Antecedentes Contraloría',
      'policia': 'Antecedentes Policía',
      'procuraduria': 'Antecedentes Procuraduría',
      'rut_actividad_economica_0010': 'RUT actividad económica 0010'
    };

    // Consulta a la base de datos
    const [rows] = await pool.query(
      'SELECT * FROM documentos_empleados WHERE cedula = ?',
      [num_cedula]
    );

    const documentos = rows[0];

    // Verificar documentos faltantes
    const missingDocuments = [];

    requiredDocuments.forEach(docKey => {
      if (!documentos[docKey] || documentos[docKey] !== 'SI') {
        missingDocuments.push(documentFriendlyNames[docKey]);
      }
    });

    if (missingDocuments.length > 0) {
      // Si faltan documentos, renderiza la vista con un mensaje
      res.render('anexos', {
        title: 'Cargar Documentos',
        num_cedula,
        documentos,
        mensaje: 'Por favor, cargue todos los documentos obligatorios.',
        missingDocumentsNames: missingDocuments,
        enlaces: {}, // Asegúrate de pasar los enlaces si los usas en la vista
      });
    } else {
      // Si todos los documentos están cargados, continúa
      next();
    }
  } catch (error) {
    console.error('Error en el middleware checkRequiredDocuments:', error);
    res.status(500).send('Error interno del servidor');
  }
};
