const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

// Configurar body-parser

router.use(bodyParser.urlencoded({ extended: false }));

// Rutas

router.get("/", (req, res) => {});

router.get("/historial", (req, res) => {});

router.get("/ayuda", (req, res) => {});

router.get("/ajustes", (req, res) => {});
