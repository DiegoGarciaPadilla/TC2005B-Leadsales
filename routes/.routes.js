// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el controlador de CSV

const { postCSV } = require("../controllers/CSV.controller");

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.post("/", isAuth, postCSV); // ANTES de router,use("/")

router.get("/", isAuth,  (req, res) => {
    res.render("inicio", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
    });
});

// Exportamos el router

module.exports = router;
