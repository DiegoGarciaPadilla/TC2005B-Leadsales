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

    static updatePrivilegiosRolById(IDRol, IDPrivlegioList) {
        // Insertar los nuevos privilegios
        const queries = IDPrivlegioList.map((IDPrivilegio) =>
            db.execute(
                "INSERT INTO privilegio_rol (IDRol, IDPrivilegio) VALUES (?, ?)",
                [IDRol, IDPrivilegio]
            )
        );

        // Ejecutar todas las consultas (.. significa que se expande el array en argumentos separados)
        return Promise.all([...queries]);
    }

    static deleteRolById(IDRol) {
        const query1 = db.execute(
            "UPDATE rol SET FechaHoraEliminado = CURRENT_TIMESTAMP WHERE IDRol = ?",
            [IDRol]
        );
        const query2 = db.execute(
            "UPDATE usuario_rol SET FechaHoraFin = CURRENT_TIMESTAMP WHERE IDRol = ?",
            [IDRol]
        );

        return Promise.all([query1, query2]);
    }

    static deletePrivilegiosRolById(IDRol) {
        return db.execute("DELETE FROM privilegio_rol WHERE IDRol = ?", [
            IDRol,
        ]);
    }
};
