const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

// Rutas

router.use("/", (req, res) => {
    console.log("Home");
    res.write(`<!DOCTYPE html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="../css/output.css">
    </head>
    
    <body>
        <h1>Home</h1>
        <p class = "bg-slate-500 text-red-600">Welcome to the home page</p>
    </body>`);
    res.end();
});

router.get("/historial", (req, res) => {});

router.get("/ayuda", (req, res) => {});

router.get("/ajustes", (req, res) => {});

module.exports = router;
