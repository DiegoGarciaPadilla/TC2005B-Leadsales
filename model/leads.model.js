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
    return db.execute("SELECT * FROM Lead WHERE FechaHoraEliminado IS NULL");
  }

  static fetchLeadsByUser(nombre){
    return db.execute("SELECT * FROM Lead WHERE Asignado = ? AND FechaHoraEliminado IS NULL", [nombre]);
  }

  static fetchOne(IDLead) {
    return db.execute("SELECT * FROM Lead WHERE IDLead = ?", [IDLead]);
  }
}
