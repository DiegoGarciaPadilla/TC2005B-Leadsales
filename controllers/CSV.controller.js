const CSV = require("../model/CSV.model");

const Usuario = require("../model/usuario.model");

const Lead = require("../model/leads.model");

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */

exports.post_CSV = (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const csv = new CSV(req.file.filename);

    csv.check()
        .then((isValid) => {
            if (isValid) {
                csv.save();
                Usuario.fetchAllUsers()
                    .then(([usuariosFetched]) => {
                        Lead.fetchEmbudos()
                            .then(([embudosFetched]) => {
                                res.render("inicio", {
                                    success: "Los leads se han registrado exitosamente.",
                                    file: `/uploads/${req.file.filename}`,
                                    csrfToken: req.csrfToken(),
                                    correo: req.session.Correo,
                                    privilegios: req.session.Privilegios,
                                    nombre: req.session.Nombre,
                                    apellidoPaterno: req.session.ApellidoPaterno,
                                    apellidoMaterno: req.session.ApellidoMaterno,
                                    rol: req.session.Rol,   
                                    usuarios: usuariosFetched,
                                    embudos: embudosFetched,
                                    error: "",
                                });
                            })
                            .catch((error) => {
                            });
                    })
                    .catch((error) => {
                    });
            } else {
                Usuario.fetchAllUsers()
                    .then(([usuariosFetched]) => {
                        Lead.fetchEmbudos()
                            .then(([embudosFetched]) => {
                                res.render("inicio", {
                                    success: "",
                                    file: `/uploads/${req.file.filename}`,
                                    csrfToken: req.csrfToken(),
                                    correo: req.session.Correo,
                                    privilegios: req.session.Privilegios,
                                    nombre: req.session.Nombre,
                                    apellidoPaterno: req.session.ApellidoPaterno,
                                    apellidoMaterno: req.session.ApellidoMaterno,
                                    rol: req.session.Rol,   
                                    usuarios: usuariosFetched,
                                    embudos: embudosFetched,
                                    error: "Tu archivo.csv no tiene el formato correcto!",
                                });
                            })
                            .catch((error) => {
                            });
                    })
                    .catch((error) => {
                    });
            }
        })
        .catch((error) => {
        })

    return null; // Add a return statement at the end of the function

};

/* ========================== FIN CU. 26 ==============================  */

module.exports = exports;
