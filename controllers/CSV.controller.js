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

    // Parse CSV and store in database
    csv.save();

    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
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

    return null; // Add a return statement at the end of the function
};

/* ========================== FIN CU. 26 ==============================  */

module.exports = exports;
