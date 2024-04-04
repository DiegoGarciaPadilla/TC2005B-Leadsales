const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const CSVController = require('../controllers/CSV.controller');

// Rutas
router.get("/usuario", (req, res) => {
    res.render("user");
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

router.use("/", (req, res) => {
    res.render("home");
});

router.post("/", (req, res) => {
    res.render("home", {
        msg: 'File uploaded successfully!',
        file: `/uploads/${req.file.filename}`
    });
});


module.exports = router;
