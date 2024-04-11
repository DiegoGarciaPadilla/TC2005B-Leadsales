const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const CSVController = require('../controllers/CSV.controller');

const isAuth = require('../util/privilegios/is-auth');

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.post("/", isAuth, CSVController.post_CSV);   // ANTES de router,use("/")

router.get("/", isAuth, (req, res) => {
    res.render("inicio");
});

module.exports = router;
