const db = require('../util/db/db');

module.exports = class Rol {

    constructor(miNombre, miDescripcionRol){
        this.nombre = miNombre;
        this.descripcionRol = miDescripcionRol;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM rol');
    }

    static updateRolById(id, nombre, descripcionRol) {
        return db.execute('UPDATE rol SET nombre = ?, descripcionRol = ? WHERE id = ?', [nombre, descripcionRol, id]);
    }
    
}