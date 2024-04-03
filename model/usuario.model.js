const db = require('../util/db/db');

module.exports = class Usuario {

    constructor(miNombre, miApellidoPaterno, miApellidoMaterno, miCorreo, miPasword) {
        this.nombre = miNombre;
        this.apellidoPaterno = miApellidoPaterno;
        this.apellidoMaterno = miApellidoMaterno;
        this.correo = miCorreo;
        this.password = miPasword;
    }

    static fetchOne(correo) {
        return db.execute('SELECT * FROM usuario WHERE correo = ?', [correo]);
    }

    static getPrivilegios(correo) {
        return db.execute(`
            SELECT descripcion
            FROM privilegio AS pr, privilegio_rol AS prir, rol AS r, usuario_rol AS ur, usuario u
            WHERE u.correo = ? AND u.correo = ur.correo AND
            ur.idrol = r.id AND r.id = prir.idrol AND prir.idpermiso = pr.id
        `, [correo]);
    }
}