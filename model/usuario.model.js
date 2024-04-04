const db = require('../util/db/db');

module.exports = class Usuario {

    constructor(miNombre, miApellidoPaterno, miApellidoMaterno, miCorreo, miPasword) {
        this.Nombre = miNombre;
        this.ApellidoPaterno = miApellidoPaterno;
        this.ApellidoMaterno = miApellidoMaterno;
        this.Correo = miCorreo;
        this.Password = miPasword;
    }

    static fetchOne(Correo) {
        return db.execute('SELECT * FROM usuario WHERE Correo = ?', [Correo]);
    }

    static getPrivilegios(Correo) {
        return db.execute(`
            SELECT Descripcion
            FROM privilegio AS pr, privilegio_rol AS prir, rol AS r, usuario_rol AS ur, usuario u
            WHERE u.Correo = ? AND u.IDUsuario = ur.IDUsuario AND
            ur.IDRol = r.IDRol AND r.IDRol = prir.IDRol AND prir.IDPrivilegio = pr.IDPrivilegio
        `, [Correo]);
    }
}