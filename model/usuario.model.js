const db = require("../util/db/db");

const bcrypt = require('bcryptjs');

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
        return bcrypt.hash(this.Password, 12)
            .then((hashedPassword) => {
                return db.execute(
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
                );
            })
            .then((result) => {
                const IDUsuario = result[0].insertId;
    
                return db.execute("INSERT INTO usuario_rol (IDUsuario, IDRol, FechaHoraInicio) VALUES (?, ?, ?)", 
                [IDUsuario, IDRol, new Date()])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static fetchOne(Correo) {
        return db.execute("SELECT * FROM usuario WHERE Correo = ?", [Correo]);
    }

    static fetchAllUsers() {
        return db.execute("SELECT * FROM usuario");
    }

    static fetchRol(IDUsuario) {
        return db.execute("SELECT IDRol FROM usuario_rol WHERE IDUsuario= ?", [
            IDUsuario,
        ]);
    }

    static fetchRoles() {
        return db.execute(
            "SELECT R.Nombre FROM rol AS r JOIN usuario_rol AS ur ON ur.IDRol = r.IDRol"
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
            SELECT pr.IDPrivilegio, pr.Descripcion FROM privilegios AS pr
            JOIN privilegio_rol AS prir 	ON prir.IDPrivilegio = pr.IDPrivilegio
            JOIN rol AS r 					ON r.IDRol = prir.IDRol
            JOIN usuario_rol AS ur			ON ur.IDRol = r.IDRol
            JOIN usuario AS u 				ON u.IDUsuario = ur.IDUsuario
            WHERE u.Correo = ?
        `,
            [Correo]
        );
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
};
