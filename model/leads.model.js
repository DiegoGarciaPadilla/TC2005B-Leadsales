const db = require("../util/db/db");

module.exports = class Lead {
  constructor(
    miIDUsuario,
    miNombre,
    miTelefono,
    miCorreo,
    miCompania,
    miAsignado,
    miCreado,
    miHoraCreacion,
    miFechaPrimerMensaje,
    miHoraPrimerMensaje,
    miPrimerMensaje,
    miFechaUltMensaje,
    miHoraUltMensaje,
    miUltimoMensaje,
    miStatus,
    miEstado,
    miEmbudo,
    miEtapa,
    miArchivado,
    miCreadoManual
  ) {
    this.IDUsuario = miIDUsuario;
    this.Nombre = miNombre;
    this.Telefono = miTelefono;
    this.Correo = miCorreo;
    this.Compania = miCompania;
    this.Asignado = miAsignado;
    this.Creado = miCreado;
    this.HoraCreacion = miHoraCreacion;
    this.FechaPrimerMensaje = miFechaPrimerMensaje;
    this.HoraPrimerMensaje = miHoraPrimerMensaje;
    this.PrimerMensaje = miPrimerMensaje;
    this.FechaUltMensaje = miFechaUltMensaje;
    this.HoraUltMensaje = miHoraUltMensaje;
    this.UltimoMensaje = miUltimoMensaje;
    this.Status = miStatus;
    this.Estado = miEstado;
    this.Embudo = miEmbudo;
    this.Etapa = miEtapa;
    this.Archivado = miArchivado;
    this.CreadoManual = miCreadoManual;
    this.FechaHoraEliminado = "";
  }

  static fetchAll() {
    return db.execute("SELECT * FROM `Lead` WHERE FechaHoraEliminado IS NULL");
  }

  static async fetchLeadsByUser(correo) {
    // Primera consulta: obtener el nombre y apellido paterno basado en el correo
    const [rows] = await db.execute("SELECT CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto FROM `Usuario` WHERE Correo = ?", [correo]);
    console.log(rows[0].NombreCompleto);
  
    if (rows.length === 0) {
      // No se encontró ningún usuario con ese correo
      return [];
    }
  
    // Segunda consulta: obtener los leads donde Asignadoa es igual al nombre completo obtenido
    const nombreCompleto = rows[0].NombreCompleto;
    return db.execute("SELECT * FROM `Lead` WHERE Asignadoa = ? AND FechaHoraEliminado IS NULL", [nombreCompleto]);
  }

  static fetchOne(IDLead) {
    return db.execute("SELECT * FROM `Lead` WHERE IDLead = ?", [IDLead]);
  }
}
