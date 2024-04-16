const CSV = require("../model/CSV.model");

/* ========== CU. 26 IMPORTA DATOS DE LEADS | Sebas Colin =============== */

exports.post_CSV = (req, res) => {
    console.log("post_CSV called"); // Llega a post.csv
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.file);
    const csv = new CSV(req.file.filename);

    // PROMISE
    csv.save();
    
    console.log(csv);

    res.render("inicio", {
        msg: "File uploaded successfully!",
        file: `/uploads/${req.file.filename}`,
        csrfToken: req.csrfToken(),
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
    });

    return null; // Add a return statement at the end of the function
};

/* ========================== FIN CU. 26 ==============================  */

module.exports = exports;
