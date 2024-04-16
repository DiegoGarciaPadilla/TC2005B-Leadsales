const db = require("../util/db/db");

module.exports = class Lead {
    constructor(Uname, Utel) {
        this.name = Uname;
        this.tel = Utel;
    }

    save() {}

    static fetchAll() {
        return db.execute(
            "SELECT * FROM `Lead` WHERE FechaHoraEliminado IS NULL"
        );
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

  static fetchAllForGraphs(start, end) {

    if (start && end) {
      let query = "SELECT * FROM `Lead` WHERE FechaHoraEliminado IS NULL AND Creado BETWEEN ";
      query += "'" + start + "' AND '" + end + "'";
      return query;
    } else {
      let query = "SELECT * FROM `Lead` WHERE FechaHoraEliminado IS NULL";
      return query;
    }

  }

  static fetchSomeForGraphs(NombreCompleto, start, end) {

      let query = "SELECT * FROM `Lead` WHERE Asignadoa = "
      query += "'" + NombreCompleto + "'" + " AND FechaHoraEliminado IS NULL";
      if (start && end) {
        query += " AND Creado BETWEEN ";
        query += "'" + start + "' AND '" + end + "'";
        return query;
      } else {
        return query;
      }
   
  }

  static async graphOne(filter) {

    let query = "SELECT DATE_FORMAT(Creado, '%Y-%m-%d') AS `Fecha`, COUNT(*) AS `Leads` FROM ("
    query += filter +") AS `Leads` GROUP BY DATE_FORMAT(Creado, '%Y-%m-%d')";

    return db.execute(query);
  }


  static async graphTwo(filter) {
    
    let query = "SELECT YEAR(Creado) AS `Anio`, MONTH(Creado) AS `Mes`, COUNT(*) AS `NoLeads` FROM (";
    query += filter + ") AS `Leads` GROUP BY Anio, Mes";
    
    return db.execute(query);
  }
  
  static async graphThree(filter) {
    
    let query = "SELECT Asignadoa, COUNT(*) as `Leads por usuario` FROM (";
    query += filter + ") AS Leads GROUP BY Asignadoa HAVING COUNT(*) > 1";
    
    return db.execute(query);
  }
  
  static async graphFour(filter) {
    
    let query = "SELECT Status, COUNT(*) AS `Cantidad` FROM (";
    query += filter + ") AS Leads GROUP BY Status";
    
    return db.execute(query);
  }
  
  static async graphFive(filter) {
    
    let query = "SELECT Embudo, COUNT(*) AS `Cantidad` FROM (";
    query += filter + ") AS Leads GROUP BY Embudo";
    
    return db.execute(query);
  }

  static fetchOne(IDLead) {
      return db.execute("SELECT * FROM `lead` WHERE IDLead = ?", [IDLead]);
  }

  static createLead(lead) {
    return db.execute("INSERT INTO `Lead` (Nombre, Telefono, Embudo, Asignadoa, Creado, Horadecreacion, Archivado, CreadoManualmente) VALUES (?, ?, ?, ?, CURDATE(), CURTIME(), 'No', 'TRUE')", [lead.Nombre, lead.Telefono, lead.Embudo, lead.Asignadoa]);
  }
}
