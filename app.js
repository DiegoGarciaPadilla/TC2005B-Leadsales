const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const app = express();

const port = 3000;

app.use(express.static("public"));


//Motor de plantillas

const path = require("path");

app.set("view engine", "ejs");

app.set("views", "views");

// Sesión
const session = require("express-session");

app.use(session({
  secret: 'Mario',
  resave: false,
  saveUninitialized: false,
}))

// app.use(express.static(path.join(__dirname, "public")));

// Rutas

const routes = require("./routes/.routes.js");
const usuariosRoutes = require("./routes/usuarios.routes.js");

// Usar rutas

app.use("/users", usuariosRoutes);
app.use("/", routes);

// Levantar el servidor

app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:", port);
});
