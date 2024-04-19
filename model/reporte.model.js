const db = require("../util/db/db");

module.exports = class Reporte {
    constructor(Rdescripcion, Rfecha) {
        this.rdescripcion = Rdescripcion;
        this.rfecha = Rfecha;
    }

    save() {}

    static fetchAll() {
        return db.execute(
            "SELECT R.Fecha, R.Descripcion, R.Liga, CONCAT(U.Nombre, ' ', U.ApellidoPaterno) AS NombreCompleto FROM `reporte` AS R JOIN `usuario` AS U ON R.IDUsuario = U.IDUsuario"
        );
    }

    static fetchReportesByUser(IDUsuario) {
        return db.execute(
            "SELECT R.Fecha, R.Descripcion, R.Liga, CONCAT(U.Nombre, ' ', U.ApellidoPaterno) AS NombreCompleto FROM `reporte` AS R JOIN `usuario` AS U ON R.IDUsuario = U.IDUsuario WHERE R.IDUsuario = ?",
            [IDUsuario]
        );
    }

    static fetchOne(idReporte) {
        return db.execute("SELECT * FROM `reporte` WHERE IDReporte = ?", [
            idReporte,
        ]);
    }
};
