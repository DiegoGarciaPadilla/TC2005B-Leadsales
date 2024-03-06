const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const app = express();

const port = 3000;

//Motor de plantillas

const path = require("path");

// app.use(express.static(path.join(__dirname, "public")));

// Rutas

const routes = require("./routes/.routes.js");

// Usar rutas

app.use("/", routes);

// Levantar el servidor

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:", port);
});
