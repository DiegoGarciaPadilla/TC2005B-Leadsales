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

router.get("/FAQ", (req, res) => {
    res.render("FAQ");
});


router.post("/", CSVController.post_CSV);   // ANTES de router,use("/")

router.use("/", (req, res) => {
    res.render("home");
});

module.exports = router;
