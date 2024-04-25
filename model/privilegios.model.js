const db = require("../util/db/db");

module.exports = class Privilegio {

    constructor(miDescripcionPrivilegio) {
        this.descripcionPrivilegio = miDescripcionPrivilegio;
    }

    static fetchAll() {
        return db.execute("SELECT * FROM privilegios");
    }

    static fetchPrivilegioById(IDPrivilegio) {
        return db.execute(
            "SELECT * FROM privilegios WHERE IDPrivilegio = ?",
            [IDPrivilegio]
        );
    }


    static fetchPrivilegiosByIDRol(IDRol) {
        return db.execute(
            "SELECT * FROM privilegios WHERE IDPrivilegio IN (SELECT IDPrivilegio FROM privilegio_rol WHERE IDRol = ?)",
            [IDRol]
        );
    }

};