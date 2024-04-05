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
            SELECT pr.IDPrivilegio, pr.Descripcion FROM privilegios AS pr
            JOIN privilegio_rol AS prir 	ON prir.IDPrivilegio = pr.IDPrivilegio
            JOIN rol AS r 					ON r.IDRol = prir.IDRol
            JOIN usuario_rol AS ur			ON ur.IDRol = r.IDRol
            JOIN usuario AS u 				ON u.IDUsuario = ur.IDUsuario
            WHERE u.Correo = ?
        `, [Correo]);
    }
}