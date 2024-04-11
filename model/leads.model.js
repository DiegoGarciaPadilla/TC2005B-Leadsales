const db = require("../util/db/db");

module.exports = class Lead {

    constructor(Uname, Utel) {
        this.name = Uname;
        this.tel = Utel;
    }

    save() {

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
    return db.execute("SELECT * FROM `lead` WHERE IDLead = ?", [IDLead]);
  }
}
