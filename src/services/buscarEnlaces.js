import pool from "../model/conexionDb.js";

function dameElenlace(datoNombre) {
  const enlaces = [
    {
      nombre: "ASMET",
      url: "https://oficinavirtual.asmetsalud.com/#/ov/afiliados/consultar-estado-de-afiliacion",
    },
    {
      nombre: "ASMET SALUD EPS-S -ASOCIACIÓN MUTUAL LA ESPERANZA",
      url: "https://oficinavirtual.asmetsalud.com/#/ov/afiliados/consultar-estado-de-afiliacion",
    },
    { nombre: "COMFAORIENTE EPS", url: "https://epsonline.comfaoriente.com/" },
    {
      nombre: "COMPENSAR",
      url: "https://seguridad.compensar.com/views/index.html?serviceProviderName=WSFED-SP&response_type=code%20token&response_mode=form_post&_csrf=9c709436-5c38-401a-a2a6-8bb16911c739&protocol=OIDC",
    },
    {
      nombre: "COOSALUD EPS",
      url: "https://coosalud.com/estado-de-afiliacion/",
    },
    { nombre: "COOSALUD", url: "https://coosalud.com/estado-de-afiliacion/" },
    {
      nombre: "EPS SURAMERICANA S.A.",
      url: "https://www.epssura.com/afiliados",
    },
    {
      nombre: "NUEVA EPS",
      url: "https://portal.nuevaeps.com.co/Portal/home.jspx",
    },
    {
      nombre: "SALUD TOTAL",
      url: "https://transaccional.saludtotal.com.co/OficinaVirtual/#/",
    },
    {
      nombre: "SANITAS",
      url: "https://www.epssanitas.com/usuarios/web/nuevo-portal-eps/certificados-de-afiliacion?p_p_id=58&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_58_struts_action=%2Flogin%2Fopen_id#gsc.tab=0",
    },
    {
      nombre: "COLFONDOS",
      url: "https://www.colfondos.com.co/dxp/acceso-de-usuarios",
    },
    {
      nombre: "COLPENSIONES",
      url: "https://sede.colpensiones.gov.co/tramite/updInfo/2/",
    },
    {
      nombre: "PORVENIR",
      url: "https://www.porvenir.com.co/web/certificados-y-extractos/certificado-de-afiliacion",
    },
    {
      nombre: "PROTECCIÓN",
      url: "https://www.proteccion.com/portalafiliados/afiliados/certifacil#/certificados",
    },
    {
      nombre: "PROTECCION",
      url: "https://www.proteccion.com/portalafiliados/afiliados/certifacil#/certificados",
    },
    {
      nombre: "conte",
      url: "https://solicitudmatricula.conte.org.co:8080/consulta-matricula",
    },
    {
      nombre: "Contraloria",
      url: "https://www.contraloria.gov.co/web/guest/persona-natural",
    },
    {
      nombre: "Policia",
      url: "https://antecedentes.policia.gov.co:7005/WebJudicial/index.xhtml",
    },
    {
      nombre: "Procuraduría",
      url: "https://www.procuraduria.gov.co/Pages/Generacion-de-antecedentes.aspx",
    },
    { nombre: "Rut", url: "https://muisca.dian.gov.co/WebIdentidadLogin/" },
  ];

  const enlaceEncontrado = enlaces.find((enlace) =>
    enlace.nombre.toLowerCase().includes(datoNombre.toLowerCase())
  );

  return enlaceEncontrado ? enlaceEncontrado.url : null;
}

export const buscaEnlace = async (cedula) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM empleados WHERE num_cedula = ?",
        [cedula]
      );
  
      const datosEntidades = {
        EPS: dameElenlace(rows[0].eps),
        AFP: dameElenlace(rows[0].fondo_pension),
      };
  
      return datosEntidades;
    } catch (error) {
      console.error('Error en buscaEnlace:', error);
      return null;
    }
  };
  
