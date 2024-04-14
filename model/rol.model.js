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
};
