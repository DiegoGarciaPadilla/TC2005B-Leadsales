const bcrypt = require("bcryptjs");

const db = require("../util/db/db");

module.exports = class Usuario {
    constructor(
        miNombre,
        miApellidoPaterno,
        miApellidoMaterno,
        miCorreo,
        miPasword,
        miTelefono,
        miDomicilio
    ) {
        this.Nombre = miNombre;
        this.ApellidoPaterno = miApellidoPaterno;
        this.ApellidoMaterno = miApellidoMaterno;
        this.Correo = miCorreo;
        this.Password = miPasword;
        this.Telefono = miTelefono;
        this.Domicilio = miDomicilio;
    }

    save(IDRol) {
        return bcrypt
            .hash(this.Password, 12)
            .then((hashedPassword) =>
                db.execute(
                    `
                    INSERT INTO usuario (Nombre, ApellidoPaterno, ApellidoMaterno, Correo, Password, Telefono, Domicilio)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                    [
                        this.Nombre,
                        this.ApellidoPaterno,
                        this.ApellidoMaterno,
                        this.Correo,
                        hashedPassword,
                        this.Telefono,
                        this.Domicilio,
                    ]
                )
            )
            .then((result) => {
                const IDUsuario = result[0].insertId;

                return db.execute(
                    "INSERT INTO usuario_rol (IDUsuario, IDRol, FechaHoraInicio) VALUES (?, ?, ?)",
                    [IDUsuario, IDRol, new Date()]
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static fetchOne(Correo) {
        return db.execute("SELECT * FROM usuario WHERE Correo = ?", [Correo]);
    }

    static fetchAllUsers() {
        return db.execute(
            `
            SELECT U.*, UR.IDRol, R.Nombre AS NombreRol 
            FROM usuario AS U 
            JOIN (
                SELECT UR1.*
                FROM usuario_rol AS UR1
                INNER JOIN (
                    SELECT IDUsuario, MAX(FechaHoraInicio) AS MaxFechaHoraInicio
                    FROM usuario_rol
                    WHERE FechaHoraFin IS NULL
                    GROUP BY IDUsuario
                ) AS UR2 ON UR1.IDUsuario = UR2.IDUsuario AND UR1.FechaHoraInicio = UR2.MaxFechaHoraInicio
            ) AS UR ON U.IDUsuario = UR.IDUsuario
            JOIN rol AS R ON UR.IDRol = R.IDRol
            WHERE U.FechaHoraEliminado IS NULL
            `
        );
    }

    static fetchRol(IDUsuario) {
        return db.execute("SELECT IDRol FROM usuario_rol WHERE IDUsuario= ? AND FechaHoraFin IS NULL", [
            IDUsuario,
        ]);
    }

    static fetchRoles() {
        return db.execute(
            "SELECT R.Nombre FROM rol AS R JOIN usuario_rol AS UR ON UR.IDRol = R.IDRol JOIN usuario AS U ON UR.IDUsuario = U.IDUsuario WHERE UR.FechaHoraFin IS NULL AND U.FechaHoraEliminado IS NULL;"
        );
    }

    static login(IDUsuario) {
        return db.execute(
            `
            INSERT INTO sesion (IDUsuario, FechaHoraInicio)
            VALUES (?, CURRENT_TIMESTAMP())
        `,
            [IDUsuario]
        );
    }

    static getPrivilegios(Correo) {
        return db.execute(
            `
            SELECT PR.IDPrivilegio, PR.Descripcion FROM privilegios AS PR
            JOIN privilegio_rol AS PRIR 	ON PRIR.IDPrivilegio = PR.IDPrivilegio
            JOIN rol AS R 					ON R.IDRol = PRIR.IDRol
            JOIN usuario_rol AS UR			ON UR.IDRol = R.IDRol
            JOIN usuario AS U 				ON U.IDUsuario = UR.IDUsuario
            WHERE U.Correo = ?
        `,
            [Correo]
        );
    }

    static eliminar(IDUsuario) {
        const query1 = db.execute(
            "UPDATE usuario SET FechaHoraEliminado = CURRENT_TIMESTAMP() WHERE IDUsuario = ?",
            [IDUsuario]
        );
        const query2 = db.execute(
            `
            UPDATE usuario_rol 
            SET FechaHoraFin = CURRENT_TIMESTAMP() 
            WHERE IDUsuario = ? AND FechaHoraInicio = (
                SELECT MAX(FechaHoraInicio) 
                FROM (
                    SELECT FechaHoraInicio
                    FROM usuario_rol 
                    WHERE IDUsuario = ?
                ) AS derivedTable
            )
            `,
            [IDUsuario, IDUsuario]
        );

        return Promise.all([query1, query2]);
    }

    static logout(IDUsuario) {
        return db.execute(
            `
            UPDATE sesion
            SET FechaHoraFin = CURRENT_TIMESTAMP()
            WHERE IDUsuario = ?
            AND FechaHoraFin IS NULL
        `,
            [IDUsuario]
        );
    }

    static cambiarContrasenia(Correo, nuevaContrasena) {
        return bcrypt
            .hash(nuevaContrasena, 12)
            .then((hashedPassword) =>
                db.execute(
                    "UPDATE usuario SET Password = ? WHERE Correo = ?",
                    [hashedPassword, Correo]
                )
            );
    }

    static async asignarRol(IDUsuario, IDRol) {
        let query1 = db.execute(
            `
            UPDATE usuario_rol 
            SET FechaHoraFin = CURRENT_TIMESTAMP() 
            WHERE IDUsuario = ? AND FechaHoraInicio = (
                SELECT MAX(FechaHoraInicio) 
                FROM (
                    SELECT FechaHoraInicio
                    FROM usuario_rol 
                    WHERE IDUsuario = ?
                ) AS derivedTable
            )
            `,
            [IDUsuario, IDUsuario]
        );

        let query2 = db.execute(
            "INSERT INTO usuario_rol (IDUsuario, IDRol, FechaHoraInicio) VALUES (?, ?, CURRENT_TIMESTAMP())",
            [IDUsuario, IDRol]
        );

        await Promise.all([query1, query2]);
        return db.execute("SELECT Nombre FROM rol WHERE IDRol = ?", [IDRol]);
    }
};
