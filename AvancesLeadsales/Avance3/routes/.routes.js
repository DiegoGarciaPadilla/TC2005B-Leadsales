const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

// Rutas

router.use("/", (req, res) => {
    res.render("home");
});

router.get("/historial", (req, res) => {
    res.render("history");
});

router.get("/ayuda", (req, res) => {
    res.render("help");
});

router.get("/ajustes", (req, res) => {
    res.render("settings");
});

module.exports = router;
