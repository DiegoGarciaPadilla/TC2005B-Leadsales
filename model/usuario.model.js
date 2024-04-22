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
            "SELECT * FROM usuario WHERE FechaHoraEliminado IS NULL"
        );
    }

    static fetchRol(IDUsuario) {
        return db.execute("SELECT IDRol FROM usuario_rol WHERE IDUsuario= ?", [
            IDUsuario,
        ]);
    }

    static fetchRoles() {
        return db.execute(
            "SELECT R.Nombre FROM rol AS R JOIN usuario_rol AS UR ON UR.IDRol = R.IDRol"
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
            "UPDATE usuario_rol SET FechaHoraFin = CURRENT_TIMESTAMP() WHERE IDUsuario = ?",
            [IDUsuario]
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
};
