const db = require("../util/db/db");

module.exports = class Privilegio {

    constructor(miDescripcionPrivilegio) {
        this.descripcionPrivilegio = miDescripcionPrivilegio;
    }

    static fetchAll() {
        return db.execute("SELECT * FROM privilegios");
    }

    static fetchPrivilegioById(id) {
        return db.execute(
            "SELECT * FROM privilegios WHERE IDPrivilegio = ?",
            [id]
        );
    }

    static fetchPrivilegioByIDRol(IDRol) {
        return db.execute(
            "SELECT * FROM privilegios WHERE IDPrivilegio IN (SELECT IDPrivilegio FROM privilegio_rol WHERE IDRol = ?)",
            [IDRol]
        );
    }

};