const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

// Rutas

router.use("/", (req, res) => {
    res.render("home");
});

router.get("/historial", (req, res) => {});

router.get("/ayuda", (req, res) => {});

router.get("/ajustes", (req, res) => {});

module.exports = router;
