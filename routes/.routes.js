const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const CSVController = require('../controllers/CSV.controller');

// Rutas

router.get("/FAQ", (req, res) => {
    res.render("FAQ");
});

router.post("/", CSVController.post_CSV);   // ANTES de router,use("/")

router.use("/", (req, res) => {
    res.render("inicio");
});

module.exports = router;
