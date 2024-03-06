const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const port = 3000;

// Configurar body-parser

app.use(bodyParser.urlencoded({ extended: false }));

// Rutas

const rutas = require("./routes/.routes");

// Usar rutas

app.use("/", rutas);

// Levantar el servidor

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:", port);
});
