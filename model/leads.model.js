const db = require("../util/db/db");

module.exports = class Lead {
    constructor(Uname, Utel) {
        this.name = Uname;
        this.tel = Utel;
    }

    static fetchAll() {
        return db.execute(
            "SELECT * FROM `lead` WHERE FechaHoraEliminado IS NULL ORDER BY Creado DESC, Horadecreacion DESC"
        );
    }

    static fetchAllCount() {
        return db.execute(
            "SELECT COUNT(*) AS total FROM `lead` WHERE FechaHoraEliminado IS NULL ORDER BY Creado DESC, Horadecreacion DESC"
        );
    }

    static async fetchLeadsByUser(correo) {
        // Primera consulta: obtener el nombre y apellido paterno basado en el correo
        const [rows] = await db.execute(
            "SELECT CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto FROM `usuario` WHERE Correo = ?",
            [correo]
        );
        console.log(rows[0].NombreCompleto);

        if (rows.length === 0) {
            // No se encontró ningún usuario con ese correo
            return [];
        }

        // Segunda consulta: obtener los leads donde Asignadoa es igual al nombre completo obtenido
        const nombreCompleto = rows[0].NombreCompleto;
        return db.execute(
            "SELECT * FROM `lead` WHERE Asignadoa = ? AND FechaHoraEliminado IS NULL",
            [nombreCompleto]
        );
    }

    static async fetchLeadsByUserCount(correo) {
        // Primera consulta: obtener el nombre y apellido paterno basado en el correo
        const [rows] = await db.execute(
            "SELECT CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto FROM `usuario` WHERE Correo = ?",
            [correo]
        );

        if (rows.length === 0) {
            // No se encontró ningún usuario con ese correo
            return [];
        }

        // Segunda consulta: obtener los leads donde Asignadoa es igual al nombre completo obtenido
        const nombreCompleto = rows[0].NombreCompleto;
        return db.execute(
            "SELECT COUNT(*) AS total FROM `lead` WHERE Asignadoa = ? AND FechaHoraEliminado IS NULL",
            [nombreCompleto]
        );
    }

    static fetchAllLeadsByPage(page, perPage) {
        const offset = (page - 1) * perPage;
        return db.execute(
            `SELECT * FROM \`lead\` WHERE FechaHoraEliminado IS NULL ORDER BY Creado DESC, Horadecreacion DESC LIMIT ${offset}, ${perPage}`
        );
    }

    static async fetchAllLeadsByUserAndPage(correo, page, perPage) {
        // Primera consulta: obtener el nombre y apellido paterno basado en el correo
        const [rows] = await db.execute(
            "SELECT CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto FROM `usuario` WHERE Correo = ?",
            [correo]
        );

        if (rows.length === 0) {
            // No se encontró ningún usuario con ese correo
            return [];
        }

        // Segunda consulta: obtener los leads donde Asignadoa es igual al nombre completo obtenido
        const nombreCompleto = rows[0].NombreCompleto;
        const offset = (page - 1) * perPage;

        return db.execute(
            `SELECT * FROM \`lead\` WHERE Asignadoa = ? AND FechaHoraEliminado ORDER BY Creado DESC, Horadecreacion DESC IS NULL LIMIT ${offset}, ${perPage}`,
            [nombreCompleto]
        );
    }

    static fetchOne(IDLead) {
        return db.execute("SELECT * FROM `lead` WHERE IDLead = ?", [IDLead]);
    }

    static createLead(nombre, telefono, embudo, asignadoa) {
        return db.execute(
            "INSERT INTO `lead` (Nombre, Telefono, Embudo, Asignadoa, Creado, Horadecreacion, Archivado, CreadoManualmente) VALUES (?, ?, ?, ?, CURDATE(), CURTIME(), 'No', 'TRUE')",
            [nombre, telefono, embudo, asignadoa]
        );
    }

    static deleteLeadById(id) {
        return db.execute(
            "UPDATE `lead` SET FechaHoraEliminado = CURRENT_TIMESTAMP WHERE IDLead = ?",
            [id]
        );
    }

    static updateLeadById(
        id,
        nombre,
        tel,
        correo,
        comp,
        asig,
        fecha,
        hora,
        msj,
        status,
        edo,
        emb,
        etapa,
        arch,
        val,
        gan,
        etiq
    ) {
        return db.execute(
            "UPDATE `lead` SET Nombre = ?, Telefono = ?, Correo = ?, Compania = ?, Asignadoa = ?, Fechadeultimomensaje = ?, Horadelultimomensaje = ?, Ultimomensaje = ?, Status = ?, EstadodeLead = ?, Embudo = ?, Etapa = ?, Archivado = ?, Valor = ?, Ganado = ?, Etiquetas = ? WHERE IDLead = ?",
            [
                nombre,
                tel,
                correo,
                comp,
                asig,
                fecha,
                hora,
                msj,
                status,
                edo,
                emb,
                etapa,
                arch,
                val,
                gan,
                etiq,
                id,
            ]
        );
    }

    static fetchEmbudos() {
        return db.execute("SELECT DISTINCT(Embudo) FROM `lead`");
    }

    static buscaLead(valorBusqueda){
        return db.execute("SELECT * FROM `lead` WHERE Nombre LIKE ? OR Telefono LIKE ? OR Correo LIKE ? OR Compania LIKE ? OR Asignadoa LIKE ? OR Embudo LIKE ? AND FechaHoraEliminado IS NULL",
        Array(6).fill('%' + valorBusqueda + '%'));
    }
};
