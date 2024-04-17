const db = require("../util/db/db");

module.exports = class Rol {
    constructor(miNombre, miDescripcionRol) {
        this.nombre = miNombre;
        this.descripcionRol = miDescripcionRol;
    }

    static fetchAll() {
        return db.execute("SELECT * FROM rol WHERE FechaHoraEliminado IS NULL");
    }

    static fetchRolById(id) {
        return db.execute(
            "SELECT * FROM rol WHERE IDRol = ? AND FechaHoraEliminado IS NULL",
            [id]
        );
    }

    static updateRolById(id, nombre, descripcion) {
        return db.execute(
            "UPDATE rol SET Nombre = ?, DescripcionRol = ? WHERE IDRol = ?",
            [nombre, descripcion, id]
        );
    }

    static deleteRolById(IDRol, IDUsuario) {
        let query1 = db.execute(
            "UPDATE rol SET FechaHoraEliminado = CURRENT_TIMESTAMP WHERE IDRol = ?",
            [IDRol]
        );
        let query2 = db.execute(
            "UPDATE usuario_rol SET FechaHoraFin = CURRENT_TIMESTAMP WHERE IDRol = ?",
            [IDRol]
        );

        return Promise.all([query1, query2]);
    }
};
