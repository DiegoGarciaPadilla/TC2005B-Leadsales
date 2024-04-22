const CSV = require("../model/CSV.model");

const Usuario = require("../model/usuario.model");

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */

exports.post_CSV = (req, res) => {
    console.log("post_CSV called"); // Llega a post.csv
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.file);
    const csv = new CSV(req.file.filename);

    // PROMISE
    csv.save()
        .then(() => {
            console.log("Se logrooooooooooooooooooo");
            Usuario.fetchAllUsers()
                .then(([usuariosFetched]) => {
                    console.log("Si llego aqui jiji");
    
                    res.render("inicio", {
                        success: "Los leads se han registrado exitosamente.",
                        file: `/uploads/${req.file.filename}`,
                        csrfToken: req.csrfToken(),
                        correo: req.session.Correo,
                        nombre: req.session.Nombre,
                        apellidoPaterno: req.session.ApellidoPaterno,
                        apellidoMaterno: req.session.ApellidoMaterno,
                        rol: req.session.Rol,   
                        usuarios: usuariosFetched,
                        error: "",
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch(() => {
            console.log("No se logroooooooooooooooo");
            Usuario.fetchAllUsers()
                .then(([usuariosFetched]) => {
                    console.log("No se logro");
                    res.render("inicio", {
                        success: "",
                        file: `/uploads/${req.file.filename}`,
                        csrfToken: req.csrfToken(),
                        correo: req.session.Correo,
                        nombre: req.session.Nombre,
                        apellidoPaterno: req.session.ApellidoPaterno,
                        apellidoMaterno: req.session.ApellidoMaterno,
                        rol: req.session.Rol,   
                        usuarios: usuariosFetched,
                        error: "Error al registrar los leads.",
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    return null; // Add a return statement at the end of the function
};

/* ========================== FIN CU. 26 ==============================  */

module.exports = exports;
